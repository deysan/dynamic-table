import App from '../src/App';
import { createElement } from 'react';
import { createServer } from 'http';
import fs from 'fs/promises';
import path from 'path';
import { renderToString } from 'react-dom/server';

type Mime = {
  [key: string]: string;
};

const mimeTypes: Mime = {
  html: 'text/html; charset=UTF-8',
  js: 'application/javascript; charset=UTF-8',
  css: 'text/css',
  svg: 'image/svg+xml',
};

const server = createServer(async (req, res) => {
  const { url } = req;
  if (req.method === 'GET' && url) {
    const fileExt = path.extname(url).substring(1);
    const contentType = mimeTypes[fileExt] || mimeTypes.html;

    const html = await fs.readFile(path.resolve('./dist/index.html'), 'utf-8');

    const content = html.replace(
      '<!--app-html-->',
      renderToString(createElement(App)),
    );

    res.writeHead(200, {
      'Content-Type': contentType,
    });

    res.end(content);
  }
});

server.listen(9000, () => {
  console.log(`Server started at http://localhost:${9000}`);
});
