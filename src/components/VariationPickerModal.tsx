import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, RefreshCw } from "lucide-react";

interface Variation {
  id: string;
  text: string;
  tone: string;
  hashtags: string[];
  imageUrl?: string;
}

interface VariationPickerModalProps {
  open: boolean;
  onClose: () => void;
  variations: Variation[];
  loading: boolean;
  model?: string;
  onPick: (variation: Variation) => void;
  onRegenerate: (variationId: string, reworkPrompt: string) => void;
}

export function VariationPickerModal({
  open,
  onClose,
  variations,
  loading,
  model,
  onPick,
  onRegenerate,
}: VariationPickerModalProps) {
  const [reworkId, setReworkId] = useState<string | null>(null);
  const [reworkText, setReworkText] = useState("");

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 6 }}
            transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            onClick={(e) => e.stopPropagation()}
            className="relative mx-4 max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-lg border border-border bg-card p-6"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-md p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>

            <h2 className="font-heading text-[15px] font-semibold text-card-foreground">
              Choose a variation
            </h2>
            {model && (
              <p className="mt-1 text-xs text-muted-foreground">
                Generated with {model}
              </p>
            )}

            {loading && (
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[0, 1].map((i) => (
                  <div
                    key={i}
                    className="animate-pulse rounded-lg border border-border bg-surface p-5"
                  >
                    <div className="mb-3 h-3 w-16 rounded bg-accent" />
                    <div className="space-y-2">
                      <div className="h-3 w-full rounded bg-accent" />
                      <div className="h-3 w-4/5 rounded bg-accent" />
                      <div className="h-3 w-3/5 rounded bg-accent" />
                    </div>
                    <div className="mt-4 h-8 rounded-md bg-accent" />
                  </div>
                ))}
              </div>
            )}

            {!loading && variations.length > 0 && (
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {variations.map((v) => (
                  <div
                    key={v.id}
                    className="rounded-lg border border-border bg-background p-5 transition-colors duration-150 hover:border-foreground/12"
                  >
                    <span className="mb-3 inline-block rounded-md bg-surface px-2 py-0.5 text-[11px] font-medium capitalize text-muted-foreground">
                      {v.tone}
                    </span>
                    <p className="text-sm leading-relaxed text-foreground">
                      {v.text}
                    </p>
                    {v.hashtags.length > 0 && (
                      <p className="mt-2 text-xs text-muted-foreground">
                        {v.hashtags.map((h) => `#${h}`).join(" ")}
                      </p>
                    )}

                    <div className="mt-4 flex items-center gap-2">
                      <button
                        onClick={() => onPick(v)}
                        className="flex h-8 flex-1 items-center justify-center rounded-md bg-primary text-xs font-medium text-primary-foreground transition-all duration-150 hover:opacity-90"
                      >
                        Use this variant
                      </button>
                      <button
                        onClick={() =>
                          setReworkId(reworkId === v.id ? null : v.id)
                        }
                        className="flex h-8 items-center gap-1.5 rounded-md border border-border px-3 text-xs text-muted-foreground transition-all duration-150 hover:bg-accent hover:text-foreground"
                      >
                        <RefreshCw className="h-3 w-3" />
                        Rework
                      </button>
                    </div>

                    <AnimatePresence>
                      {reworkId === v.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.15 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-3 space-y-2">
                            <textarea
                              value={reworkText}
                              onChange={(e) => setReworkText(e.target.value)}
                              placeholder="How should we adjust this?"
                              rows={2}
                              className="w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/40 focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring/20"
                            />
                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  setReworkId(null);
                                  setReworkText("");
                                }}
                                className="h-7 rounded-md border border-border px-3 text-xs text-muted-foreground hover:bg-accent"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => {
                                  onRegenerate(v.id, reworkText);
                                  setReworkId(null);
                                  setReworkText("");
                                }}
                                disabled={!reworkText.trim()}
                                className="h-7 rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground hover:opacity-90 disabled:opacity-40"
                              >
                                Regenerate
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export type { Variation };
