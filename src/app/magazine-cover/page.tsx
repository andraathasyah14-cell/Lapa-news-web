
'use client';
import MagazineCoverGenerator from "@/components/magazine/cover-generator";
import { getUpdates } from "@/lib/data";
import { useLocalization } from "@/hooks/use-localization";
import { useEffect, useState } from "react";
import type { Update } from "@/lib/definitions";

export default function MagazineCoverPage() {
    const { t } = useLocalization();
    const [updates, setUpdates] = useState<Update[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUpdates() {
            const data = await getUpdates();
            setUpdates(data);
            setLoading(false);
        }
        fetchUpdates();
    }, []);

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
            {loading ? <p>Loading updates...</p> : <MagazineCoverGenerator updates={updates} />}
        </div>
    );
}
