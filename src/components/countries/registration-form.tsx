
"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { registerCountryAction } from "@/lib/actions";
import { useRouter } from "next/navigation";
import type { User } from 'firebase/auth';

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const CountrySchema = z.object({
  name: z.string().min(3, 'Country name must be at least 3 characters.'),
  owner: z.string(), // Owner will be passed programmatically
});

const STORAGE_KEY = "geopolitika_fantastica_registered";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? "Registering..." : "Register Country"}
    </Button>
  );
}

export default function CountryRegistrationForm({ user }: { user: User }) {
  const [state, formAction] = useActionState(registerCountryAction, {
    message: "",
    errors: undefined,
    success: false,
  });
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof CountrySchema>>({
    resolver: zodResolver(CountrySchema),
    defaultValues: {
      name: "",
      owner: user.displayName ?? "Anonymous",
    },
    mode: 'onChange'
  });

  useEffect(() => {
    if (state.success) {
      toast({
        title: "Success",
        description: "Country registered successfully!",
      });
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, "true");
      }
      router.push('/countries');
      router.refresh(); 
    } else if (state.message && state.errors) {
       toast({
        variant: "destructive",
        title: "Error",
        description: state.message,
      });
    }
  }, [state, toast, router]);
  
  const actionWithOwner = (payload: FormData) => {
    payload.append('owner', user.displayName ?? "Anonymous");
    formAction(payload);
  }

  return (
    <Form {...form}>
      <form action={actionWithOwner} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Republic of Eldoria" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton />
      </form>
    </Form>
  );
}
