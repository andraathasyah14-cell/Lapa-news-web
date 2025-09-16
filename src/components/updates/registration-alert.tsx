"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "geopolitika_fantastica_registered";

export default function RegistrationAlert() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // This code runs only on the client
    const hasRegistered = localStorage.getItem(STORAGE_KEY);
    if (!hasRegistered) {
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
      <AlertCircle className="h-4 w-4" />
      <AlertTitle className="font-headline">Welcome to the World Stage!</AlertTitle>
      <AlertDescription className="text-card-foreground/80">
        It looks like you haven't founded a nation yet.{" "}
        <Link href="/register-country" className="font-bold underline hover:text-card-foreground">
          Register your country
        </Link>{" "}
        to start shaping global events!
      </AlertDescription>
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
