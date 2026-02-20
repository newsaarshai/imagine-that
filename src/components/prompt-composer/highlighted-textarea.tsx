"use client";

import { useRef, useMemo, CSSProperties } from "react";

interface HighlightedTextareaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
}

const SHARED_STYLE: CSSProperties = {
  fontFamily: "var(--font-ibm-plex-mono), 'IBM Plex Mono', monospace",
  fontSize: 13,
  lineHeight: 1.65,
  padding: "10px 12px",
  border: "none",
  margin: 0,
  width: "100%",
  boxSizing: "border-box" as const,
  wordWrap: "break-word" as const,
  whiteSpace: "pre-wrap" as const,
  overflowWrap: "break-word" as const,
  letterSpacing: "normal",
  wordSpacing: "normal",
  fontWeight: 400,
  fontStyle: "normal" as const,
};

export function HighlightedTextarea({
  value,
  onChange,
  rows = 4,
}: HighlightedTextareaProps) {
  const taRef = useRef<HTMLTextAreaElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  const syncScroll = () => {
    if (bgRef.current && taRef.current) {
      bgRef.current.scrollTop = taRef.current.scrollTop;
    }
  };

  const highlighted = useMemo(() => {
    const escaped = value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    return (
      escaped.replace(
        /\{([^}]+)\}/g,
        `<span style="color:#D4A017;opacity:0.4">{</span><span style="background:#FDE68A;color:#92400E;border-radius:2px;">$1</span><span style="color:#D4A017;opacity:0.4">}</span>`
      ) + "\n"
    );
  }, [value]);

  return (
    <div
      style={{
        position: "relative",
        borderRadius: 8,
        border: "1px solid #E2E8F0",
        overflow: "hidden",
      }}
    >
      <div
        ref={bgRef}
        style={{
          ...SHARED_STYLE,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "#F8FAFC",
          color: "#334155",
          pointerEvents: "none",
          overflow: "hidden",
        }}
        dangerouslySetInnerHTML={{ __html: highlighted }}
      />
      <textarea
        ref={taRef}
        value={value}
        onChange={onChange}
        onScroll={syncScroll}
        rows={rows}
        style={{
          ...SHARED_STYLE,
          position: "relative",
          background: "transparent",
          color: "transparent",
          caretColor: "#334155",
          outline: "none",
          resize: "vertical",
          zIndex: 1,
          WebkitTextFillColor: "transparent",
        }}
      />
    </div>
  );
}
