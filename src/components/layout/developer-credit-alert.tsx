
"use client";

import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { X, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar } from "../ui/avatar";

const STORAGE_KEY = "uln_dev_warning_dismissed";

export default function DeveloperCreditAlert() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // This code runs only on the client
    const hasDismissed = localStorage.getItem(STORAGE_KEY);
    if (!hasDismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Alert className="bg-card/80 border-accent/50 relative pr-12 text-card-foreground backdrop-blur-sm">
        <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 border-2 border-primary/50">
                <div className="bg-primary/10 w-full h-full flex items-center justify-center">
                    <Terminal className="h-8 w-8 text-primary" />
                </div>
            </Avatar>
            <div>
                <AlertTitle className="font-headline text-lg text-primary">Under Development</AlertTitle>
                <AlertDescription className="text-card-foreground/80">
                    This website is still in its early development phase.
                </AlertDescription>
            </div>
        </div>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 h-6 w-6 text-card-foreground/60 hover:text-card-foreground"
        onClick={handleDismiss}
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Dismiss</span>
      </Button>
    </Alert>
  );
}
