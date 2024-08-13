import '@projector/assets/main.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from '@projector/app';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
