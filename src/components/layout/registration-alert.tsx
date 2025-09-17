
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import type { Country } from "@/lib/definitions";

const STORAGE_KEY_DISMISSED = "geopolitika_fantastica_registration_alert_dismissed";

interface RegistrationAlertProps {
    countries: Country[];
}

export default function RegistrationAlert({ countries }: RegistrationAlertProps) {
  const { user, loading } = useAuth();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (loading || !user) {
      setIsVisible(false);
      return;
    }

    const hasDismissed = localStorage.getItem(STORAGE_KEY_DISMISSED);
    if (hasDismissed) {
        setIsVisible(false);
        return;
    }
    
    const userOwnsCountry = countries.some(country => country.owner === user.displayName);
    
    if (!userOwnsCountry) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }

  }, [user, loading, countries]);

  const handleDismiss = () => {
    localStorage.setItem(STORAGE_KEY_DISMISSED, "true");
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Alert className="bg-card/80 border-accent/50 relative pr-12 text-card-foreground backdrop-blur-sm">
      <AlertCircle className="h-4 w-4 text-primary" />
      <AlertTitle className="font-headline text-primary">Welcome to the World Stage, {user?.displayName}!</AlertTitle>
      <AlertDescription className="text-card-foreground/80">
        It looks like you haven't founded a nation yet.{" "}
        <Link href="/register-country" className="font-bold text-primary/90 underline hover:text-primary">
          Register your country
        </Link>
        {" "}to start shaping global events!
      </AlertDescription>
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
