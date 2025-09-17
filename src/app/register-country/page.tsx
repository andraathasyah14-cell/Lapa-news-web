
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CountryRegistrationForm from "@/components/countries/registration-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from '@/hooks/use-auth';
import { Skeleton } from '@/components/ui/skeleton';

export default function RegisterCountryPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login?redirect=/register-country');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="max-w-2xl mx-auto space-y-8">
        <Skeleton className="h-12 w-3/4 mx-auto" />
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-4 w-3/4" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-10 w-full" />
            </div>
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
        <h1 className="font-headline text-4xl font-bold text-primary md:text-5xl mb-8 text-center">
          Found a New Nation
        </h1>
        <Card>
            <CardHeader>
                <CardTitle>Country Details</CardTitle>
                <CardDescription>
                    Provide the name of your new nation. Your name, <span className="font-bold text-primary">{user.displayName}</span>, will be automatically set as the owner.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <CountryRegistrationForm user={user} />
            </CardContent>
        </Card>
    </div>
  );
}
