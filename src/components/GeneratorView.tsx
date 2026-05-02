import { AppNavRail } from "@/components/AppNavRail";
import { PageHeader } from "@/components/PageHeader";
import { TopicForm, type Tone } from "@/components/TopicForm";
import { VariationPickerModal, type Variation } from "@/components/VariationPickerModal";
import { SatisfactionPrompt } from "@/components/SatisfactionPrompt";
import { TweetPreview } from "@/components/TweetPreview";
import { StatusBanner } from "@/components/StatusBanner";
import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";

const MOCK_VARIATIONS: Variation[] = [
  {
    id: "1",
    text: "Just shipped a major update to our platform. The future of social content is AI-native — and it's here. What used to take hours now takes seconds.",
    tone: "professional",
    hashtags: ["AI", "ContentCreation", "ProductUpdate"],
  },
  {
    id: "2",
    text: "POV: You just told the AI to write your tweet and it came up with something better than you ever would have 😅 The machines are winning and honestly? I'm okay with it.",
    tone: "humorous",
    hashtags: ["AIWriting", "SocialMedia", "TechHumor"],
  },
];

export function GeneratorView() {
  const [topic, setTopic] = useState("");
  const [tones, setTones] = useState<Tone[]>([]);
  const [draft, setDraft] = useState("");
  const [generating, setGenerating] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [variations, setVariations] = useState<Variation[]>([]);
  const [showSatisfaction, setShowSatisfaction] = useState(false);
  const [posting, setPosting] = useState(false);
  const [selectedVariation, setSelectedVariation] = useState<Variation | null>(null);
  const [status, setStatus] = useState<{
    type: "error" | "success" | "info";
    message: string;
    successUrl?: string;
  } | null>(null);

  const handleGenerate = useCallback(
    async (_topic: string, _tones: Tone[], _model: string) => {
      setGenerating(true);
      setModalOpen(true);
      setModalLoading(true);
      setStatus(null);
      await new Promise((r) => setTimeout(r, 2000));
      setVariations(MOCK_VARIATIONS);
      setModalLoading(false);
      setGenerating(false);
    },
    []
  );

  const handlePick = (variation: Variation) => {
    setSelectedVariation(variation);
    setDraft(variation.text);
    setModalOpen(false);
    setShowSatisfaction(true);
  };

  const handleRegenerate = async (_variationId: string, _reworkPrompt: string) => {
    setModalLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setModalLoading(false);
  };

  const handlePost = async () => {
    setPosting(true);
    setStatus(null);
    await new Promise((r) => setTimeout(r, 1200));
    setStatus({
      type: "success",
      message: "Your post was published successfully!",
      successUrl: "https://x.com",
    });
    setPosting(false);
  };

  const handleReset = () => {
    setTopic("");
    setTones([]);
    setDraft("");
    setVariations([]);
    setSelectedVariation(null);
    setShowSatisfaction(false);
    setStatus(null);
    setModalOpen(false);
  };

  return (
    <div className="flex min-h-screen w-full">
      <AppNavRail />
      <main className="flex flex-1 flex-col overflow-hidden">
        <PageHeader title="Post to X">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs text-muted-foreground transition-colors duration-200 hover:bg-accent hover:text-foreground"
          >
            <RotateCcw className="h-3 w-3" />
            Reset
          </button>
        </PageHeader>

        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-2xl px-6 py-8">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="space-y-6"
            >
              {status && (
                <StatusBanner
                  type={status.type}
                  message={status.message}
                  successUrl={status.successUrl}
                  visible
                />
              )}

              <SatisfactionPrompt
                visible={showSatisfaction}
                onFeedback={(rating) => console.log("Satisfaction:", rating)}
                onDismiss={() => setShowSatisfaction(false)}
              />

              <TopicForm
                onGenerate={handleGenerate}
                generating={generating}
                topic={topic}
                setTopic={setTopic}
                tones={tones}
                setTones={setTones}
              />

              {draft && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    Your post
                  </label>
                  <textarea
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    placeholder="Write your post…"
                    rows={4}
                    disabled={posting}
                    className="w-full resize-none rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 transition-colors duration-200 focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring/30 disabled:opacity-50"
                  />
                </motion.div>
              )}

              {draft && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 }}
                >
                  <TweetPreview
                    text={draft}
                    actions={
                      <button
                        onClick={handlePost}
                        disabled={!selectedVariation || posting}
                        className="flex h-10 w-full items-center justify-center rounded-lg bg-primary text-sm font-medium text-primary-foreground transition-all duration-200 hover:bg-primary/90 disabled:opacity-40"
                      >
                        {posting ? "Posting…" : "Post to X →"}
                      </button>
                    }
                  />
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>

        <VariationPickerModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          variations={variations}
          loading={modalLoading}
          onPick={handlePick}
          onRegenerate={handleRegenerate}
        />
      </main>
    </div>
  );
}
