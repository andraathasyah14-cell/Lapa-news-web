
"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { Avatar } from "../ui/avatar";

export default function DeveloperCreditAlert() {
  return (
    <Alert variant="destructive" className="bg-destructive/10 border-destructive/50 text-destructive">
        <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 border-2 border-destructive/50">
                <div className="bg-destructive/10 w-full h-full flex items-center justify-center">
                    <Terminal className="h-8 w-8 text-destructive" />
                </div>
            </Avatar>
            <div>
                <AlertTitle className="font-headline text-lg text-destructive">Under Development</AlertTitle>
                <AlertDescription className="text-destructive/80">
                    This website is still in its early development phase.
                </AlertDescription>
            </div>
        </div>
    </Alert>
  );
}
