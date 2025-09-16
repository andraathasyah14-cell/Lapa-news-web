
import type { Metadata } from 'next';
import { Provider as JotaiProvider } from 'jotai';
import {
  Sidebar,
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { Header } from '@/components/layout/header';
import { Toaster } from "@/components/ui/toaster"
import './globals.css';
import { getTranslations } from '@/lib/get-translations';
import { cookies } from 'next/headers';
import type { Locale } from '@/hooks/use-localization';

export const metadata: Metadata = {
  title: 'UNITED LAPA NATIONS',
  description: 'Craft and chronicle your own fictional nations.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = (cookies().get('locale')?.value ?? 'en') as Locale;

  return (
    <JotaiProvider>
      <html lang={locale} className="light">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
        </head>
        <body className="font-body antialiased">
          <div className="fixed inset-0 z-[-1] bg-background">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url("https://media-cgk2-2.cdn.whatsapp.net/v/t61.24694-24/510376232_1160472446130816_4641922013729007901_n.jpg?ccb=11-4&oh=01_Q5Aa2gE1QXkvwY-ToGr0ldgryRKK7yq2AjLdaGiy4nr3KUClgQ&oe=68D615BE&_nc_sid=5e03e0&_nc_cat=102")`,
                opacity: 0.1,
                filter: 'blur(3px)',
              }}
            />
          </div>
          <SidebarProvider>
            <Sidebar>
              <AppSidebar />
            </Sidebar>
            <SidebarInset>
              <Header />
              <div className="p-4 md:p-8">
                {children}
              </div>
            </SidebarInset>
          </SidebarProvider>
          <Toaster />
        </body>
      </html>
    </JotaiProvider>
  );
}
