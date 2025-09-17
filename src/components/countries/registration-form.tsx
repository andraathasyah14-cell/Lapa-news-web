
"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { registerCountryAction } from "@/lib/actions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? "Registering..." : "Register Country"}
    </Button>
  );
}

export default function CountryRegistrationForm() {
  const [state, formAction] = useActionState(registerCountryAction, {
    message: "",
    errors: undefined,
    success: false,
  });
  
  const { toast } = useToast();

  useEffect(() => {
    if (state.success) {
      // The redirect is now handled by the server action.
      // We can still show a toast if we want, but it might not be visible before the redirect happens.
      // For a better UX, we could pass a query param and show the toast on the destination page,
      // but for now, we'll keep it simple and let the redirect be the main feedback.
    } else if (state.message && state.errors) {
       toast({
        variant: "destructive",
        title: "Registration Failed",
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <form action={formAction} className="space-y-6">
        <div className="space-y-2">
            <Label htmlFor="name">Country Name</Label>
            <Input id="name" name="name" placeholder="e.g., Republic of Eldoria" />
            {state?.errors?.name && (
                <p className="text-sm font-medium text-destructive">
                    {state.errors.name[0]}
                </p>
            )}
        </div>
        <div className="space-y-2">
            <Label htmlFor="owner">Owner Name</Label>
            <Input id="owner" name="owner" placeholder="e.g., Alice" />
             {state?.errors?.owner && (
                <p className="text-sm font-medium text-destructive">
                    {state.errors.owner[0]}
                </p>
            )}
        </div>
        <SubmitButton />
    </form>
  );
}
