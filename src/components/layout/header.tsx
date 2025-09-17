
"use client";

import { Logo } from "@/components/layout/logo";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import Link from "next/link";
import { LogIn } from "lucide-react";
import { UserNav } from "./user-nav";

export function Header() {
  const { user, loading } = useAuth();

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm md:justify-end">
      <div className="flex items-center gap-4 md:hidden">
        <SidebarTrigger />
        <Logo />
      </div>
      <div className="flex items-center gap-2">
        {loading ? null : user ? (
          <UserNav user={user} />
        ) : (
          <Button asChild variant="ghost">
            <Link href="/login">
              <LogIn />
              Login
            </Link>
          </Button>
        )}
        <div className="hidden md:block">
            <SidebarTrigger />
        </div>
      </div>
    </header>
  );
}
