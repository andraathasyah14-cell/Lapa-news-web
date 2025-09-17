
'use client';

import { useState, useEffect } from 'react';
import { getCountryByIdAction, getUpdatesByCountryIdAction } from '@/lib/actions';
import type { Country, Update } from '@/lib/definitions';
import { notFound } from 'next/navigation';
import { UpdateCard } from '@/components/updates/update-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

function ProfilePageSkeleton() {
    return (
        <div className="space-y-8">
            <Card className="bg-card/90">
                <CardHeader>
                    <Skeleton className="h-12 w-3/4" />
                    <Skeleton className="h-4 w-1/4 mt-2" />
                </CardHeader>
            </Card>
            <Skeleton className="h-10 w-1/3" />
            <div className="grid grid-cols-1 gap-8">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-48 w-full" />
            </div>
        </div>
    );
}

export default function CountryProfilePage({ params }: { params: { id: string } }) {
  const [country, setCountry] = useState<Country | null>(null);
  const [updates, setUpdates] = useState<Update[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const countryData = await getCountryByIdAction(params.id);
        if (!countryData) {
          notFound();
          return;
        }
        setCountry(countryData);
        
        const updatesData = await getUpdatesByCountryIdAction(countryData.id);
        setUpdates(updatesData);
      } catch (error) {
        console.error("Failed to fetch country data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [params.id]);
  
  if (loading) {
    return <ProfilePageSkeleton />;
  }
  
  if (!country) {
    notFound();
    return null;
  }

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
