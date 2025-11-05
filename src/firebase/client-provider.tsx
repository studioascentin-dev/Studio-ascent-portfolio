'use client';

import React from 'react';
import { initializeFirebase } from './init';
import { FirebaseProvider } from './provider';

// This is a client-side only provider.
// It initializes Firebase on the client and provides it to its children.
export function FirebaseClientProvider({ children }: { children: React.ReactNode }) {
  // Initialize Firebase and get the services.
  // This function ensures that initialization happens only once.
  const services = initializeFirebase();

  return <FirebaseProvider {...services}>{children}</FirebaseProvider>;
}
