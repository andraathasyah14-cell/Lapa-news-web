import { cn } from "@/lib/utils";
import { CheckCircle } from "lucide-react";

export function List({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <ul className={cn("space-y-3", className)}>
      {children}
    </ul>
  );
}

export function ListItem({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <li className={cn("flex items-start", className)}>
      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
      <span className="flex-1 text-card-foreground/90">{children}</span>
    </li>
  );
}
