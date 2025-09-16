
'use server';
import UpdateSubmissionForm from "@/components/updates/submission-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getCountries } from "@/lib/data";
import type { Country } from "@/lib/definitions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";


export default async function SubmitUpdatePage() {
    const countries: Country[] = await getCountries();

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="font-headline text-4xl font-bold text-primary md:text-5xl mb-8 text-center">
                Broadcast a Global Update
            </h1>
            <Alert variant="destructive" className="mb-8">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Important Notice</AlertTitle>
                <AlertDescription>
                    For now, all updates must be submitted via WhatsApp to the admins (Tamim or Andra).
                </AlertDescription>
            </Alert>
            <Card>
                <CardHeader>
                    <CardTitle>Update Details</CardTitle>
                    <CardDescription>
                        Share the latest news from your nation with the world. Your update will appear on the global feed.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <UpdateSubmissionForm countries={countries} />
                </CardContent>
            </Card>
        </div>
    );
}
