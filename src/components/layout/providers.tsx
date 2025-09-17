
'use client';

import { Provider as JotaiProvider } from 'jotai';
import { AuthProvider } from '@/hooks/use-auth';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <JotaiProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </JotaiProvider>
  );
}
