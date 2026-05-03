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
        <div className="px-8 py-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="mb-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Connect your social accounts to publish content directly. We use OAuth
              to securely connect — we never store your password.
            </p>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {connections.map((conn, i) => (
                <motion.div
                  key={conn.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                  className="group rounded-lg border border-border bg-card p-5 transition-colors duration-150 hover:border-foreground/12"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-surface">
                      <conn.icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-medium text-card-foreground">
                          {conn.name}
                        </h3>
                        {conn.connected && (
                          <span className="inline-flex items-center gap-1 rounded-md bg-surface px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                            <Check className="h-3 w-3" />
                            Connected
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {conn.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <button
                      onClick={() => handleConnect(conn.id)}
                      disabled={conn.connected || loading === conn.id}
                      className="flex h-8 items-center gap-1.5 rounded-md bg-primary px-3.5 text-xs font-medium text-primary-foreground transition-all duration-150 hover:opacity-90 disabled:opacity-40"
                    >
                      <ExternalLink className="h-3 w-3" />
                      {loading === conn.id
                        ? "Connecting…"
                        : `Connect`}
                    </button>
                    <button
                      onClick={() => handleVerify(conn.id)}
                      disabled={!conn.connected || loading === `verify-${conn.id}`}
                      className="flex h-8 items-center rounded-md border border-border px-3.5 text-xs font-medium text-foreground transition-all duration-150 hover:bg-accent disabled:opacity-40"
                    >
                      {loading === `verify-${conn.id}` ? "Verifying…" : "Verify"}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
