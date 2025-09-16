
"use client";
import { atom, useAtom } from 'jotai';
import en from '@/locales/en.json';
import id from '@/locales/id.json';

export type Locale = 'en' | 'id';

const translations = { en, id };

export const localeAtom = atom<Locale>('en');

export const useLocalization = () => {
  const [locale, setLocale] = useAtom(localeAtom);
  
  const t = (key: string) => {
    const keys = key.split('.');
    let result: any = translations[locale];
    for (const k of keys) {
      result = result?.[k];
      if (result === undefined) {
        // Fallback to English if translation is missing
        result = translations.en;
        for (const fk of keys) {
          result = result?.[fk];
        }
        return result || key;
      }
    }
    return result || key;
  };
  
  return { locale, setLocale, t };
};
