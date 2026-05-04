import { Link, useRouterState } from "@tanstack/react-router";
import { PenLine, Link2, Settings, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

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
    <nav className="flex h-screen w-[220px] shrink-0 flex-col border-r border-sidebar-border bg-sidebar py-6">
      {/* Wordmark with gradient accent */}
      <Link to="/" className="mb-10 px-6 flex items-center gap-2">
        <div className="h-6 w-6 rounded-md bg-[image:var(--gradient-primary)]" />
        <span className="font-heading text-[15px] font-bold tracking-tight text-sidebar-foreground">
          Social AI
        </span>
      </Link>

      {/* Nav links */}
      <div className="flex flex-1 flex-col gap-0.5 px-3">
        {navItems.map((item) => {
          const isActive = currentPath === item.url;
          return (
            <Link
              key={item.url}
              to={item.url}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-all duration-150 ${
                isActive
                  ? "bg-sidebar-accent text-sidebar-foreground shadow-[var(--shadow-sm)]"
                  : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
              }`}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </div>

      {/* Bottom section */}
      <div className="mt-auto px-3">
        <div className="border-t border-sidebar-border pt-4">
          <div className="flex items-center gap-3 px-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[image:var(--gradient-accent)] text-xs font-semibold text-white">
              {initial}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-xs text-muted-foreground">
                {user?.email}
              </p>
            </div>
          </div>
          <button
            onClick={logout}
            className="mt-2 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[13px] text-muted-foreground transition-all duration-150 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign out</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
