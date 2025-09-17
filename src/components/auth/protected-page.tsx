
'use client';

import { useEffect, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Skeleton } from '@/components/ui/skeleton';
import type { User } from 'firebase/auth';

interface ProtectedPageProps {
  children: ({ user }: { user: User }) => ReactNode;
  rejectionContent?: ReactNode;
  userFilter?: (user: User) => boolean;
}

/**
 * A client-side component to protect a page route.
 * It handles loading states and redirects unauthenticated users.
 * It can also apply an optional filter to the authenticated user.
 */
export default function ProtectedPage({ children, rejectionContent, userFilter }: ProtectedPageProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      const currentPath = window.location.pathname;
      router.push(`/login?redirect=${currentPath}`);
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
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  // If a filter is provided, check if the user passes it.
  if (userFilter && !userFilter(user)) {
    return rejectionContent || (
        <div className="text-center text-muted-foreground py-16">
            <h2 className="text-2xl font-semibold">Access Denied</h2>
            <p className="mt-2">You do not have permission to view this page.</p>
        </div>
    );
  }

  // If authenticated and passes filter (if any), render the children.
  return <>{children({ user })}</>;
}


// A generic Card skeleton for loading states on protected pages
function Card({ children }: { children: ReactNode }) {
    return <div className="rounded-lg border bg-card text-card-foreground shadow-sm">{children}</div>;
}
function CardHeader({ children }: { children: ReactNode }) {
    return <div className="flex flex-col space-y-1.5 p-6">{children}</div>;
}
function CardContent({ children }: { children: ReactNode }) {
    return <div className="p-6 pt-0">{children}</div>;
}
