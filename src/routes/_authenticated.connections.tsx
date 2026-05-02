import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ExternalLink, AtSign, Globe } from "lucide-react";

interface ConnectionCard {
  id: string;
  name: string;
  icon: typeof AtSign;
  connected: boolean;
  description: string;
}

export const Route = createFileRoute("/_authenticated/connections")({
  head: () => ({
    meta: [
      { title: "Connections — Social AI" },
      { name: "description", content: "Connect your social accounts to publish content." },
    ],
  }),
  component: ConnectionsPage,
});

function ConnectionsPage() {
  const navigate = useNavigate();
  const [connections, setConnections] = useState<ConnectionCard[]>([
    {
      id: "twitter",
      name: "Twitter / X",
      icon: AtSign,
      connected: false,
      description: "Connect your Twitter account to publish posts directly.",
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      icon: Globe,
      connected: false,
      description: "Connect your LinkedIn account to share professional content.",
    },
  ]);
  const [loading, setLoading] = useState<string | null>(null);

  const handleConnect = async (id: string) => {
    setLoading(id);
    await new Promise((r) => setTimeout(r, 1000));
    setConnections((prev) =>
      prev.map((c) => (c.id === id ? { ...c, connected: true } : c))
    );
    setLoading(null);
  };

  const handleVerify = async (id: string) => {
    setLoading(`verify-${id}`);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(null);
  };

  return (
    <>
      <PageHeader title="Social connections" />
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-2xl px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
              Connect your social accounts to publish content directly. We use OAuth
              to securely connect — we never store your password.
            </p>

            <div className="space-y-4">
              {connections.map((conn, i) => (
                <motion.div
                  key={conn.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.35 }}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                      <conn.icon className="h-5 w-5 text-accent-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-medium text-card-foreground">
                          {conn.name}
                        </h3>
                        {conn.connected && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                            <Check className="h-3 w-3" />
                            Connected
                          </span>
                        )}
                        {!conn.connected && (
                          <span className="text-xs text-muted-foreground">
                            Not connected
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {conn.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    <button
                      onClick={() => handleConnect(conn.id)}
                      disabled={conn.connected || loading === conn.id}
                      className="flex h-8 items-center gap-2 rounded-lg bg-primary px-4 text-xs font-medium text-primary-foreground transition-all duration-200 hover:bg-primary/90 disabled:opacity-40"
                    >
                      <ExternalLink className="h-3 w-3" />
                      {loading === conn.id
                        ? "Connecting…"
                        : `Connect ${conn.name.split(" ")[0]}`}
                    </button>
                    <button
                      onClick={() => handleVerify(conn.id)}
                      disabled={!conn.connected || loading === `verify-${conn.id}`}
                      className="flex h-8 items-center rounded-lg border border-border px-4 text-xs font-medium text-foreground transition-all duration-200 hover:bg-accent disabled:opacity-40"
                    >
                      {loading === `verify-${conn.id}` ? "Verifying…" : "Verify"}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            <button
              onClick={() => navigate({ to: "/" })}
              className="mt-8 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              ← Back to generator
            </button>
          </motion.div>
        </div>
      </div>
    </>
  );
}
