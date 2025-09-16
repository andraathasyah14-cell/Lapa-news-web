
"use client";

import { useState } from "react";
import Image from "next/image";
import { generateCoverAction } from "@/lib/actions";
import type { Update } from "@/lib/definitions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookImage, Loader2 } from "lucide-react";
import { useLocalization } from "@/hooks/use-localization";
import { useToast } from "@/hooks/use-toast";


export default function MagazineCoverGenerator({ updates }: { updates: Update[] }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const { t } = useLocalization();
  const { toast } = useToast();

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    setError(null);
    setCoverImage(null);

    const result = await generateCoverAction(formData);

    if (result.error) {
      const errorMessage = t(result.error);
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      });
    } else if (result.coverImage) {
      setCoverImage(result.coverImage);
    }

    setLoading(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
      <Card>
        <CardContent className="pt-6">
          <form action={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="updateId" className="block text-sm font-medium mb-2">
                {t('magazineCover.selectLabel')}
              </label>
              <Select name="updateId" required>
                <SelectTrigger id="updateId">
                  <SelectValue placeholder={t('magazineCover.selectPlaceholder')} />
                </SelectTrigger>
                <SelectContent>
                  {updates.map((update) => (
                    <SelectItem key={update.id} value={update.id}>
                      {update.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t('magazineCover.generateButtonPending')}
                </>
              ) : (
                <>
                  <BookImage className="mr-2 h-4 w-4" />
                  {t('magazineCover.generateButton')}
                </>
              )}
            </Button>
            {error && <p className="text-sm font-medium text-destructive">{error}</p>}
          </form>
        </CardContent>
      </Card>
      <div className="flex items-center justify-center aspect-[3/4] rounded-lg border-2 border-dashed bg-muted/50">
        {loading && (
            <div className="flex flex-col items-center gap-4 text-muted-foreground">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="font-semibold">{t('magazineCover.generatingAlt')}</p>
                <p className="text-sm">{t('magazineCover.generatingAltSub')}</p>
            </div>
        )}
        {coverImage && !loading && (
            <Image
                src={coverImage}
                alt="Generated Magazine Cover"
                width={600}
                height={800}
                className="rounded-md object-cover"
                data-ai-hint="magazine cover"
            />
        )}
        {!loading && !coverImage && (
             <div className="flex flex-col items-center gap-2 text-muted-foreground text-center p-4">
                <BookImage className="h-12 w-12" />
                <p className="font-semibold">{t('magazineCover.placeholder')}</p>
            </div>
        )}
      </div>
    </div>
  );
}

