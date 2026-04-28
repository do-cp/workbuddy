const AI_ENABLED = import.meta.env.VITE_AI_ENABLED === 'true';
// In production (Vercel) this defaults to /api/chat (same domain).
// Locally, .env.local sets it to http://localhost:3001/api/chat.
const API_URL = import.meta.env.VITE_API_URL || '/api/chat';

export function isAiEnabled() {
  return AI_ENABLED;
}

export async function getAiAnswer(messages) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
  });

  const data = await res.json();

  if (!res.ok) {
    if (res.status === 401 || data.error === 'AWS_EXPIRED') {
      throw new Error('AWS_EXPIRED');
    }
    throw new Error(data.error || `Server error ${res.status}`);
  }

  return {
    answer: data.content || '',
    followUps: data.followUps || [],
  };
}
