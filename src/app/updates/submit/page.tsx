
import { getCountriesAction } from "@/lib/actions";
import type { Country } from "@/lib/definitions";
import UpdateSubmissionForm from "@/components/updates/submission-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const revalidate = 0;

export default async function SubmitUpdatePage() {
    const allCountries: Country[] = await getCountriesAction();

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="font-headline text-4xl font-bold text-primary md:text-5xl mb-8 text-center">
                Broadcast a Global Update
            </h1>
            <Card>
                <CardHeader>
                    <CardTitle>Update Details</CardTitle>
                    <CardDescription>
                        Share the latest news from one of the world's nations.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <UpdateSubmissionForm countries={allCountries} />
                </CardContent>
            </Card>
        </div>
    );
}
