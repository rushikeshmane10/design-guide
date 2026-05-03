import { type ReactNode } from "react";

interface TweetPreviewProps {
  text: string;
  actions?: ReactNode;
}

export function TweetPreview({ text, actions }: TweetPreviewProps) {
  const charCount = text.length;
  const isOver = charCount > 280;

  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground">
          Preview
        </span>
        <span
          className={`text-xs tabular-nums font-medium ${
            isOver ? "text-destructive" : "text-muted-foreground"
          }`}
        >
          {charCount}/280
        </span>
      </div>
      <div className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-card-foreground">
        {text || (
          <span className="text-muted-foreground/40">
            Your post will appear here…
          </span>
        )}
      </div>
      {actions && <div className="mt-4 border-t border-border pt-4">{actions}</div>}
    </div>
  );
}
