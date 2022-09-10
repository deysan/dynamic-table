import './index.css';

import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ServerData } from './types';

// @ts-ignore: Unreachable code error
const data: ServerData = window.__INITIAL_DATA__;

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <App data={data} />
  </React.StrictMode>,
);
