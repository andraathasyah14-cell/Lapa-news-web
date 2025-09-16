
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
import type { Country } from "@/lib/definitions";
import { FeatureLockDialog } from "@/components/layout/feature-lock-dialog";

export default async function CountriesPage() {
  const countries: Country[] = await getCountries();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="font-headline text-4xl font-bold text-primary md:text-5xl">
          Registered Nations
        </h1>
        <FeatureLockDialog>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Register New
          </Button>
        </FeatureLockDialog>
      </div>

      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40%]">Country Name</TableHead>
              <TableHead>Owner</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
             {countries.length > 0 ? (
              countries.map((country) => (
                <TableRow key={country.id}>
                  <TableCell className="font-medium">
                    <Link href={`/countries/${country.id}`} className="hover:underline text-primary/90 hover:text-primary font-semibold">
                      {country.name}
                    </Link>
                  </TableCell>
                  <TableCell>{country.owner}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} className="text-center">
                  No countries have been registered yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          {countries.length === 0 && (
             <TableCaption>No countries have been registered yet.</TableCaption>
          )}
        </Table>
      </div>
    </div>
  );
}
