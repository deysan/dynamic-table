import App from './App';
import ReactDOMServer from 'react-dom/server';

export const render = () => {
  return ReactDOMServer.renderToString(<App />);
};
