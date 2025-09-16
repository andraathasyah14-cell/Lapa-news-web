import MagazineCoverGenerator from "@/components/magazine/cover-generator";
import { getUpdates } from "@/lib/data";

export default async function MagazineCoverPage() {
    const updates = await getUpdates();

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="font-headline text-4xl font-bold text-primary md:text-5xl">
                    Monthly Cover Generator
                </h1>
                <p className="mt-2 text-lg text-muted-foreground">
                    Select a major global update to feature on this month's digital cover.
                </p>
            </div>
            <MagazineCoverGenerator updates={updates} />
        </div>
    );
}
