import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const preferenceQuestions = [
  {
    id: "profession",
    label: "What do you do?",
    helper: "Helps us tailor tone and terminology.",
    placeholder: "e.g. Software engineer, Marketing manager, Freelance writer…",
  },
  {
    id: "audience",
    label: "Who is your audience?",
    helper: "We'll shape content for the right people.",
    placeholder: "e.g. Tech founders, B2B marketers, Design community…",
  },
  {
    id: "vibe",
    label: "What's your vibe?",
    helper: "How should your posts feel?",
    placeholder: "e.g. Thoughtful and analytical, Casual and witty, Bold and opinionated…",
  },
];

export const Route = createFileRoute("/_authenticated/preferences")({
  head: () => ({
    meta: [
      { title: "Preferences — Social AI" },
      { name: "description", content: "Set your content preferences for AI-generated posts." },
    ],
  }),
  component: PreferencesPage,
});

function PreferencesPage() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("preferences");
    if (stored) {
      setValues(JSON.parse(stored));
      setSaved(true);
    }
  }, []);

  const allFilled = preferenceQuestions.every((q) => values[q.id]?.trim());

  const handleSave = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    localStorage.setItem("preferences", JSON.stringify(values));
    setSaved(true);
    setLoading(false);
  };

  return (
    <>
      <PageHeader title="Preferences" />
      <div className="flex-1 overflow-y-auto">
        <div className="px-8 py-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="mb-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Tell us a bit about yourself. Your answers help shape the tone, style,
              and relevance of every post we generate for you.
            </p>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {preferenceQuestions.map((q, i) => (
                <motion.div
                  key={q.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                  className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-sm)]"
                >
                  <label className="block text-sm font-medium text-card-foreground">
                    {q.label}
                  </label>
                  {q.helper && (
                    <p className="mt-1 text-xs text-muted-foreground">{q.helper}</p>
                  )}
                  <textarea
                    value={values[q.id] || ""}
                    onChange={(e) =>
                      setValues((v) => ({ ...v, [q.id]: e.target.value }))
                    }
                    placeholder={q.placeholder}
                    rows={2}
                    className="mt-3 w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/40 transition-colors duration-150 focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring/20"
                  />
                </motion.div>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={handleSave}
                disabled={!allFilled || loading}
                className="flex h-9 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-card)] transition-all duration-150 hover:shadow-[var(--shadow-elevated)] hover:brightness-110 disabled:opacity-40"
              >
                {saved && <Check className="h-4 w-4" />}
                {loading ? "Saving…" : saved ? "Saved" : "Save"}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
