import type { SupabaseClient } from "@supabase/supabase-js";
import type {
  Template,
  Snippet,
  PlaceholderValue,
  TemplateWithSnippets,
  SnippetCategory,
} from "./types";
import { DEFAULT_TEMPLATES } from "./constants";

// ── Load all user data ──────────────────────────────────────────

export async function loadUserData(
  supabase: SupabaseClient,
  userId: string
): Promise<{
  templates: TemplateWithSnippets[];
  placeholderValues: PlaceholderValue[];
}> {
  const [templatesRes, snippetsRes, pvRes] = await Promise.all([
    supabase
      .from("templates")
      .select("*")
      .eq("user_id", userId)
      .order("sort_order"),
    supabase
      .from("snippets")
      .select("*, templates!inner(user_id)")
      .eq("templates.user_id", userId)
      .order("sort_order"),
    supabase
      .from("placeholder_values")
      .select("*")
      .eq("user_id", userId),
  ]);

  const templates: Template[] = templatesRes.data ?? [];
  const snippets: Snippet[] = (snippetsRes.data ?? []).map(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ({ templates: _t, ...rest }) => rest as Snippet
  );
  const placeholderValues: PlaceholderValue[] = pvRes.data ?? [];

  const templatesWithSnippets: TemplateWithSnippets[] = templates.map((t) => ({
    ...t,
    snippets: snippets.filter((s) => s.template_id === t.id),
  }));

  return { templates: templatesWithSnippets, placeholderValues };
}

// ── Seed default templates for new users ────────────────────────

export async function seedDefaultTemplates(
  supabase: SupabaseClient,
  userId: string
): Promise<TemplateWithSnippets[]> {
  const result: TemplateWithSnippets[] = [];

  for (let i = 0; i < DEFAULT_TEMPLATES.length; i++) {
    const dt = DEFAULT_TEMPLATES[i];
    const { data: tpl, error: tplErr } = await supabase
      .from("templates")
      .insert({ user_id: userId, name: dt.name, sort_order: i })
      .select()
      .single();

    if (tplErr || !tpl) continue;

    let snippets: Snippet[] = [];
    if (dt.snippets.length > 0) {
      const rows = dt.snippets.map((s) => ({
        template_id: tpl.id,
        category: s.category,
        label: s.label,
        text: s.text,
        active: s.active,
        sort_order: s.sort_order,
      }));
      const { data: snips } = await supabase
        .from("snippets")
        .insert(rows)
        .select();
      snippets = (snips ?? []) as Snippet[];
    }

    result.push({ ...(tpl as Template), snippets });
  }

  return result;
}

// ── Template CRUD ───────────────────────────────────────────────

export async function createTemplate(
  supabase: SupabaseClient,
  userId: string,
  name: string,
  sortOrder: number
): Promise<Template | null> {
  const { data, error } = await supabase
    .from("templates")
    .insert({ user_id: userId, name, sort_order: sortOrder })
    .select()
    .single();
  if (error) return null;
  return data as Template;
}

export async function updateTemplateName(
  supabase: SupabaseClient,
  templateId: string,
  name: string
): Promise<void> {
  await supabase
    .from("templates")
    .update({ name, updated_at: new Date().toISOString() })
    .eq("id", templateId);
}

export async function deleteTemplate(
  supabase: SupabaseClient,
  templateId: string
): Promise<void> {
  await supabase.from("templates").delete().eq("id", templateId);
}

// ── Snippet CRUD ────────────────────────────────────────────────

export async function createSnippet(
  supabase: SupabaseClient,
  templateId: string,
  category: SnippetCategory,
  label: string,
  text: string,
  sortOrder: number
): Promise<Snippet | null> {
  const { data, error } = await supabase
    .from("snippets")
    .insert({
      template_id: templateId,
      category,
      label,
      text,
      active: true,
      sort_order: sortOrder,
    })
    .select()
    .single();
  if (error) return null;
  return data as Snippet;
}

export async function updateSnippet(
  supabase: SupabaseClient,
  snippetId: string,
  changes: { label?: string; text?: string; category?: SnippetCategory }
): Promise<void> {
  await supabase
    .from("snippets")
    .update({ ...changes, updated_at: new Date().toISOString() })
    .eq("id", snippetId);
}

export async function toggleSnippetActive(
  supabase: SupabaseClient,
  snippetId: string,
  active: boolean
): Promise<void> {
  await supabase
    .from("snippets")
    .update({ active, updated_at: new Date().toISOString() })
    .eq("id", snippetId);
}

export async function deleteSnippet(
  supabase: SupabaseClient,
  snippetId: string
): Promise<void> {
  await supabase.from("snippets").delete().eq("id", snippetId);
}

// ── Placeholder values ──────────────────────────────────────────

export async function upsertPlaceholderValue(
  supabase: SupabaseClient,
  templateId: string,
  userId: string,
  key: string,
  value: string
): Promise<void> {
  await supabase.from("placeholder_values").upsert(
    {
      template_id: templateId,
      user_id: userId,
      key,
      value,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "template_id,user_id,key" }
  );
}
