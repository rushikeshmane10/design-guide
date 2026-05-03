import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SatisfactionPromptProps {
  visible: boolean;
  onFeedback: (rating: string) => void;
  onDismiss: () => void;
}

const OPTIONS = [
  { label: "Yes", value: "yes" },
  { label: "Almost", value: "almost" },
  { label: "Not really", value: "not_really" },
];

export function SatisfactionPrompt({
  visible,
  onFeedback,
  onDismiss,
}: SatisfactionPromptProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleClick = (value: string) => {
    setSelected(value);
    onFeedback(value);
    setTimeout(onDismiss, 600);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="rounded-lg border border-border bg-card p-4"
        >
          <p className="text-sm font-medium text-card-foreground">
            How close was this to what you wanted?
          </p>
          <div className="mt-3 flex items-center gap-2">
            {OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleClick(opt.value)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all duration-150 ${
                  selected === opt.value
                    ? "bg-foreground text-background"
                    : "border border-border text-muted-foreground hover:border-foreground/20 hover:text-foreground"
                }`}
              >
                {opt.label}
              </button>
            ))}
            <button
              onClick={onDismiss}
              className="ml-auto text-xs text-muted-foreground/60 transition-colors hover:text-muted-foreground"
            >
              skip
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
