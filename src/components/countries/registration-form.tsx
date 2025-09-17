
"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { registerCountryAction } from "@/lib/actions";
import { useRouter } from "next/navigation";

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
  owner: z.string().min(2, 'Owner name must be at least 2 characters.'),
});

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

  const form = useForm<z.infer<typeof CountrySchema>>({
    resolver: zodResolver(CountrySchema),
    defaultValues: {
      name: "",
      owner: "",
    },
    mode: 'onChange'
  });

  useEffect(() => {
    if (state.success) {
      toast({
        title: "Success",
        description: "Country registered successfully!",
      });
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

  return (
    <Form {...form}>
      <form action={formAction} className="space-y-6">
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
        <FormField
          control={form.control}
          name="owner"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Owner Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Alice" {...field} />
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
