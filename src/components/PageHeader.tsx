import { type ReactNode } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

interface PageHeaderProps {
  title: string;
  children?: ReactNode;
}

export function PageHeader({ title, children }: PageHeaderProps) {
  return (
    <header className="flex h-14 items-center justify-between border-b border-border px-6">
      <h1 className="font-heading text-lg font-semibold tracking-tight">
        {title}
      </h1>
      <div className="flex items-center gap-3">
        {children}
        <ThemeToggle />
      </div>
    </header>
  );
}
