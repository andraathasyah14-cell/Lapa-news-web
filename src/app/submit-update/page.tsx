
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import UpdateSubmissionForm from "@/components/updates/submission-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getCountries } from "@/lib/data";
import type { Country } from "@/lib/definitions";
import { useAuth } from '@/hooks/use-auth';
import { Skeleton } from '@/components/ui/skeleton';
import { useActionState } from 'react';

// Since we cannot use hooks directly in Server Components, 
// we create a client component that fetches the data.
function SubmitUpdatePageContent({ countries }: { countries: Country[] }) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login?redirect=/submit-update');
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

    // Filter countries to only show the ones owned by the current user
    const userCountries = countries.filter(c => c.owner === user.displayName);

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="font-headline text-4xl font-bold text-primary md:text-5xl mb-8 text-center">
                Broadcast a Global Update
            </h1>
            <Card>
                <CardHeader>
                    <CardTitle>Update Details</CardTitle>
                    <CardDescription>
                        Share the latest news from your nation. You can only post updates for countries you own.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {userCountries.length > 0 ? (
                        <UpdateSubmissionForm countries={userCountries} />
                    ) : (
                        <div className="text-center text-muted-foreground py-8">
                            <h2 className="text-xl font-semibold">No Countries Found</h2>
                            <p className="mt-2">You do not own any countries yet. Please register a country before submitting an update.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}


// This remains a server component to fetch initial data
export default function SubmitUpdatePage() {
    // We fetch all countries here on the server
    const [countries, setCountries] = useActionState(async () => await getCountries(), []);
    
    return <SubmitUpdatePageContent countries={countries as Country[]} />;
}
