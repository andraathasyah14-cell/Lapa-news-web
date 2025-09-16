
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
import { WhatsAppWarning } from '@/components/layout/whatsapp-warning';

export const metadata: Metadata = {
  title: 'UNITED LAPA NATIONS',
  description: 'Craft and chronicle your own fictional nations.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const backgroundSvg = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMTkuNSIgbnVtT2N0YXZlcz0iMTAiIHJlc3VsdD0idHVyYnVsZW5jZSIvPjxmZUNvbXBvc2l0ZSBvcGVyYXRvcj0iaW4iIGluPSJ0dXJidWxlbmNlIiBpbjI9IlNvdXJjZUFscGhhIiByZXN1bHQ9ImNvbXBvc2l0ZSIvPjxmZUNvbG9yTWF0cml4IGluPSJjb21wb3NpdGUiIHR5cGU9Imx1bWluYW5jZVRvQWxwaGEiLz48ZmVCbGVuZCBpbj0iU291cmNlR3JhcGhpYyIgaW4yPSJjb21wb3NpdGUiIG1vZGU9ImNvbG9yLWJ1cm4iLz48L2ZpbHRlcj48L2RlZnM+PGcgZmlsdGVyPSJ1cmwoJyNhJykiPjxwYXRoIGZpbGw9IiMyNmIiIGQ9Ik0wIDBoMTAwdjEwMEgweiIvPjxwYXRoIGQ9Ik0wIDB2MTAwaDEwMFYwWiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiM0OGYiIGZpbGw9IiMwMDAwIi8+PHBhdGggZmlsbD0iIzQ4ZjUiIGQ9Ik01MCAwaDF2MTAwaC0xeiIvPjxwYXRoIGZpbGw9IiM0OGY1IiBkPSJNMCA1MGgxMDB2MUgweiIvPjwvZz48L3N2Zz4=";


  return (
    <JotaiProvider>
      <html lang="en" className="light">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Roboto:wght@400;700&display=swap" rel="stylesheet" />
        </head>
        <body className="font-body antialiased">
          <div className="fixed inset-0 z-[-1]">
             <div className="absolute inset-0 bg-background" />
             <div 
                className="absolute inset-0" 
                style={{ 
                  backgroundImage: `url('${backgroundSvg}')`,
                  maskImage: 'linear-gradient(rgba(0,0,0,0.25), black)'
                }}
             />
          </div>
          <SidebarProvider>
            <Sidebar>
              <AppSidebar />
            </Sidebar>
            <SidebarInset>
              <Header />
              <div className="p-4 md:p-8 pb-24">
                {children}
              </div>
            </SidebarInset>
          </SidebarProvider>
          <Toaster />
          <WhatsAppWarning />
        </body>
      </html>
    </JotaiProvider>
  );
}
