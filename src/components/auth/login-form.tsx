
'use client';

import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Chrome } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function LoginForm() {
  const { user, loginWithGoogle, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setError(null);
    try {
      const redirectUrl = searchParams.get('redirect') || '/';
      await loginWithGoogle(redirectUrl);
      // The redirection is now handled inside loginWithGoogle after successful login
    } catch (err: any) {
      console.error("Login failed:", err);
      setError('Failed to login with Google. Please try again.');
    }
  };
  
  // This effect is no longer strictly necessary as redirection happens in loginWithGoogle
  // but can be kept as a fallback for when the user is already logged in.
  useEffect(() => {
    if (user) {
        const redirectUrl = searchParams.get('redirect') || '/';
        router.push(redirectUrl);
    }
  }, [user, searchParams, router]);


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
