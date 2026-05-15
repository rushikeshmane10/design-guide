import { useState } from "react";
import { motion } from "framer-motion";

const TONE_OPTIONS = ["professional", "casual", "humorous", "inspirational", "controversial"] as const;
type Tone = typeof TONE_OPTIONS[number];

interface TopicFormProps {
  onGenerate: (topic: string, tones: Tone[], model: string) => void;
  generating: boolean;
  topic: string;
  setTopic: (t: string) => void;
  tones: Tone[];
  setTones: (t: Tone[]) => void;
}

const LLM_MODELS = [
  { value: "gpt-4o", label: "GPT-4o" },
  { value: "gpt-4o-mini", label: "GPT-4o Mini" },
  { value: "claude-3.5", label: "Claude 3.5 Sonnet" },
];

export function TopicForm({
  onGenerate,
  generating,
  topic,
  setTopic,
  tones,
  setTones,
}: TopicFormProps) {
  const [model, setModel] = useState(LLM_MODELS[0].value);

  const toggleTone = (tone: Tone) => {
    if (tones.includes(tone)) {
      setTones(tones.filter((t) => t !== tone));
    } else if (tones.length < 2) {
      setTones([...tones, tone]);
    }
  };

  const canGenerate = topic.trim() && tones.length > 0 && !generating;

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-card)] space-y-5">
      {/* Topic */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-foreground">
          What's happening?
        </label>
        <textarea
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Share what's on your mind — a thought, an update, an idea…"
          rows={3}
          className="w-full resize-none rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground shadow-[var(--shadow-sm)] placeholder:text-muted-foreground/40 transition-all duration-150 focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/15"
        />
      </div>

      {/* Tone pills */}
      <div>
        <label className="mb-2.5 block text-sm font-semibold text-foreground">
          Pick up to 2 tones
        </label>
        <div className="flex flex-wrap gap-2">
          {TONE_OPTIONS.map((tone) => {
            const selected = tones.includes(tone);
            return (
              <motion.button
                key={tone}
                onClick={() => toggleTone(tone)}
                whileTap={{ scale: 0.97 }}
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium capitalize transition-all duration-150 ${
                  selected
                    ? "bg-primary text-primary-foreground shadow-[var(--shadow-sm)]"
                    : "border border-border bg-background text-muted-foreground shadow-[var(--shadow-sm)] hover:border-foreground/15 hover:text-foreground"
                }`}
              >
                {tone}
                {selected && (
                  <span
                    className="ml-1.5 cursor-pointer opacity-70 hover:opacity-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      setTones(tones.filter((t) => t !== tone));
                    }}
                  >
                    ×
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Model + Generate */}
      <div className="flex items-end gap-3">
        <div className="flex-1">
          <label className="mb-2 block text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Model
          </label>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground shadow-[var(--shadow-sm)] transition-all duration-150 focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/15"
          >
            {LLM_MODELS.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={() => onGenerate(topic, tones, model)}
          disabled={!canGenerate}
          className="group relative flex h-10 items-center gap-2 overflow-hidden rounded-lg bg-[image:var(--gradient-primary)] px-6 text-sm font-semibold text-white shadow-[var(--shadow-card)] transition-all duration-300 hover:shadow-[var(--shadow-elevated)] hover:brightness-110 disabled:opacity-40 disabled:shadow-none"
          style={{ backgroundSize: "200% 200%", backgroundPosition: "0% 50%" }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundPosition = "100% 50%")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundPosition = "0% 50%")}
        >
          <span className="absolute inset-0 rounded-lg ring-1 ring-inset ring-white/20" />
          <span className="relative flex items-center gap-2">
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2z"/></svg>
            {generating ? "Generating…" : "Generate"}
          </span>
        </button>
      </div>
    </div>
  );
}

export type { Tone };
