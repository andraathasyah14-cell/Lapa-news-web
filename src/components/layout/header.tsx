
import { Logo } from "@/components/layout/logo";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm md:justify-end">
      <div className="flex items-center gap-4 md:hidden">
        <Logo />
      </div>
      <div className="flex items-center gap-2">
        <SidebarTrigger />
      </div>
    </header>
  );
}
