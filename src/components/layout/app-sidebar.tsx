
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
import Link from "next/link";

export function AppSidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home", icon: Home },
    { href: "/countries", label: "Countries", icon: Globe },
    { href: "/register-country", label: "Register Country", icon: Library },
    { href: "/updates/submit", label: "Submit Update", icon: PlusSquare },
    { href: "/magazine-cover", label: "Magazine Cover", icon: BookImage },
    { href: "/info", label: "Important Info", icon: Info },
  ];

  return (
    <>
      <SidebarHeader>
        <Logo className="text-sidebar-foreground" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {links.map((link) => (
            <SidebarMenuItem key={link.label}>
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
