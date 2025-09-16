
"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { Avatar } from "../ui/avatar";

export default function DeveloperCreditAlert() {
  return (
    <Alert variant="destructive" className="bg-red-100 border-red-200 text-red-800 dark:bg-red-900/30 dark:border-red-800/50 dark:text-red-200">
        <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 border-2 border-red-300 dark:border-red-700">
                <div className="bg-red-200/50 dark:bg-red-900/50 w-full h-full flex items-center justify-center">
                    <Terminal className="h-8 w-8 text-red-600 dark:text-red-300" />
                </div>
            </Avatar>
            <div>
                <AlertTitle className="font-headline text-lg text-red-900 dark:text-red-100">Under Development</AlertTitle>
                <AlertDescription className="text-red-800/90 dark:text-red-200/90">
                    This website is still in its early development phase.
                </AlertDescription>
            </div>
        </div>
    </Alert>
  );
}
