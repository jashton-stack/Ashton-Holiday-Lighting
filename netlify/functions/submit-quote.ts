import { handleQuote } from '../lib/handle-quote';

export default async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response(null, { status: 204 });
  if (req.method !== 'POST') {
    return json(405, { ok: false, error: 'Method not allowed.' });
  }
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return json(400, { ok: false, error: 'Request body must be JSON.' });
  }
  const result = await handleQuote(body);
  if (result.ok) return json(200, result);
  return json(result.status, { ok: false, error: result.error });
};

function json(status: number, body: unknown) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export const config = { path: '/.netlify/functions/submit-quote' };
