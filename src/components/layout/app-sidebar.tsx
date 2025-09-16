
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
import { FeatureLockDialog } from "./feature-lock-dialog";


export function AppSidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home", icon: Home, locked: false },
    { href: "/countries", label: "Countries", icon: Globe, locked: false },
    { href: "/submit-update", label: "Submit Update", icon: PlusSquare, locked: true },
    { href: "/register-country", label: "Register Country", icon: Library, locked: false },
    { href: "/magazine-cover", label: "Magazine Cover", icon: BookImage, locked: true },
    { href: "/info", label: "Important Info", icon: Info, locked: false },
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
                {link.locked ? (
                    <FeatureLockDialog>
                        <SidebarMenuButton
                            isActive={pathname === link.href && !link.locked}
                            className="justify-start w-full"
                        >
                            <link.icon />
                            <span>{link.label}</span>
                        </SidebarMenuButton>
                    </FeatureLockDialog>
                ) : (
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
                )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </>
  );
}
