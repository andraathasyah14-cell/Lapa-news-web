
'use client';

import Image from "next/image";
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

interface UpdateCardProps {
  update: Update;
  country?: Country;
}

export function UpdateCard({ update, country }: UpdateCardProps) {
  const formattedDate = new Date(update.createdAt).toLocaleDateString("en-US", {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Card className="overflow-hidden border-accent/50 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 group">
      {update.coverImage && (
        <div className="aspect-video relative w-full overflow-hidden">
            <Image 
                src={update.coverImage} 
                alt={update.title} 
                fill 
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint="news story" 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
        </div>
      )}
      <CardHeader>
        <div className="flex justify-between items-start">
            <CardDescription className="text-card-foreground/80">
                From <span className="font-semibold text-card-foreground">{country?.name || "An unknown nation"}</span> &bull; {formattedDate} &bull; Year {update.year}
            </CardDescription>
            {update.needsMapUpdate && (
                <Badge variant="destructive" className="flex items-center gap-1.5 py-1 px-2.5">
                    <Map className="h-3 w-3" />
                    <span>Map Update</span>
                </Badge>
            )}
        </div>
        <CardTitle className="font-headline text-3xl text-primary">{update.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-card-foreground/90 leading-relaxed whitespace-pre-wrap">{update.content}</p>
      </CardContent>
      <CardFooter>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="comments" className="border-t border-border/50">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <MessageSquare className="h-4 w-4" />
                <span>View Comments ({update.comments.length})</span>
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
