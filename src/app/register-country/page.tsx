
'use server';

import CountryRegistrationForm from "@/components/countries/registration-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ProtectedPage from "@/components/auth/protected-page";

export default function RegisterCountryPage() {
  return (
    <ProtectedPage>
      {({ user }) => (
        <div className="max-w-2xl mx-auto">
            <h1 className="font-headline text-4xl font-bold text-primary md:text-5xl mb-8 text-center">
              Found a New Nation
            </h1>
            <Card>
                <CardHeader>
                    <CardTitle>Country Details</CardTitle>
                    <CardDescription>
                        Provide the name of your new nation. Your name, <span className="font-bold text-primary">{user.displayName}</span>, will be automatically set as the owner.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <CountryRegistrationForm user={user} />
                </CardContent>
            </Card>
        </div>
      )}
    </ProtectedPage>
  );
}
