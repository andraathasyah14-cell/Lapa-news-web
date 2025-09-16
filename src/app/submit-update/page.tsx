
'use client';
import UpdateSubmissionForm from "@/components/updates/submission-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getCountries } from "@/lib/data";
import { useLocalization } from "@/hooks/use-localization";
import { useEffect, useState } from "react";
import type { Country } from "@/lib/definitions";

export default function SubmitUpdatePage() {
    const { t } = useLocalization();
    const [countries, setCountries] = useState<Country[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCountries() {
            const data = await getCountries();
            setCountries(data);
            setLoading(false);
        }
        fetchCountries();
    }, []);

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
                    {loading ? <p>Loading countries...</p> : <UpdateSubmissionForm countries={countries} />}
                </CardContent>
            </Card>
        </div>
    );
}
