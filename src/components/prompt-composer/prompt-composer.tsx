"use client";

import { useState, useMemo, useCallback, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import type {
  TemplateWithSnippets,
  PlaceholderValue,
  SnippetCategory,
} from "@/lib/prompt-composer/types";
import {
  createTemplate,
  updateTemplateName,
  deleteTemplate,
  createSnippet,
  updateSnippet,
  toggleSnippetActive,
  deleteSnippet,
  upsertPlaceholderValue,
} from "@/lib/prompt-composer/actions";
import { extractPlaceholders } from "@/lib/prompt-composer/utils";
import { ComposerHeader } from "./composer-header";
import { TipsPanel } from "./tips-panel";
import { TemplateBar } from "./template-bar";
import { SnippetList } from "./snippet-list";
import { PlaceholderPanel } from "./placeholder-panel";
import { PromptPreview } from "./prompt-preview";

interface PromptComposerProps {
  initialTemplates: TemplateWithSnippets[];
  initialPlaceholderValues: PlaceholderValue[];
  userId: string;
}

export function PromptComposer({
  initialTemplates,
  initialPlaceholderValues,
  userId,
}: PromptComposerProps) {
  const supabase = useMemo(() => createClient(), []);
  const [templates, setTemplates] = useState(initialTemplates);
  const [activeTemplateId, setActiveTemplateId] = useState(
    initialTemplates[0]?.id ?? ""
  );
  const [showTips, setShowTips] = useState(false);

  // Build a lookup map for placeholder values
  const [pvList, setPvList] = useState(initialPlaceholderValues);
  const pvMap = useMemo(() => {
    const map: Record<string, Record<string, string>> = {};
    pvList.forEach((pv) => {
      if (!map[pv.template_id]) map[pv.template_id] = {};
      map[pv.template_id][pv.key] = pv.value;
    });
    return map;
  }, [pvList]);

  const debounceTimers = useRef<Record<string, NodeJS.Timeout>>({});

  const activeTemplate = templates.find((t) => t.id === activeTemplateId);
  const snippets = activeTemplate?.snippets ?? [];
  const currentPvs = pvMap[activeTemplateId] ?? {};

  // All placeholders across active snippets of the current template
  const allPlaceholders = useMemo(
    () => {
      const phs: string[] = [];
      snippets
        .filter((s) => s.active)
        .forEach((s) => {
          extractPlaceholders(s.text).forEach((ph) => {
            if (!phs.includes(ph)) phs.push(ph);
          });
        });
      return phs;
    },
    [snippets]
  );

  const usedCategories: SnippetCategory[] = snippets.map((s) => s.category);

  // ── Template operations ───────────────────────────────────

  const handleAddTemplate = useCallback(async () => {
    const tpl = await createTemplate(
      supabase,
      userId,
      "New Template",
      templates.length
    );
    if (tpl) {
      const withSnippets: TemplateWithSnippets = { ...tpl, snippets: [] };
      setTemplates((prev) => [...prev, withSnippets]);
      setActiveTemplateId(tpl.id);
    }
  }, [supabase, userId, templates.length]);

  const handleDeleteTemplate = useCallback(
    async (id: string) => {
      if (templates.length <= 1) return;
      await deleteTemplate(supabase, id);
      setTemplates((prev) => {
        const next = prev.filter((t) => t.id !== id);
        if (activeTemplateId === id) {
          setActiveTemplateId(next[0]?.id ?? "");
        }
        return next;
      });
    },
    [supabase, templates.length, activeTemplateId]
  );

  const handleRenameTemplate = useCallback(
    async (id: string, name: string) => {
      await updateTemplateName(supabase, id, name);
      setTemplates((prev) =>
        prev.map((t) => (t.id === id ? { ...t, name } : t))
      );
    },
    [supabase]
  );

  // ── Snippet operations ────────────────────────────────────

  const handleAddSnippet = useCallback(async () => {
    if (!activeTemplateId) return;
    const snip = await createSnippet(
      supabase,
      activeTemplateId,
      "Theme",
      "New Snippet",
      "",
      snippets.length
    );
    if (snip) {
      setTemplates((prev) =>
        prev.map((t) =>
          t.id === activeTemplateId
            ? { ...t, snippets: [...t.snippets, snip] }
            : t
        )
      );
    }
  }, [supabase, activeTemplateId, snippets.length]);

  const handleSaveSnippet = useCallback(
    async (
      id: string,
      changes: { label: string; text: string; category: SnippetCategory }
    ) => {
      await updateSnippet(supabase, id, changes);
      setTemplates((prev) =>
        prev.map((t) => ({
          ...t,
          snippets: t.snippets.map((s) =>
            s.id === id ? { ...s, ...changes } : s
          ),
        }))
      );
    },
    [supabase]
  );

  const handleToggleSnippet = useCallback(
    async (id: string) => {
      const snippet = snippets.find((s) => s.id === id);
      if (!snippet) return;
      const newActive = !snippet.active;
      // Optimistic update
      setTemplates((prev) =>
        prev.map((t) => ({
          ...t,
          snippets: t.snippets.map((s) =>
            s.id === id ? { ...s, active: newActive } : s
          ),
        }))
      );
      await toggleSnippetActive(supabase, id, newActive);
    },
    [supabase, snippets]
  );

  const handleDeleteSnippet = useCallback(
    async (id: string) => {
      await deleteSnippet(supabase, id);
      setTemplates((prev) =>
        prev.map((t) => ({
          ...t,
          snippets: t.snippets.filter((s) => s.id !== id),
        }))
      );
    },
    [supabase]
  );

  // ── Placeholder operations ────────────────────────────────

  const handlePlaceholderChange = useCallback(
    (key: string, value: string) => {
      // Optimistic update
      setPvList((prev) => {
        const existing = prev.find(
          (pv) => pv.template_id === activeTemplateId && pv.key === key
        );
        if (existing) {
          return prev.map((pv) =>
            pv.template_id === activeTemplateId && pv.key === key
              ? { ...pv, value }
              : pv
          );
        }
        return [
          ...prev,
          {
            id: crypto.randomUUID(),
            template_id: activeTemplateId,
            user_id: userId,
            key,
            value,
          },
        ];
      });

      // Debounced save
      const timerKey = `${activeTemplateId}-${key}`;
      if (debounceTimers.current[timerKey]) {
        clearTimeout(debounceTimers.current[timerKey]);
      }
      debounceTimers.current[timerKey] = setTimeout(() => {
        upsertPlaceholderValue(supabase, activeTemplateId, userId, key, value);
      }, 300);
    },
    [supabase, activeTemplateId, userId]
  );

  // ── Render ────────────────────────────────────────────────

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <ComposerHeader showTips={showTips} onToggleTips={() => setShowTips(!showTips)} />
      <TipsPanel show={showTips} />
      <TemplateBar
        templates={templates}
        activeTemplateId={activeTemplateId}
        onSelect={setActiveTemplateId}
        onAdd={handleAddTemplate}
        onDelete={handleDeleteTemplate}
        onRename={handleRenameTemplate}
      />
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          minHeight: 0,
        }}
      >
        <SnippetList
          snippets={snippets}
          onSave={handleSaveSnippet}
          onDelete={handleDeleteSnippet}
          onToggle={handleToggleSnippet}
          onAdd={handleAddSnippet}
          usedCategories={usedCategories}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <PlaceholderPanel
            placeholders={allPlaceholders}
            values={currentPvs}
            onChange={handlePlaceholderChange}
          />
          <PromptPreview
            snippets={snippets}
            placeholderValues={currentPvs}
          />
        </div>
      </div>
    </div>
  );
}
