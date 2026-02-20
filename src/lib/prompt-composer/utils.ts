import type { Snippet } from "./types";

export const PH_RE = /\{([^}]+)\}/g;

export function extractPlaceholders(text: string): string[] {
  const out: string[] = [];
  let m: RegExpExecArray | null;
  const re = new RegExp(PH_RE.source, PH_RE.flags);
  while ((m = re.exec(text)) !== null) {
    if (!out.includes(m[1])) out.push(m[1]);
  }
  return out;
}

export function camelToLabel(s: string): string {
  return s
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (c) => c.toUpperCase())
    .trim();
}

export function buildFinalPrompt(
  snippets: Snippet[],
  placeholderValues: Record<string, string>
): string {
  return snippets
    .filter((s) => s.active)
    .map((s) => {
      let text = s.text;
      extractPlaceholders(s.text).forEach((ph) => {
        const val = placeholderValues[ph];
        text = text.replaceAll(`{${ph}}`, val?.trim() || camelToLabel(ph));
      });
      return text;
    })
    .join("\n\n");
}
