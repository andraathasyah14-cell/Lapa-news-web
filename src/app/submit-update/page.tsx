
import { getCountries } from "@/lib/data";
import type { Country } from "@/lib/definitions";
import UpdateForm from "@/components/updates/update-form";

// This is now a simple Server Component that only fetches data
// and passes it to the client component.
export default async function SubmitUpdatePage() {
    const allCountries: Country[] = await getCountries();

    return <UpdateForm allCountries={allCountries} />;
}
