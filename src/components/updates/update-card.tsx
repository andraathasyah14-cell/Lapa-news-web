
'use client';

import Image from "next/image";
import { useState, useMemo } from "react";
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
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface UpdateCardProps extends React.HTMLAttributes<HTMLDivElement> {
  update: Update;
  country?: Country;
}

const TRUNCATE_LENGTH = 300;

export function UpdateCard({ update, country, className, ...props }: UpdateCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const formattedDate = new Date(update.createdAt).toLocaleDateString("en-US", {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const isLongContent = update.content.length > TRUNCATE_LENGTH;

  const displayedContent = useMemo(() => {
    if (!isLongContent || isExpanded) {
      return update.content;
    }
    return `${update.content.substring(0, TRUNCATE_LENGTH)}...`;
  }, [isExpanded, update.content, isLongContent]);

  return (
    <Card 
      className={cn("overflow-hidden border-accent/50 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:border-accent hover:shadow-primary/10 hover:-translate-y-1 group", className)}
      {...props}
    >
      {update.coverImage && (
        <div className="aspect-video relative w-full overflow-hidden">
            <Image 
                src={update.coverImage} 
                alt={update.title} 
                fill 
                className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
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
      <CardContent className="space-y-4">
        <p className="text-card-foreground/90 leading-relaxed whitespace-pre-wrap">{displayedContent}</p>
        {isLongContent && (
            <Button variant="link" onClick={() => setIsExpanded(!isExpanded)} className="p-0 h-auto text-primary hover:text-primary/80">
                {isExpanded ? "Read Less" : "Read More"}
            </Button>
        )}
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
