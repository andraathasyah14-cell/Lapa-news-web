
"use client";

import UpdateSubmissionForm from "@/components/updates/submission-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Country } from "@/lib/definitions";
import ProtectedPage from "@/components/auth/protected-page";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface UpdateFormProps {
    allCountries: Country[];
}

export default function UpdateForm({ allCountries }: UpdateFormProps) {
    return (
        <ProtectedPage
            userFilter={(user) => {
                // The page is accessible if the user owns at least one country.
                return allCountries.some(c => c.owner === user.displayName);
            }}
            rejectionContent={
                <div className="max-w-2xl mx-auto text-center">
                    <h1 className="font-headline text-4xl font-bold text-primary md:text-5xl mb-4">
                        No Countries Found
                    </h1>
                     <p className="text-lg text-muted-foreground mb-8">
                        You need to own a country before you can submit an update.
                    </p>
                    <Button asChild>
                        <Link href="/register-country">Register a Country</Link>
                    </Button>
                </div>
            }
        >
            {({ user }) => {
                // This content is rendered only for authenticated users who own a country.
                const userCountries = allCountries.filter(c => c.owner === user.displayName);
                
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
                                <UpdateSubmissionForm countries={userCountries} />
                            </CardContent>
                        </Card>
                    </div>
                );
            }}
        </ProtectedPage>
    );
}
