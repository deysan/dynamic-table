import { Input, ServerData } from '../src/types';
import { inputFormat, isValidInput } from './validator';

import App from '../src/App';
import { createElement } from 'react';
import { createServer } from 'http';
import { createTable } from './table';
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
      const urlParams = parse(req.url.substring(2));

      let appHtml = html.replace(
        '<!--app-html-->',
        renderToString(createElement(App)),
      );

      if (isValidInput(urlParams)) {
        const inputData = inputFormat(urlParams) as Input;
        const tableData = createTable(inputData);

        const data: ServerData = { input: inputData, table: tableData };

        const appData = html.replace(
          '// app-data',
          `window.__INITIAL_DATA__ = ${JSON.stringify(data).replace(
            /</g,
            '\\u003c',
          )}`,
        );

        appHtml = appData.replace(
          '<!--app-html-->',
          renderToString(createElement(App, { data })),
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
