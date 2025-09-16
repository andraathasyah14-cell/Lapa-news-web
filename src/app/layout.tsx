import type { Metadata } from 'next';
import {
  Sidebar,
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { Header } from '@/components/layout/header';
import { Toaster } from "@/components/ui/toaster"
import './globals.css';

export const metadata: Metadata = {
  title: 'UNITED LAPA NATIONS',
  description: 'Craft and chronicle your own fictional nations.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <div className="fixed inset-0 z-[-1] bg-background">
           <div
            className="absolute inset-0 bg-repeat"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 100' width='600' height='100'%3e%3cstyle%3e.logo-text %7b font-family: 'Playfair Display', serif; font-size: 32px; font-weight: bold; letter-spacing: 0.1em; fill: hsl(195, 100%25, 90%25); %7d%3c/style%3e%3ctext class='logo-text' x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle'%3eUNITED LAPA NATIONS%3c/text%3e%3c/svg%3e")`,
              backgroundSize: '800px auto',
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
  );
}
