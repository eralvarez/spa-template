import { createRoot } from 'react-dom/client';
import { Routes } from '@generouted/react-router';
import { ConvexProvider, ConvexReactClient } from 'convex/react';

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

createRoot(document.getElementById('root')!).render(
  <ConvexProvider client={convex}>
    <Routes />
  </ConvexProvider>
);
