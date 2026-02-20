"use client";

import type { Snippet, SnippetCategory } from "@/lib/prompt-composer/types";
import { SnippetCard } from "./snippet-card";

interface SnippetListProps {
  snippets: Snippet[];
  onSave: (id: string, changes: { label: string; text: string; category: SnippetCategory }) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  onAdd: () => void;
  usedCategories: SnippetCategory[];
}

export function SnippetList({
  snippets,
  onSave,
  onDelete,
  onToggle,
  onAdd,
  usedCategories,
}: SnippetListProps) {
  return (
    <div
      style={{
        padding: "14px 14px 100px",
        overflowY: "auto",
        maxHeight: "calc(100vh - 194px)",
        borderRight: "1px solid #E2E8F0",
        background: "#F8FAFC",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
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
          Snippets
        </h2>
        <button
          onClick={onAdd}
          style={{
            fontSize: 11,
            fontWeight: 600,
            padding: "4px 10px",
            borderRadius: 7,
            border: "1.5px dashed #6366F1",
            background: "#EEF2FF",
            color: "#4F46E5",
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          + Add Snippet
        </button>
      </div>

      {snippets.length === 0 && (
        <div
          style={{
            padding: 28,
            textAlign: "center",
            color: "#94A3B8",
            fontSize: 12.5,
            lineHeight: 1.6,
            border: "1.5px dashed #E2E8F0",
            borderRadius: 12,
          }}
        >
          No snippets yet.
          <br />
          Click <b>+ Add Snippet</b> to start building your prompt.
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {snippets.map((s) => (
          <SnippetCard
            key={s.id}
            snippet={s}
            onSave={onSave}
            onDelete={onDelete}
            onToggle={onToggle}
            usedCategories={usedCategories}
          />
        ))}
      </div>
    </div>
  );
}
