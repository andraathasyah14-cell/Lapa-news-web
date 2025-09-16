"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { submitUpdateAction } from "@/lib/actions";
import type { Country } from "@/lib/definitions";

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
import { useLocalization } from "@/hooks/use-localization";

function SubmitButton() {
  const { pending } = useFormStatus();
  const { t } = useLocalization();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? t('submitUpdate.buttonPending') : t('submitUpdate.button')}
    </Button>
  );
}

export default function UpdateSubmissionForm({ countries }: { countries: Country[] }) {
  const { t, locale } = useLocalization();
  
  const UpdateSchema = z.object({
    title: z.string().min(5, t('validation.titleMin')),
    content: z.string().min(20, t('validation.contentMin')),
    year: z.coerce.number().int().min(1, t('validation.yearMin')),
    countryId: z.string().min(1, t('validation.countryRequired')),
    needsMapUpdate: z.boolean().default(false).optional(),
  });

  const [state, formAction] = useActionState(submitUpdateAction, {
    message: "",
    errors: undefined,
  });
  const { toast } = useToast();

  const form = useForm<z.infer<typeof UpdateSchema>>({
    resolver: zodResolver(UpdateSchema),
    defaultValues: {
      title: "",
      content: "",
      year: new Date().getFullYear(),
      countryId: "",
      needsMapUpdate: false,
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

  useEffect(() => {
    form.trigger();
  }, [locale, form]);


  return (
    <Form {...form}>
      <form action={formAction} className="space-y-6">
        <FormField
          control={form.control}
          name="countryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('submitUpdate.countryLabel')}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t('submitUpdate.countryPlaceholder')} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.id} value={country.id}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('submitUpdate.updateTitleLabel')}</FormLabel>
              <FormControl>
                <Input placeholder={t('submitUpdate.updateTitlePlaceholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('submitUpdate.contentLabel')}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t('submitUpdate.contentPlaceholder')}
                  className="min-h-[150px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="year"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('submitUpdate.yearLabel')}</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="needsMapUpdate"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
               <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  {t('submitUpdate.needsMapUpdateLabel')}
                </FormLabel>
              </div>
            </FormItem>
          )}
        />
        <SubmitButton />
      </form>
    </Form>
  );
}
