
'use server';

import { getCountryById, getUpdatesByCountryId } from '@/lib/data';
import type { Country, Update } from '@/lib/definitions';
import { notFound } from 'next/navigation';
import { UpdateCard } from '@/components/updates/update-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from 'lucide-react';

export default async function CountryProfilePage({ params }: { params: { id: string } }) {
  const country = await getCountryById(params.id);
  
  if (!country) {
    notFound();
  }

  const [updates, allCountries] = await Promise.all([
    getUpdatesByCountryId(country.id),
  ]);

  return (
    <div className="space-y-8">
      <Card className="bg-card/90">
        <CardHeader>
          <CardTitle className="font-headline text-4xl md:text-5xl text-primary">
            {country.name}
          </CardTitle>
          <div className="flex items-center gap-2 text-muted-foreground pt-2">
            <User className="h-4 w-4" />
            <span>Owned by: {country.owner}</span>
          </div>
        </CardHeader>
      </Card>
      
      <h2 className="font-headline text-3xl font-bold text-primary md:text-4xl">
        National Archives
      </h2>
      
      <div className="grid grid-cols-1 gap-8">
        {updates.length > 0 ? (
          updates.map((update, index) => (
            <UpdateCard
              key={update.id}
              update={update}
              country={country}
              style={{ animationDelay: `${index * 100}ms` }}
              className="animate-in fade-in-0 slide-in-from-bottom-4 duration-500"
            />
          ))
        ) : (
          <div className="text-center text-muted-foreground py-16">
            <h2 className="text-2xl font-semibold">No updates yet from {country.name}.</h2>
            <p className="mt-2">The archives are quiet... for now.</p>
          </div>
        )}
      </div>
    </div>
  );
}
