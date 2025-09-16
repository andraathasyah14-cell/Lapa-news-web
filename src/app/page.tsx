
'use server';

import { getCountries, getUpdates } from '@/lib/data';
import { UpdateCard } from '@/components/updates/update-card';
import RegistrationAlert from '@/components/updates/registration-alert';
import type { Update, Country } from '@/lib/definitions';
import { getTranslations } from '@/lib/get-translations';

export default async function Home() {
  const t = await getTranslations();
  const [updates, countries] = await Promise.all([
    getUpdates(),
    getCountries(),
  ]);

  return (
    <div className="space-y-8">
      <RegistrationAlert />
      <h1 className="font-headline text-4xl font-bold text-primary md:text-5xl">
        {t('home.title')}
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
            <h2 className="text-2xl font-semibold">{t('home.noUpdatesTitle')}</h2>
            <p className="mt-2">{t('home.noUpdatesSubtitle')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
