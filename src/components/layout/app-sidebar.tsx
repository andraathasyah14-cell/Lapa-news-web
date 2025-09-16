
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";


const FeatureLockDialog = ({ children }: { children: React.ReactNode }) => (
    <AlertDialog>
        <AlertDialogTrigger asChild>
            {children}
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Feature Under Development</AlertDialogTitle>
                <AlertDialogDescription>
                    This feature is still being finalized. For now, all updates and special requests must be submitted via WhatsApp to the admins (Tamim or Andra).
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogAction>Got it!</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
);


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
