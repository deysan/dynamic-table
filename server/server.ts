import App from '../src/App';
import { Input } from '../src/types';
import { createElement } from 'react';
import { createServer } from 'http';
import { createTable } from './createTable';
import fs from 'fs';
import { parse } from 'querystring';
import path from 'path';
import { renderToString } from 'react-dom/server';

interface Mime {
  [key: string]: string;
}

const server = createServer(function (req, res) {
  let filePath = req.url;

  if (filePath === '/') {
    filePath = 'dist/index.html';
  } else {
    filePath = 'dist' + req.url;
  }

  const extname = String(path.extname(filePath)).toLowerCase();
  const mimeTypes: Mime = {
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.svg': 'image/svg+xml',
  };

  const contentType = mimeTypes[extname] || 'text/html';

  fs.readFile(filePath, function (error, content) {
    if (contentType === 'text/html' && req.url) {
      const html = fs.readFileSync(path.resolve('./dist/index.html'), 'utf-8');

      const inputData = parse(req.url.substring(2)) as Input;

      const isEmptyData = () => {
        for (let i in inputData) return false;
        return true;
      };

      let appHtml = html.replace(
        '<!--app-html-->',
        renderToString(createElement(App)),
      );

      if (!isEmptyData()) {
        const tableData = createTable(inputData);

        const appData = html.replace(
          '// app-data',
          `window.__INITIAL_DATA__ = ${JSON.stringify(tableData).replace(
            /</g,
            '\\u003c',
          )}`,
        );

        appHtml = appData.replace(
          '<!--app-html-->',
          renderToString(createElement(App, { data: tableData })),
        );
      }

      res.writeHead(200, {
        'Content-Type': 'text/html',
      });

      res.end(appHtml, 'utf-8');
    } else if (error) {
      res.writeHead(500);
      res.end(
        'Sorry, check with the site admin for error: ' + error.code + ' ..\n',
      );
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(9000, () => {
  console.log(`Server started at http://localhost:${9000}`);
});
