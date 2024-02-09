import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import './util/i18n';
import 'bootstrap/dist/css/bootstrap.min.css';
import { init } from './util/i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));

const runApp = async () => {
  await init();
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
};

runApp();
