"use client";

import { usePathname } from "next/navigation";
import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  Home,
  Globe,
  PlusSquare,
  Library,
  BookImage,
  Info,
} from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { useLocalization } from "@/hooks/use-localization";

export function AppSidebar() {
  const pathname = usePathname();
  const { t } = useLocalization();

  const links = [
    { href: "/", label: t('sidebar.home'), icon: Home },
    { href: "/countries", label: t('sidebar.countries'), icon: Globe },
    { href: "/submit-update", label: t('sidebar.submitUpdate'), icon: PlusSquare },
    { href: "/register-country", label: t('sidebar.registerCountry'), icon: Library },
    { href: "/magazine-cover", label: t('sidebar.magazineCover'), icon: BookImage },
    { href: "/info", label: t('sidebar.info'), icon: Info },
  ];

  return (
    <>
      <SidebarHeader>
        <Logo className="text-sidebar-foreground" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {links.map((link) => (
            <SidebarMenuItem key={link.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === link.href}
                className="justify-start"
              >
                <a href={link.href}>
                  <link.icon />
                  <span>{link.label}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </>
  );
}
