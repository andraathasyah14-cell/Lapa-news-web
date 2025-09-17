
import CountryRegistrationForm from "@/components/countries/registration-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function RegisterCountryPage() {
  return (
    <div className="max-w-2xl mx-auto">
        <h1 className="font-headline text-4xl font-bold text-primary md:text-5xl mb-8 text-center">
          Found a New Nation
        </h1>
        <Card>
            <CardHeader>
                <CardTitle>Country Details</CardTitle>
                <CardDescription>
                    Provide the name of your new nation and the name of its owner.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <CountryRegistrationForm />
            </CardContent>
        </Card>
    </div>
  );
}
