
"use client";

import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocalization } from "@/hooks/use-localization";
import { Avatar } from "../ui/avatar";
import { UserIcon } from "../icons/user-icon";

const STORAGE_KEY = "geopolitika_fantastica_dev_credit_dismissed";

export default function DeveloperCreditAlert() {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLocalization();

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
    <Alert className="bg-card/80 border-card-foreground/20 relative pr-12 text-card-foreground">
        <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 border-2 border-primary/50">
                <div className="bg-primary/20 w-full h-full flex items-center justify-center">
                    <UserIcon className="h-8 w-8 text-primary" />
                </div>
            </Avatar>
            <div>
                <AlertTitle className="font-headline text-lg">Developed by Andra</AlertTitle>
                <AlertDescription className="text-card-foreground/80">
                    Welcome to the app! Hope you enjoy your stay.
                </AlertDescription>
            </div>
        </div>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 h-6 w-6 text-card-foreground/80 hover:text-card-foreground"
        onClick={handleDismiss}
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Dismiss</span>
      </Button>
    </Alert>
  );
}
