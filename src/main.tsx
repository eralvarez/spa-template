import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './main.css';
import './i18n';
import { ConvexReactClient } from 'convex/react';
import { ConvexAuthProvider } from '@convex-dev/auth/react';

import { Routes } from '@generouted/react-router';

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConvexAuthProvider client={convex}>
      <Routes />
    </ConvexAuthProvider>
  </StrictMode>,
);
