import { getCountries, getUpdates } from '@/lib/data';
import { UpdateCard } from '@/components/updates/update-card';
import RegistrationAlert from '@/components/updates/registration-alert';

export default async function Home() {
  const updates = await getUpdates();
  const countries = await getCountries();

  return (
    <div className="space-y-8">
      <RegistrationAlert />
      <h1 className="font-headline text-4xl font-bold text-primary md:text-5xl">
        Global Update Feed
      </h1>
      <div className="grid grid-cols-1 gap-8">
        {updates.length > 0 ? (
          updates.map((update) => {
            const country = countries.find(c => c.id === update.countryId);
            return (
              <UpdateCard key={update.id} update={update} country={country} />
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
