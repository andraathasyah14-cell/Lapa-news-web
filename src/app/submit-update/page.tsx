import UpdateSubmissionForm from "@/components/updates/submission-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getCountries } from "@/lib/data";

export default async function SubmitUpdatePage() {
    const countries = await getCountries();

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="font-headline text-4xl font-bold text-primary md:text-5xl mb-8 text-center">
                Broadcast a Global Update
            </h1>
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
