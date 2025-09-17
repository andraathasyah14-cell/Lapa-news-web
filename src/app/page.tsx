
'use server';

import { getCountries, getUpdates } from '@/lib/data';
import { UpdateCard } from '@/components/updates/update-card';
import type { Update, Country } from '@/lib/definitions';
import DeveloperCreditAlert from '@/components/layout/developer-credit-alert';
import LapaClock from '@/components/layout/lapa-clock';
import RegistrationAlert from '@/components/layout/registration-alert';

export default async function Home() {
  const [updates, countries] = await Promise.all([
    getUpdates(),
    getCountries(),
  ]);

  return (
    <div className="space-y-8">
      <DeveloperCreditAlert />
      <RegistrationAlert countries={countries} />
      <LapaClock />
      <h1 className="font-headline text-4xl font-bold text-primary md:text-5xl">
        Global Update Feed
      </h1>
      <div className="grid grid-cols-1 gap-8">
        {updates.length > 0 ? (
          updates.map((update, index) => {
            const country = countries.find(c => c.id === update.countryId);
            return (
              <UpdateCard 
                key={update.id} 
                update={update} 
                country={country}
                style={{ animationDelay: `${index * 100}ms` }}
                className="animate-in fade-in-0 slide-in-from-bottom-4 duration-500"
              />
            );
          })
        ) : (
          <div className="text-center text-muted-foreground py-16">
            <h2 className="text-2xl font-semibold">No updates yet.</h2>
            <p className="mt-2">Be the first to shape the world!</p>
          </div>
        )}
      </div>
    </div>
  );
}
