
'use server';

import { getCountries } from "@/lib/data";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { getTranslations } from "@/lib/get-translations";
import type { Country } from "@/lib/definitions";

export default async function CountriesPage() {
  const t = await getTranslations();
  const countries: Country[] = await getCountries();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="font-headline text-4xl font-bold text-primary md:text-5xl">
          {t('countries.title')}
        </h1>
        <Button asChild>
          <Link href="/register-country">
            <PlusCircle className="mr-2 h-4 w-4" />
            {t('countries.registerNew')}
          </Link>
        </Button>
      </div>

      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40%]">{t('countries.countryNameHeader')}</TableHead>
              <TableHead>{t('countries.ownerHeader')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
             {countries.length > 0 ? (
              countries.map((country) => (
                <TableRow key={country.id}>
                  <TableCell className="font-medium">{country.name}</TableCell>
                  <TableCell>{country.owner}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} className="text-center">
                  {t('countries.noCountries')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          {countries.length === 0 && (
             <TableCaption>{t('countries.noCountries')}</TableCaption>
          )}
        </Table>
      </div>
    </div>
  );
}
