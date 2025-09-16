
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

  const logoSvg = `
    <svg width="600" height="100" viewBox="0 0 600 100" xmlns="http://www.w3.org/2000/svg">
      <style>
        .logo-text {
          font-family: 'Playfair Display', serif;
          font-size: 32px;
          font-weight: bold;
          fill: hsl(195, 100%, 80%);
          letter-spacing: 0.1em;
          text-anchor: middle;
          dominant-baseline: middle;
        }
      </style>
      <text x="50%" y="50%" class="logo-text">
        UNITED LAPA NATIONS
      </text>
    </svg>
  `;

  const svgDataUri = `data:image/svg+xml;base64,${Buffer.from(logoSvg).toString('base64')}`;

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
                backgroundImage: `url("${svgDataUri}")`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
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
