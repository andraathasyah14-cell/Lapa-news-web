
"use client";
import { atom, useAtom } from 'jotai';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import en from '@/locales/en.json';
import id from '@/locales/id.json';

export type Locale = 'en' | 'id';

const translations = { en, id };

// This atom will persist the locale in localStorage
export const localeAtom = atomWithStorage<Locale>('locale', 'en', createJSONStorage(() => localStorage));


export const useLocalization = () => {
  const [locale, setLocale] = useAtom(localeAtom);
  
  const t = (key: string): string => {
    const keys = key.split('.');
    let result: any = translations[locale];
    for (const k of keys) {
      result = result?.[k];
      if (result === undefined) {
        // Fallback to English if translation is missing
        let fallbackResult: any = translations.en;
        for (const fk of keys) {
          fallbackResult = fallbackResult?.[fk];
        }
        // If fallback is also not found, return the key itself
        return fallbackResult || key;
      }
    }
    // Ensure the result is always a string
    return typeof result === 'string' ? result : key;
  };
  
  return { locale, setLocale, t };
};
