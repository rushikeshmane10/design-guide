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
    <div className="rounded-lg border border-border bg-card p-6 space-y-5">
      {/* Topic */}
      <div>
        <label className="mb-2 block text-sm font-medium text-foreground">
          What's happening?
        </label>
        <textarea
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Share what's on your mind — a thought, an update, an idea…"
          rows={3}
          className="w-full resize-none rounded-md border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 transition-colors duration-150 focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring/20"
        />
      </div>

      {/* Tone pills */}
      <div>
        <label className="mb-2 block text-sm font-medium text-foreground">
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
                className={`rounded-md px-3 py-1.5 text-xs font-medium capitalize transition-all duration-150 ${
                  selected
                    ? "bg-foreground text-background"
                    : "border border-border text-muted-foreground hover:border-foreground/20 hover:text-foreground"
                }`}
              >
                {tone}
                {selected && (
                  <span
                    className="ml-1.5 cursor-pointer"
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
          <label className="mb-2 block text-xs font-medium text-muted-foreground">
            Model
          </label>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground transition-colors duration-150 focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring/20"
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
          className="flex h-9 items-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-all duration-150 hover:opacity-90 disabled:opacity-40"
        >
          {generating ? "Generating…" : "Generate"}
        </button>
      </div>
    </div>
  );
}

export type { Tone };
