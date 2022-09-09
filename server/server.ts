import App from '../src/App';
import { createElement } from 'react';
import { createServer } from 'http';
import fs from 'fs/promises';
import path from 'path';
import { renderToString } from 'react-dom/server';

const server = createServer(async (req, res) => {
  const html = await fs.readFile(path.resolve('./dist/index.html'), 'utf-8');

  const content = html.replace(
    '<!--app-html-->',
    renderToString(createElement(App)),
  );

  res.writeHead(200, {
    'Content-Type': 'text/html',
  });

  res.end(content);
});

server.listen(9000, () => {
  console.log(`Server started at http://localhost:${9000}`);
});
