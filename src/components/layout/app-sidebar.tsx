
"use client";

import { usePathname } from "next/navigation";
import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  Home,
  Globe,
  PlusSquare,
  Library,
  BookImage,
  Info,
  LogIn,
  LogOut,
  User,
  ShieldQuestion,
} from "lucide-react";
import { Logo } from "@/components/layout/logo";
import Link from "next/link";
import { FeatureLockDialog } from "./feature-lock-dialog";
import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

const ProtectedSidebarButton = ({ href, icon: Icon, label }: { href: string, icon: React.ElementType, label: string }) => {
    const { user, loading } = useAuth();
    const pathname = usePathname();

    if (loading) {
        return (
            <SidebarMenuButton disabled className="justify-start">
                <Icon />
                <span>{label}</span>
            </SidebarMenuButton>
        );
    }

    if (!user) {
        return (
            <FeatureLockDialog>
                <SidebarMenuButton
                    isActive={pathname === href}
                    className="justify-start w-full"
                >
                    <Icon />
                    <span>{label}</span>
                </SidebarMenuButton>
            </FeatureLockDialog>
        );
    }
    
    return (
        <SidebarMenuButton
            asChild
            isActive={pathname === href}
            className="justify-start"
        >
            <Link href={href}>
                <Icon />
                <span>{label}</span>
            </Link>
        </SidebarMenuButton>
    );
};


export function AppSidebar() {
  const pathname = usePathname();
  const { user, loading, logout } = useAuth();

  const links = [
    { href: "/", label: "Home", icon: Home },
    { href: "/countries", label: "Countries", icon: Globe },
    { href: "/info", label: "Important Info", icon: Info },
  ];
  
  const protectedLinks = [
    { href: "/submit-update", label: "Submit Update", icon: PlusSquare },
    { href: "/register-country", label: "Register Country", icon: Library },
  ];

  const futureLinks = [
    { href: "/magazine-cover", label: "Magazine Cover", icon: BookImage, locked: true },
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
          {protectedLinks.map((link) => (
              <SidebarMenuItem key={link.label}>
                  <ProtectedSidebarButton href={link.href} icon={link.icon} label={link.label} />
              </SidebarMenuItem>
          ))}
          {futureLinks.map((link) => (
             <SidebarMenuItem key={link.label}>
                 <FeatureLockDialog>
                    <SidebarMenuButton
                        isActive={pathname === link.href}
                        className="justify-start w-full"
                    >
                        <link.icon />
                        <span>{link.label}</span>
                    </SidebarMenuButton>
                 </FeatureLockDialog>
             </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
       <SidebarFooter>
        <SidebarSeparator />
         {loading ? (
            <div className="flex items-center gap-3 p-2">
                <Skeleton className="h-9 w-9 rounded-full" />
                <div className="flex flex-col gap-1 w-full">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                </div>
            </div>
        ) : user ? (
          <div className="flex flex-col gap-2 p-2">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src={user.photoURL ?? undefined} alt={user.displayName ?? 'User'} />
                <AvatarFallback><User /></AvatarFallback>
              </Avatar>
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-semibold truncate">{user.displayName}</span>
                <span className="text-xs text-sidebar-foreground/70 truncate">{user.email}</span>
              </div>
            </div>
             <Button variant="ghost" size="sm" onClick={logout} className="justify-start gap-2">
                <LogOut />
                <span>Logout</span>
             </Button>
          </div>
        ) : (
            <SidebarMenu className="p-2">
                <SidebarMenuItem>
                    <SidebarMenuButton asChild className="justify-start">
                        <Link href="/login">
                            <LogIn />
                            <span>Login</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        )}
      </SidebarFooter>
    </>
  );
}
