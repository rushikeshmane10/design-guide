import { Link, useRouterState } from "@tanstack/react-router";
import { PenLine, Link2, Settings, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { ThemeToggle } from "@/components/ThemeToggle";

const navItems = [
  { title: "Post to X", url: "/", icon: PenLine },
  { title: "Connections", url: "/connections", icon: Link2 },
  { title: "Preferences", url: "/preferences", icon: Settings },
];

export function AppNavRail() {
  const { user, logout } = useAuth();
  const currentPath = useRouterState({
    select: (s) => s.location.pathname,
  });

  const initial = user?.name?.charAt(0).toUpperCase() || "U";

  return (
    <nav className="flex h-screen w-[220px] flex-col border-r border-sidebar-border bg-sidebar px-3 py-5">
      {/* Wordmark */}
      <Link to="/" className="mb-8 px-2">
        <span className="font-heading text-lg font-semibold tracking-tight text-sidebar-foreground">
          Social AI
        </span>
      </Link>

      {/* Nav links */}
      <div className="flex flex-1 flex-col gap-1">
        {navItems.map((item) => {
          const isActive = currentPath === item.url;
          return (
            <Link
              key={item.url}
              to={item.url}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150 ${
                isActive
                  ? "bg-sidebar-accent text-sidebar-foreground"
                  : "text-sidebar-foreground/60 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              }`}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </div>

      {/* Bottom section */}
      <div className="mt-auto space-y-3">
        <div className="flex items-center justify-between px-2">
          <ThemeToggle />
        </div>

        <div className="border-t border-sidebar-border pt-3">
          <div className="flex items-center gap-3 px-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sidebar-accent text-xs font-medium text-sidebar-foreground">
              {initial}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-xs text-sidebar-foreground/60">
                {user?.email}
              </p>
            </div>
          </div>
          <button
            onClick={logout}
            className="mt-2 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-sidebar-foreground/50 transition-colors duration-150 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign out</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
