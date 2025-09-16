
'use client';
import CountryRegistrationForm from "@/components/countries/registration-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocalization } from "@/hooks/use-localization";

export default function RegisterCountryPage() {
  const { t } = useLocalization();
  return (
    <div className="max-w-2xl mx-auto">
        <h1 className="font-headline text-4xl font-bold text-primary md:text-5xl mb-8 text-center">
          {t('registerCountry.title')}
        </h1>
        <Card>
            <CardHeader>
                <CardTitle>{t('registerCountry.cardTitle')}</CardTitle>
                <CardDescription>
                    {t('registerCountry.cardDescription')}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <CountryRegistrationForm />
            </CardContent>
        </Card>
    </div>
  );
}
