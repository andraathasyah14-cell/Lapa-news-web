
import 'server-only';
import { cookies } from 'next/headers';
import type { Locale } from '@/hooks/use-localization';
import en from '@/locales/en.json';
import id from '@/locales/id.json';

const translations = { en, id };

export const getTranslations = async () => {
  const locale = (cookies().get('locale')?.value ?? 'en') as Locale;
  
  const t = (key: string): string => {
    const keys = key.split('.');
    let result: any = translations[locale];
    for (const k of keys) {
      result = result?.[k];
      if (result === undefined) {
        let fallbackResult: any = translations.en;
        for (const fk of keys) {
          fallbackResult = fallbackResult?.[fk];
        }
        return fallbackResult || key;
      }
    }
    return typeof result === 'string' ? result : key;
  };

  return t;
};
