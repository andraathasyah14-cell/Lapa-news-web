
'use client';

import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Chrome } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function LoginForm() {
  const { user, loginWithGoogle, loading } = useAuth();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setError(null);
    try {
      const redirectUrl = searchParams.get('redirect') || '/';
      await loginWithGoogle(redirectUrl);
    } catch (err: any) {
      console.error(err);
      setError('Failed to login with Google. Please try again.');
    }
  };

  useEffect(() => {
    if (user) {
        const redirectUrl = searchParams.get('redirect') || '/';
        window.location.href = redirectUrl;
    }
  }, [user, searchParams]);

  return (
    <div className="space-y-4">
      <Button onClick={handleLogin} disabled={loading} className="w-full">
        <Chrome className="mr-2 h-4 w-4" />
        {loading ? 'Logging in...' : 'Sign in with Google'}
      </Button>
      {error && <p className="text-sm font-medium text-destructive text-center">{error}</p>}
    </div>
  );
}
