"use client";

import { useState, useMemo } from "react";
import type { Snippet } from "@/lib/prompt-composer/types";
import { extractPlaceholders, camelToLabel } from "@/lib/prompt-composer/utils";

interface PromptPreviewProps {
  snippets: Snippet[];
  placeholderValues: Record<string, string>;
}

export function PromptPreview({
  snippets,
  placeholderValues,
}: PromptPreviewProps) {
  const [copied, setCopied] = useState(false);

  const activeSnippets = snippets.filter((s) => s.active);

  const finalText = useMemo(() => {
    return activeSnippets
      .map((s) => {
        let text = s.text;
        extractPlaceholders(s.text).forEach((ph) => {
          const val = placeholderValues[ph];
          text = text.replaceAll(`{${ph}}`, val?.trim() || camelToLabel(ph));
        });
        return text;
      })
      .join("\n\n");
  }, [activeSnippets, placeholderValues]);

  const renderParts = useMemo(() => {
    return activeSnippets.map((s, idx) => {
      const parts: { type: "text" | "filled" | "unfilled"; value: string }[] = [];
      let remaining = s.text;
      const re = /\{([^}]+)\}/g;
      let match: RegExpExecArray | null;
      let lastIndex = 0;

      re.lastIndex = 0;
      while ((match = re.exec(remaining)) !== null) {
        if (match.index > lastIndex) {
          parts.push({ type: "text", value: remaining.slice(lastIndex, match.index) });
        }
        const ph = match[1];
        const val = placeholderValues[ph]?.trim();
        if (val) {
          parts.push({ type: "filled", value: val });
        } else {
          parts.push({ type: "unfilled", value: camelToLabel(ph) });
        }
        lastIndex = re.lastIndex;
      }
      if (lastIndex < remaining.length) {
        parts.push({ type: "text", value: remaining.slice(lastIndex) });
      }
      return { parts, isLast: idx === activeSnippets.length - 1 };
    });
  }, [activeSnippets, placeholderValues]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(finalText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "10px 14px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#fff",
          borderBottom: "1px solid #E2E8F0",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: 11.5,
            fontWeight: 700,
            color: "#334155",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          Composed Prompt
          <span
            style={{
              fontWeight: 400,
              color: "#94A3B8",
              marginLeft: 8,
              fontSize: 10.5,
              textTransform: "none",
            }}
          >
            {finalText.length} chars
          </span>
        </h2>
        <button
          onClick={handleCopy}
          style={{
            fontSize: 11,
            fontWeight: 600,
            padding: "4px 11px",
            borderRadius: 7,
            border: copied ? "1.5px solid #059669" : "1.5px solid #E2E8F0",
            background: copied ? "#ECFDF5" : "#fff",
            color: copied ? "#059669" : "#64748B",
            cursor: "pointer",
            fontFamily: "inherit",
            transition: "all 0.2s",
          }}
        >
          {copied ? "✓ Copied" : "📋 Copy"}
        </button>
      </div>
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: 16,
          background: "#0F172A",
        }}
      >
        {activeSnippets.length === 0 ? (
          <div
            style={{
              color: "#475569",
              fontSize: 12.5,
              textAlign: "center",
              marginTop: 40,
              lineHeight: 1.6,
            }}
          >
            Toggle on some snippets to see the composed prompt.
          </div>
        ) : (
          <pre
            style={{
              margin: 0,
              fontFamily:
                "var(--font-ibm-plex-mono), 'IBM Plex Mono', monospace",
              fontSize: 12.5,
              lineHeight: 1.7,
              color: "#E2E8F0",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {renderParts.map((block, bi) => (
              <span key={bi}>
                {block.parts.map((p, pi) => {
                  if (p.type === "filled") {
                    return (
                      <span
                        key={pi}
                        style={{
                          color: "#86EFAC",
                          fontWeight: 500,
                        }}
                      >
                        {p.value}
                      </span>
                    );
                  }
                  if (p.type === "unfilled") {
                    return (
                      <span
                        key={pi}
                        style={{
                          color: "#FCD34D",
                          fontWeight: 500,
                          fontStyle: "italic",
                        }}
                      >
                        {p.value}
                      </span>
                    );
                  }
                  return <span key={pi}>{p.value}</span>;
                })}
                {!block.isLast && "\n\n"}
              </span>
            ))}
          </pre>
        )}
      </div>
    </div>
  );
}
