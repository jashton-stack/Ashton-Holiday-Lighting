import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { handleQuote } from './netlify/lib/handle-quote';

/**
 * Run the same quote-submit handler the Netlify Function uses, but as Vite
 * middleware — so `npm run dev` works end-to-end without needing `netlify dev`.
 * Production still goes through the actual Netlify Function in netlify/functions/.
 */
function netlifyFunctionsDev(): Plugin {
  return {
    name: 'ahl-netlify-functions-dev',
    configureServer(server) {
      server.middlewares.use('/.netlify/functions/submit-quote', async (req, res) => {
        if (req.method === 'OPTIONS') {
          res.statusCode = 204;
          res.end();
          return;
        }
        if (req.method !== 'POST') {
          respond(res, 405, { ok: false, error: 'Method not allowed.' });
          return;
        }
        const chunks: Buffer[] = [];
        for await (const c of req as AsyncIterable<Buffer>) chunks.push(c);
        let body: unknown;
        try {
          body = JSON.parse(Buffer.concat(chunks).toString('utf-8'));
        } catch {
          respond(res, 400, { ok: false, error: 'Request body must be JSON.' });
          return;
        }
        const result = await handleQuote(body);
        if (result.ok) respond(res, 200, result);
        else respond(res, result.status, { ok: false, error: result.error });
      });
    },
  };
}

function respond(res: import('http').ServerResponse, status: number, body: unknown) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body));
}

export default defineConfig({
  plugins: [react(), netlifyFunctionsDev()],
});
