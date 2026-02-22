"use client";

import { useState, useMemo, useCallback, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import type {
  TemplateWithSnippets,
  PlaceholderValue,
  TemplateType,
  Snippet,
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
  createTemplateType,
  updateTemplateTypeId,
  countTemplatesOfType,
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
  initialTemplateTypes: TemplateType[];
  userId: string;
}

export function PromptComposer({
  initialTemplates,
  initialPlaceholderValues,
  initialTemplateTypes,
  userId,
}: PromptComposerProps) {
  const supabase = useMemo(() => createClient(), []);
  const [templates, setTemplates] = useState(initialTemplates);
  const [templateTypes, setTemplateTypes] = useState(initialTemplateTypes);
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

  // Find the type for the active template
  const activeType = activeTemplate?.type_id
    ? templateTypes.find((tt) => tt.id === activeTemplate.type_id) ?? null
    : null;

  // Get master template's snippets (for pre-fill in typed templates)
  const masterSnippets: Snippet[] = useMemo(() => {
    if (!activeType) return [];
    const masterTemplate = templates.find(
      (t) => t.id === activeType.master_template_id
    );
    return masterTemplate?.snippets ?? [];
  }, [activeType, templates]);

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

      // Check if this is a master template
      const typeForTemplate = templateTypes.find(
        (tt) => tt.master_template_id === id
      );

      if (typeForTemplate) {
        // Count how many other templates use this type
        const count = await countTemplatesOfType(
          supabase,
          typeForTemplate.id,
          id
        );
        const msg =
          count > 0
            ? `This is the master template for "${typeForTemplate.name}". ${count} other template(s) use this type. Deleting it will make them untyped (Blank). Continue?`
            : `This is the master template for "${typeForTemplate.name}". No other templates use this type. Delete it?`;

        if (!confirm(msg)) return;

        // Delete the type (cascade: templates.type_id → SET NULL)
        // The template_types row is deleted when the master template is deleted
        // because of ON DELETE CASCADE on master_template_id FK
      } else {
        if (!confirm("Delete this template?")) return;
      }

      await deleteTemplate(supabase, id);

      // Remove the template from state
      setTemplates((prev) => {
        const next = prev.filter((t) => t.id !== id);
        if (activeTemplateId === id) {
          setActiveTemplateId(next[0]?.id ?? "");
        }
        return next;
      });

      // If it was a master template, remove the type and null out type_id on all affected templates
      if (typeForTemplate) {
        setTemplateTypes((prev) =>
          prev.filter((tt) => tt.id !== typeForTemplate.id)
        );
        setTemplates((prev) =>
          prev.map((t) =>
            t.type_id === typeForTemplate.id
              ? { ...t, type_id: null }
              : t
          )
        );
      }
    },
    [supabase, templates.length, activeTemplateId, templateTypes]
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

  // ── Template type operations ────────────────────────────────

  const handleChangeTemplateType = useCallback(
    async (templateId: string, typeId: string | null) => {
      await updateTemplateTypeId(supabase, templateId, typeId);
      setTemplates((prev) =>
        prev.map((t) =>
          t.id === templateId ? { ...t, type_id: typeId } : t
        )
      );
    },
    [supabase]
  );

  const handleCreateType = useCallback(
    async (name: string, masterTemplateId: string) => {
      const newType = await createTemplateType(
        supabase,
        userId,
        name,
        masterTemplateId
      );
      if (newType) {
        setTemplateTypes((prev) => [...prev, newType]);
        // Link the master template to this type
        await updateTemplateTypeId(supabase, masterTemplateId, newType.id);
        setTemplates((prev) =>
          prev.map((t) =>
            t.id === masterTemplateId
              ? { ...t, type_id: newType.id }
              : t
          )
        );
      }
    },
    [supabase, userId]
  );

  // ── Snippet operations ────────────────────────────────────

  const handleAddSnippet = useCallback(async () => {
    if (!activeTemplateId) return;
    const snip = await createSnippet(
      supabase,
      activeTemplateId,
      "Blank",
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
        templateTypes={templateTypes}
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
          templateName={activeTemplate?.name ?? ""}
          templateTypes={templateTypes}
          activeType={activeType}
          masterSnippets={masterSnippets}
          onSave={handleSaveSnippet}
          onDelete={handleDeleteSnippet}
          onToggle={handleToggleSnippet}
          onAdd={handleAddSnippet}
          onRenameTemplate={(name) => {
            if (activeTemplateId) handleRenameTemplate(activeTemplateId, name);
          }}
          onChangeType={(typeId) => {
            if (activeTemplateId) handleChangeTemplateType(activeTemplateId, typeId);
          }}
          onCreateType={(name) => {
            if (activeTemplateId) handleCreateType(name, activeTemplateId);
          }}
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
