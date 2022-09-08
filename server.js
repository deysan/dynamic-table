import { createServer as createViteServer } from 'vite';
import express from 'express';
import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function createServer(
  isProd = process.env.NODE_ENV === 'production',
) {
  const resolve = (p) => path.resolve(__dirname, p);

  const app = express();

  /**
   * @type {import('vite').ViteDevServer}
   */

  let vite;

  if (!isProd) {
    vite = await createViteServer({
      server: {
        middlewareMode: true,
      },
      appType: 'custom',
    });

    app.use(vite.middlewares);
  } else {
    app.use(
      (await import('serve-static')).default(resolve('dist/client'), {
        index: false,
      }),
    );
  }

  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl;

      let template, render;

      if (!isProd) {
        template = fs.readFileSync(resolve('index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render;
      } else {
        template = fs.readFileSync(resolve('dist/client/index.html'), 'utf-8');
        render = (await import('./dist/server/entry-server.js')).render;
      }

      const appHtml = render(url);
      const html = template.replace(`<!--ssr-outlet-->`, appHtml);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      !isProd && vite.ssrFixStacktrace(e);
      console.log(e.stack);
      res.status(500).end(e.stack);
    }
  });

  return { app, vite };
}

createServer().then(({ app }) =>
  app.listen(5173, () => {
    console.log('http://localhost:5173');
  }),
);
