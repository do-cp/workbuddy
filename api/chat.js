import { BedrockRuntimeClient, ConverseCommand } from '@aws-sdk/client-bedrock-runtime';
// Single source of truth for the system prompt — edit src/data/buildPrompt.js, not here.
import { SYSTEM_PROMPT } from '../src/data/buildPrompt.js';

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

export default async function handler(req, res) {
  // CORS — restrict to known origins only
  const ALLOWED = (process.env.ALLOWED_ORIGINS || 'https://workbuddy-nu.vercel.app,http://localhost:5173,http://localhost:4173').split(',');
  const origin = req.headers.origin;
  if (ALLOWED.includes(origin)) res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Vary', 'Origin');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { messages } = req.body;
  if (!Array.isArray(messages) || !messages.length) {
    return res.status(400).json({ error: 'messages array required' });
  }

  const clean = messages
    .filter((m) => (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string' && m.content.trim())
    .reduce((acc, m) => {
      // Enforce alternating user/assistant (Bedrock requirement)
      if (!acc.length && m.role !== 'user') return acc;
      if (acc.length && acc[acc.length - 1].role === m.role) return acc;
      return [...acc, m];
    }, []);

  if (!clean.length) return res.status(400).json({ error: 'No valid messages' });

  try {
    const command = new ConverseCommand({
      modelId: MODEL_ID,
      system: [{ text: SYSTEM_PROMPT }],
      messages: clean.map((m) => ({ role: m.role, content: [{ text: m.content }] })),
      inferenceConfig: { maxTokens: 1024, temperature: 0.65, topP: 0.9 },
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
    console.error('[Bedrock]', err.name, err.message);
    if (err.name === 'ExpiredTokenException' || err.message?.includes('expired')) {
      return res.status(401).json({ error: 'AWS_EXPIRED' });
    }
    res.status(500).json({ error: err.message });
  }
}
