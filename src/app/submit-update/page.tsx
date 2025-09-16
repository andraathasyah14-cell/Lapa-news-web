
'use server';
import UpdateSubmissionForm from "@/components/updates/submission-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getCountries } from "@/lib/data";
import { getTranslations } from "@/lib/get-translations";
import type { Country } from "@/lib/definitions";

export default async function SubmitUpdatePage() {
    const t = await getTranslations();
    const countries: Country[] = await getCountries();

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="font-headline text-4xl font-bold text-primary md:text-5xl mb-8 text-center">
                {t('submitUpdate.title')}
            </h1>
            <Card>
                <CardHeader>
                    <CardTitle>{t('submitUpdate.cardTitle')}</CardTitle>
                    <CardDescription>
                        {t('submitUpdate.cardDescription')}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <UpdateSubmissionForm countries={countries} />
                </CardContent>
            </Card>
        </div>
    );
}
