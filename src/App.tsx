// NOTE: This file should normally not be modified unless you are adding a new provider.
// To add new routes, edit the AppRouter.tsx file.

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createHead, UnheadProvider } from '@unhead/react/client';
import { InferSeoMetaPlugin } from '@unhead/addons';
import { Suspense } from 'react';
import NostrProvider from '@/components/NostrProvider';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { NostrLoginProvider } from '@nostrify/react/login';
import { AppProvider } from '@/components/AppProvider';
import { NWCProvider } from '@/contexts/NWCContext';
import { AppConfig } from '@/contexts/AppContext';
import AppRouter from './AppRouter';
import { useAppContext } from '@/hooks/useAppContext';

const head = createHead({
  plugins: [
    InferSeoMetaPlugin(),
  ],
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 60000,
      gcTime: Infinity,
    },
  },
});

const defaultConfig: AppConfig = {
  theme: "dark",
  relayUrl: "wss://relay.fizx.uk",
};

const presetRelays = [
  { url: 'wss://relay.fizx.uk', name: 'fizx' },
  { url: 'wss://relay.nostr.band', name: 'Nostr.Band' },
  { url: 'wss://relay.damus.io', name: 'Damus' },
  { url: 'wss://relay.primal.net', name: 'Primal' },
];

// AppInner must live *inside* AppProvider so useAppContext() has a provider above it.
function AppInner() {
  const { config } = useAppContext();
  return (
    <QueryClientProvider client={queryClient}>
      <NostrLoginProvider storageKey='nostr:login'>
        <NostrProvider>
          <NWCProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <Suspense>
                <div className={config.theme === 'dark' ? 'dark' : ''}>
                  <AppRouter />
                </div>
              </Suspense>
            </TooltipProvider>
          </NWCProvider>
        </NostrProvider>
      </NostrLoginProvider>
    </QueryClientProvider>
  );
}

export function App() {
  return (
    <UnheadProvider head={head}>
      <AppProvider storageKey="stakes:app-config" defaultConfig={defaultConfig} presetRelays={presetRelays}>
        <AppInner />
      </AppProvider>
    </UnheadProvider>
  );
}

export default App;
