
"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe } from "lucide-react";
import { useLocalization, type Locale } from "@/hooks/use-localization";
import { useAtomValue } from "jotai";
import { localeAtom } from "@/hooks/use-localization";
import { usePathname, useRouter } from "next/navigation";
import Cookies from 'js-cookie';

export default function LanguageSwitcher() {
  const { setLocale, t } = useLocalization();
  const locale = useAtomValue(localeAtom);
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (lang: string) => {
    const newLocale = lang as Locale;
    setLocale(newLocale);
    // Set a cookie that the server can read
    Cookies.set('locale', newLocale, { expires: 365 });
    // Refresh the page to re-fetch server components with the new locale
    router.refresh();
  };

  return (
    <Select value={locale} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-auto gap-2 border-none bg-transparent text-foreground shadow-none focus:ring-0">
        <Globe className="h-4 w-4" />
        <SelectValue placeholder={t('header.language')} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">{t('header.english')}</SelectItem>
        <SelectItem value="id">{t('header.indonesian')}</SelectItem>
      </SelectContent>
    </Select>
  );
}
