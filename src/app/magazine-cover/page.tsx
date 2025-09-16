
'use server';
import MagazineCoverGenerator from "@/components/magazine/cover-generator";
import { getUpdates } from "@/lib/data";
import type { Update } from "@/lib/definitions";
import { getTranslations } from "@/lib/get-translations";

export default async function MagazineCoverPage() {
    const t = await getTranslations();
    const updates: Update[] = await getUpdates();

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="font-headline text-4xl font-bold text-primary md:text-5xl">
                    {t('magazineCover.title')}
                </h1>
                <p className="mt-2 text-lg text-muted-foreground">
                    {t('magazineCover.subtitle')}
                </p>
            </div>
            <MagazineCoverGenerator updates={updates} />
        </div>
    );
}
