import './index.css';

import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';

// @ts-ignore: Unreachable code error
const tableData = window.__INITIAL_DATA__;

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <App data={tableData} />
  </React.StrictMode>,
);
