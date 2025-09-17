
"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { submitUpdateAction } from "@/lib/actions";
import type { Country } from "@/lib/definitions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "../ui/label";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? "Submitting..." : "Submit Update"}
    </Button>
  );
}

export default function UpdateSubmissionForm({ countries }: { countries: Country[] }) {
  const [state, formAction] = useActionState(submitUpdateAction, {
    message: "",
    errors: undefined,
    success: false,
  });
  
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      toast({
        title: "Success!",
        description: "Your update has been submitted.",
      });
      formRef.current?.reset();
      // Redirect is handled by the server action
    } else if (state.message && state.errors) {
       toast({
        variant: "destructive",
        title: "Submission Failed",
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <form ref={formRef} action={formAction} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="countryId">Country</Label>
        <Select name="countryId">
          <SelectTrigger id="countryId">
            <SelectValue placeholder="Select a country for this update" />
          </SelectTrigger>
          <SelectContent>
            {countries.map((country) => (
              <SelectItem key={country.id} value={country.id}>
                {country.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {state?.errors?.countryId && (
            <p className="text-sm font-medium text-destructive">
                {state.errors.countryId[0]}
            </p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="title">Update Title</Label>
        <Input id="title" name="title" placeholder="e.g., Economic Boom in the Western Provinces" />
        {state?.errors?.title && (
            <p className="text-sm font-medium text-destructive">
                {state.errors.title[0]}
            </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="coverImage">Cover Image (Optional)</Label>
        <Input id="coverImage" name="coverImage" type="file" accept="image/*" />
        {state?.errors?.coverImage && (
            <p className="text-sm font-medium text-destructive">
                {state.errors.coverImage[0]}
            </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          name="content"
          placeholder="Share the details of your country's latest developments..."
          className="min-h-[150px]"
        />
        {state?.errors?.content && (
            <p className="text-sm font-medium text-destructive">
                {state.errors.content[0]}
            </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="year">Year</Label>
        <Input id="year" name="year" type="number" defaultValue={new Date().getFullYear()} />
        {state?.errors?.year && (
            <p className="text-sm font-medium text-destructive">
                {state.errors.year[0]}
            </p>
        )}
      </div>

      <div className="flex items-center space-x-2 rounded-md border p-4">
        <Checkbox id="needsMapUpdate" name="needsMapUpdate" />
        <Label htmlFor="needsMapUpdate" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Does this update change the world map?
        </Label>
      </div>
      
      <SubmitButton />
    </form>
  );
}
