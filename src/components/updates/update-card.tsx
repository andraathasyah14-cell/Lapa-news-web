
'use client';

import type { Update, Country } from "@/lib/definitions";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CommentSection } from "@/components/updates/comment-section";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Map } from "lucide-react";
import { useLocalization } from "@/hooks/use-localization";

interface UpdateCardProps {
  update: Update;
  country?: Country;
}

export function UpdateCard({ update, country }: UpdateCardProps) {
  const { t } = useLocalization();
  const formattedDate = new Date(update.createdAt).toLocaleDateString("en-US", {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Card className="overflow-hidden border-accent bg-card/90 backdrop-blur-sm">
      <CardHeader>
        <div className="flex justify-between items-start">
            <CardDescription className="text-card-foreground/80">
                {t('updateCard.from')} <span className="font-semibold text-card-foreground">{country?.name || t('updateCard.unknownNation')}</span> &bull; {formattedDate} &bull; {t('updateCard.year')} {update.year}
            </CardDescription>
            {update.needsMapUpdate && (
                <Badge variant="destructive" className="flex items-center gap-1">
                    <Map className="h-3 w-3" />
                    <span>{t('updateCard.mapUpdate')}</span>
                </Badge>
            )}
        </div>
        <CardTitle className="font-headline text-3xl text-card-foreground">{update.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-card-foreground/90 leading-relaxed">{update.content}</p>
      </CardContent>
      <CardFooter>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="comments" className="border-t border-b-0">
            <AccordionTrigger>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MessageSquare className="h-4 w-4" />
                <span>{t('updateCard.comments')} ({update.comments.length})</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <CommentSection updateId={update.id} comments={update.comments} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardFooter>
    </Card>
  );
}
