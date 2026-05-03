import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/use-auth";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useState } from "react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign In — Social AI" },
      { name: "description", content: "Sign in to your Social AI account." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { isAuthenticated, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/preferences" />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
    } catch {
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Theme toggle — top right */}
      <div className="fixed right-4 top-4 z-10">
        <ThemeToggle />
      </div>

      {/* Left panel — branding */}
      <div className="hidden w-[45%] items-center justify-center bg-surface lg:flex">
        <div className="max-w-sm px-12">
          <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
            Social AI
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Generate, refine, and publish content that connects — powered by AI that understands your voice.
          </p>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex flex-1 items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-full max-w-sm"
        >
          {/* Mobile wordmark */}
          <div className="mb-8 lg:hidden">
            <h1 className="font-heading text-xl font-semibold tracking-tight text-foreground">
              Social AI
            </h1>
          </div>

          <div className="mb-6">
            <h2 className="font-heading text-lg font-semibold text-foreground">
              Welcome back
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Sign in to your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground/50 transition-colors duration-150 focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring/20"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="password" className="text-sm font-medium text-foreground">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground/50 transition-colors duration-150 focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring/20"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex h-9 w-full items-center justify-center rounded-md bg-primary text-sm font-medium text-primary-foreground transition-all duration-150 hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <div className="mt-5 flex items-center justify-between text-sm">
            <button className="text-muted-foreground transition-colors hover:text-foreground">
              Create new account
            </button>
            <button className="text-muted-foreground transition-colors hover:text-foreground">
              Forgot password?
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
