
'use client';

import { Suspense } from 'react';
import LoginForm from '@/components/auth/login-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function LoginFormSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-full" />
    </div>
  )
}

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
      <div className="max-w-md w-full">
         <h1 className="font-headline text-4xl font-bold text-primary md:text-5xl mb-8 text-center">
          Access Your Account
        </h1>
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Login or Register</CardTitle>
            <CardDescription>
              Use your Google account to access all features.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<LoginFormSkeleton />}>
              <LoginForm />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
