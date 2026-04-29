import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { BedrockRuntimeClient, ConverseCommand } from '@aws-sdk/client-bedrock-runtime';
// Single source of truth for the system prompt — edit src/data/buildPrompt.js, not here.
import { SYSTEM_PROMPT } from '../src/data/buildPrompt.js';

const app = express();
app.use(cors({ origin: (process.env.ALLOWED_ORIGINS || 'http://localhost:5173,http://localhost:4173,http://127.0.0.1:5173').split(',') }));
app.use(express.json({ limit: '256kb' }));

// ─── Rate limiting ────────────────────────────────────────────────────────────
const rateLimitMap = new Map();
setInterval(() => {
  const now = Date.now();
  for (const [ip, times] of rateLimitMap.entries()) {
    const fresh = times.filter(t => now - t < 60_000);
    if (fresh.length === 0) rateLimitMap.delete(ip);
    else rateLimitMap.set(ip, fresh);
  }
}, 60_000);

function rateLimit(req, res, next) {
  const ip = req.ip || req.socket?.remoteAddress || 'unknown';
  const now = Date.now();
  const times = (rateLimitMap.get(ip) || []).filter(t => now - t < 60_000);
  times.push(now);
  rateLimitMap.set(ip, times);
  if (times.length > 20) {
    return res.status(429).json({ error: 'Too many requests — please slow down.' });
  }
  next();
}

const REGION = process.env.AWS_REGION || 'eu-north-1';
const MODEL_ID = process.env.BEDROCK_MODEL_ID || 'eu.amazon.nova-pro-v1:0';

const bedrock = new BedrockRuntimeClient({
  region: REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    sessionToken: process.env.AWS_SESSION_TOKEN,
  },
});

// ─── Chat endpoint ────────────────────────────────────────────────────────────

app.post('/api/chat', rateLimit, async (req, res) => {
  const { messages } = req.body;

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages array is required' });
  }

  // Bedrock Converse: role must be user|assistant, must start with user, must alternate
  const clean = messages
    .filter((m) => m.role === 'user' || m.role === 'assistant')
    .filter((m) => typeof m.content === 'string' && m.content.trim());

  const startIdx = clean.findIndex((m) => m.role === 'user');
  const conversation = startIdx > 0 ? clean.slice(startIdx) : clean;

  if (!conversation.length) {
    return res.status(400).json({ error: 'No valid user message found' });
  }

  try {
    const command = new ConverseCommand({
      modelId: MODEL_ID,
      system: [{ text: SYSTEM_PROMPT }],
      messages: conversation.map((m) => ({
        role: m.role,
        content: [{ text: m.content }],
      })),
      inferenceConfig: {
        maxTokens: 1024,
        temperature: 0.65,
        topP: 0.9,
      },
    });

    const result = await bedrock.send(command);
    const raw = result.output?.message?.content?.[0]?.text ?? '';

    const followUpMatch = raw.match(/FOLLOWUPS:\s*(.+)$/m);
    const followUps = followUpMatch
      ? followUpMatch[1].split('|').map((s) => s.trim()).filter(Boolean).slice(0, 3)
      : [];
    const content = raw.replace(/\n?FOLLOWUPS:.*$/m, '').trimEnd();

    res.json({ content, followUps });
  } catch (err) {
    console.error('[Bedrock error]', err.name, err.message);

    if (err.name === 'ExpiredTokenException' || err.message?.includes('expired') || err.message?.includes('token')) {
      return res.status(401).json({
        error: 'AWS credentials expired. Go to the access portal and refresh them.',
      });
    }
    if (err.name === 'ValidationException') {
      return res.status(400).json({ error: 'Bedrock validation error: ' + err.message });
    }
    res.status(500).json({ error: 'Bedrock request failed: ' + err.message });
  }
});

// ─── Health check ─────────────────────────────────────────────────────────────

app.get('/health', (_, res) => {
  res.json({ ok: true, model: MODEL_ID, region: REGION });
});

// ─── Start ────────────────────────────────────────────────────────────────────

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`\nWorkBuddy backend running on http://localhost:${PORT}`);
  console.log(`Model:  ${MODEL_ID}`);
  console.log(`Region: ${REGION}`);
  console.log(`Health: http://localhost:${PORT}/health\n`);
});
