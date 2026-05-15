import { Link, useRouterState } from "@tanstack/react-router";
import { PenLine, Link2, Settings, LogOut, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";

const navItems = [
  { title: "Post to X", url: "/", icon: PenLine },
  { title: "Connections", url: "/connections", icon: Link2 },
  { title: "Preferences", url: "/preferences", icon: Settings },
];

export function AppNavRail() {
  const { user, logout } = useAuth();
  const currentPath = useRouterState({ select: (s) => s.location.pathname });
  const initial = user?.name?.charAt(0).toUpperCase() || "U";

  return (
    <nav className="relative flex h-screen w-[240px] shrink-0 flex-col bg-sidebar py-5">
      {/* Right edge gradient border */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-sidebar-border to-transparent" />

      {/* Decorative gradient glow at top */}
      <div className="pointer-events-none absolute -top-16 -left-8 h-44 w-44 rounded-full bg-[image:var(--gradient-mesh)] opacity-[0.10] blur-3xl dark:opacity-[0.18]" />

      {/* Wordmark */}
      <Link to="/" className="relative mb-8 px-5 flex items-center gap-2.5">
        <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-[image:var(--gradient-primary)] shadow-[var(--shadow-card)]">
          <Sparkles className="h-4 w-4 text-white" strokeWidth={2.5} />
          <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-white/20" />
        </div>
        <div className="flex flex-col leading-none">
          <span className="font-heading text-[15px] font-bold tracking-tight text-sidebar-foreground">
            Social AI
          </span>
          <span className="mt-0.5 text-[10px] font-medium text-muted-foreground tracking-wide uppercase">
            Studio
          </span>
        </div>
      </Link>

      {/* Section label */}
      <div className="px-5 mb-2">
        <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground/70">
          Workspace
        </span>
      </div>

      {/* Nav links */}
      <div className="relative flex flex-1 flex-col gap-1 px-3">
        {navItems.map((item) => {
          const isActive = currentPath === item.url;
          return (
            <Link
              key={item.url}
              to={item.url}
              className="group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-colors duration-150"
            >
              {isActive && (
                <motion.div
                  layoutId="nav-active-pill"
                  className="absolute inset-0 rounded-lg bg-card shadow-[var(--shadow-card)] ring-1 ring-border"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              {isActive && (
                <motion.div
                  layoutId="nav-active-bar"
                  className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-[image:var(--gradient-primary)]"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <item.icon
                className={`relative h-4 w-4 shrink-0 transition-colors duration-150 ${
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground group-hover:text-foreground"
                }`}
              />
              <span
                className={`relative transition-colors duration-150 ${
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground group-hover:text-foreground"
                }`}
              >
                {item.title}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Upgrade card */}
      <div className="relative mx-3 mb-3 mt-4 overflow-hidden rounded-xl bg-[image:var(--gradient-mesh)] p-[1px] shadow-[var(--shadow-card)]">
        <div className="rounded-[11px] bg-card/95 p-3 backdrop-blur">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[image:var(--gradient-primary)]">
              <Sparkles className="h-3 w-3 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-[12px] font-semibold text-foreground">Go Pro</span>
          </div>
          <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">
            Unlock unlimited generations and premium models.
          </p>
          <button className="mt-2.5 w-full rounded-md bg-foreground py-1.5 text-[11px] font-semibold text-background transition-all duration-150 hover:opacity-90">
            Upgrade
          </button>
        </div>
      </div>

      {/* Account */}
      <div className="relative px-3">
        <div className="border-t border-sidebar-border pt-3">
          <div className="flex items-center gap-2.5 px-2">
            <div className="relative flex h-7 w-7 items-center justify-center rounded-full bg-[image:var(--gradient-accent)] text-[11px] font-semibold text-white shadow-[var(--shadow-sm)]">
              {initial}
              <div className="absolute -right-0 -bottom-0 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-sidebar" />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-[12px] font-medium text-foreground">
                {user?.name || "User"}
              </p>
              <p className="truncate text-[10px] text-muted-foreground">
                {user?.email}
              </p>
            </div>
          </div>
          <button
            onClick={logout}
            className="mt-2 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[12px] text-muted-foreground transition-colors duration-150 hover:bg-sidebar-accent hover:text-foreground"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Sign out</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
