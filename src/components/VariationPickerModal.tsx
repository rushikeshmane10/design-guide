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
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            onClick={(e) => e.stopPropagation()}
            className="relative mx-4 max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-border bg-card p-6"
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-lg p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>

            <h2 className="font-heading text-lg font-semibold text-card-foreground">
              Choose a variation
            </h2>
            {model && (
              <p className="mt-1 text-xs text-muted-foreground">
                Generated with {model}
              </p>
            )}

            {/* Loading skeletons */}
            {loading && (
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[0, 1].map((i) => (
                  <div
                    key={i}
                    className="animate-pulse rounded-xl border border-border bg-accent/30 p-5"
                  >
                    <div className="mb-3 h-3 w-16 rounded bg-muted" />
                    <div className="space-y-2">
                      <div className="h-3 w-full rounded bg-muted" />
                      <div className="h-3 w-4/5 rounded bg-muted" />
                      <div className="h-3 w-3/5 rounded bg-muted" />
                    </div>
                    <div className="mt-4 h-8 rounded-lg bg-muted" />
                  </div>
                ))}
              </div>
            )}

            {/* Variation cards */}
            {!loading && variations.length > 0 && (
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {variations.map((v) => (
                  <div
                    key={v.id}
                    className="rounded-xl border border-border bg-background p-5 transition-all duration-200 hover:border-foreground/15"
                  >
                    <span className="mb-3 inline-block rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium capitalize text-accent-foreground">
                      {v.tone}
                    </span>
                    <p className="text-sm leading-relaxed text-foreground">
                      {v.text}
                    </p>
                    {v.hashtags.length > 0 && (
                      <p className="mt-2 text-xs text-primary">
                        {v.hashtags.map((h) => `#${h}`).join(" ")}
                      </p>
                    )}

                    <div className="mt-4 flex items-center gap-2">
                      <button
                        onClick={() => onPick(v)}
                        className="flex h-8 flex-1 items-center justify-center rounded-lg bg-primary text-xs font-medium text-primary-foreground transition-all duration-200 hover:bg-primary/90"
                      >
                        Use this variant
                      </button>
                      <button
                        onClick={() =>
                          setReworkId(reworkId === v.id ? null : v.id)
                        }
                        className="flex h-8 items-center gap-1.5 rounded-lg border border-border px-3 text-xs text-muted-foreground transition-all duration-200 hover:bg-accent hover:text-foreground"
                      >
                        <RefreshCw className="h-3 w-3" />
                        Rework
                      </button>
                    </div>

                    {/* Rework input */}
                    <AnimatePresence>
                      {reworkId === v.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-3 space-y-2">
                            <textarea
                              value={reworkText}
                              onChange={(e) => setReworkText(e.target.value)}
                              placeholder="How should we adjust this?"
                              rows={2}
                              className="w-full resize-none rounded-lg border border-input bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/40 focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring/30"
                            />
                            <p className="text-xs text-muted-foreground/60">
                              Keep it under 200 characters for best results
                            </p>
                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  setReworkId(null);
                                  setReworkText("");
                                }}
                                className="h-7 rounded-lg border border-border px-3 text-xs text-muted-foreground hover:bg-accent"
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
                                className="h-7 rounded-lg bg-primary px-3 text-xs font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-40"
                              >
                                Regenerate with AI
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
