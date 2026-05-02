import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, CheckCircle, ExternalLink } from "lucide-react";

interface StatusBannerProps {
  type: "error" | "success" | "info";
  message: string;
  successUrl?: string;
  visible: boolean;
}

export function StatusBanner({
  type,
  message,
  successUrl,
  visible,
}: StatusBannerProps) {
  const styles = {
    error: "border-destructive/20 bg-destructive/5 text-destructive",
    success: "border-primary/20 bg-primary/5 text-primary",
    info: "border-border bg-accent text-accent-foreground",
  };

  const icons = {
    error: AlertCircle,
    success: CheckCircle,
    info: AlertCircle,
  };

  const Icon = icons[type];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className={`overflow-hidden rounded-lg border px-4 py-3 ${styles[type]}`}
        >
          <div className="flex items-center gap-2">
            <Icon className="h-4 w-4 shrink-0" />
            <p className="flex-1 text-sm">{message}</p>
            {successUrl && (
              <a
                href={successUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs font-medium underline"
              >
                Open tweet <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
