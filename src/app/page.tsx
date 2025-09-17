
'use server';

import { getCountries, getUpdates } from '@/lib/data';
import { UpdateCard } from '@/components/updates/update-card';
import type { Update, Country } from '@/lib/definitions';
import DeveloperCreditAlert from '@/components/layout/developer-credit-alert';
import LapaClock from '@/components/layout/lapa-clock';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { HelpCircle } from 'lucide-react';
import Link from 'next/link';

export default async function Home() {
  const [updates, countries] = await Promise.all([
    getUpdates(),
    getCountries(),
  ]);

  return (
    <div className="space-y-8">
       <Alert variant="destructive" className="bg-blue-100 border-blue-200 text-blue-800 dark:bg-blue-900/30 dark:border-blue-800/50 dark:text-blue-200">
        <div className="flex items-center gap-4">
            <HelpCircle className="h-6 w-6 text-blue-600 dark:text-blue-300" />
            <div>
                <AlertTitle className="font-headline text-lg text-blue-900 dark:text-blue-100">Registrasi Gagal? Klik di Sini!</AlertTitle>
                <AlertDescription className="text-blue-800/90 dark:text-blue-200/90">
                    Jika Anda tidak bisa registrasi atau input data, ada satu pengaturan penting yang harus diubah di website Firebase. 
                    <Link href="/help-firebase" className="font-bold underline hover:text-blue-700 dark:hover:text-blue-100">
                        Klik di sini untuk melihat panduan visual langkah-demi-langkah.
                    </Link>
                </AlertDescription>
            </div>
        </div>
    </Alert>
      <DeveloperCreditAlert />
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
