"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const handleLanguageChange = (lang: string) => {
    // In a real app, you'd likely set this in a context or state management solution
    // and potentially save it to localStorage or a cookie.
    console.log(`Language changed to: ${lang}`);
  };

  return (
    <Select defaultValue="en" onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-auto gap-2 border-none bg-transparent text-foreground shadow-none focus:ring-0">
        <Globe className="h-4 w-4" />
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="id">Indonesia</SelectItem>
      </SelectContent>
    </Select>
  );
}
