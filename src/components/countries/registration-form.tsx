"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { registerCountryAction } from "@/lib/actions";

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
import { useLocalization } from "@/hooks/use-localization";

const CountrySchema = z.object({
  name: z.string().min(3, 'validation.countryNameMin'),
  owner: z.string().min(2, 'validation.ownerNameMin'),
});

function SubmitButton() {
  const { pending } = useFormStatus();
  const { t } = useLocalization();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? t('registerCountry.buttonPending') : t('registerCountry.button')}
    </Button>
  );
}

export default function CountryRegistrationForm() {
  const { t } = useLocalization();

  const [state, formAction] = useActionState(registerCountryAction, {
    message: "",
    errors: undefined,
  });
  const { toast } = useToast();

  const form = useForm<z.infer<typeof CountrySchema>>({
    resolver: zodResolver(CountrySchema),
    defaultValues: {
      name: "",
      owner: "",
    },
    mode: 'onChange'
  });

  useEffect(() => {
    if (state?.message && state.errors) {
       toast({
        variant: "destructive",
        title: "Error",
        description: t(state.message),
      });
    }
  }, [state, toast, t]);

  return (
    <Form {...form}>
      <form action={formAction} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('registerCountry.countryNameLabel')}</FormLabel>
              <FormControl>
                <Input placeholder={t('registerCountry.countryNamePlaceholder')} {...field} />
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
              <FormLabel>{t('registerCountry.ownerNameLabel')}</FormLabel>
              <FormControl>
                <Input placeholder={t('registerCountry.ownerNamePlaceholder')} {...field} />
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
