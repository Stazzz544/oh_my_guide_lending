import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '@fontsource-variable/literata/opsz.css';
import '@fontsource-variable/literata/opsz-italic.css';
import '@fontsource-variable/onest';

import { App } from './app';

import './styles/tokens.css';
import './styles/global.css';

const container = document.getElementById('root');

if (container) {
  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
