import App from '../src/App';
import { createElement } from 'react';
import { createServer } from 'http';
import fs from 'fs';
import path from 'path';
import { renderToString } from 'react-dom/server';

interface Mime {
  [key: string]: string;
}

const server = createServer(function (req, res) {
  let filePath = req.url;

  if (filePath == '/') {
    filePath = 'dist/index.html';
  } else {
    filePath = 'dist' + req.url;
  }

  if (filePath) {
    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeTypes: Mime = {
      '.js': 'application/javascript',
      '.css': 'text/css',
      '.svg': 'image/svg+xml',
    };

    const contentType = mimeTypes[extname] || 'text/html';

    fs.readFile(filePath, function (error, content) {
      if (error) {
        res.writeHead(500);
        res.end(
          'Sorry, check with the site admin for error: ' + error.code + ' ..\n',
        );
      } else if (contentType === 'text/html') {
        const html = fs.readFileSync(
          path.resolve('./dist/index.html'),
          'utf-8',
        );
        const appHtml = html.replace(
          '<!--app-html-->',
          renderToString(createElement(App)),
        );

        res.writeHead(200, {
          'Content-Type': 'text/html',
        });

        res.end(appHtml, 'utf-8');
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf-8');
      }
    });
  }
});

server.listen(9000, () => {
  console.log(`Server started at http://localhost:${9000}`);
});
