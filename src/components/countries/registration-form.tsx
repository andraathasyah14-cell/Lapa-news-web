
"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { registerCountryAction } from "@/lib/actions";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      toast({
        title: "Success",
        description: "Country registered successfully!",
      });
      router.push('/countries');
      router.refresh(); 
      formRef.current?.reset();
    } else if (state.message && state.errors) {
       toast({
        variant: "destructive",
        title: "Error",
        description: state.message,
      });
    }
  }, [state, toast, router]);

  return (
    <form ref={formRef} action={formAction} className="space-y-6">
        <div className="space-y-2">
            <Label htmlFor="name">Country Name</Label>
            <Input id="name" name="name" placeholder="e.g., Republic of Eldoria" />
            {state.errors?.name && (
                <p className="text-sm font-medium text-destructive">
                    {state.errors.name[0]}
                </p>
            )}
        </div>
        <div className="space-y-2">
            <Label htmlFor="owner">Owner Name</Label>
            <Input id="owner" name="owner" placeholder="e.g., Alice" />
             {state.errors?.owner && (
                <p className="text-sm font-medium text-destructive">
                    {state.errors.owner[0]}
                </p>
            )}
        </div>
        <SubmitButton />
    </form>
  );
}
