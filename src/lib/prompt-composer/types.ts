export type SnippetCategory =
  | "Product"
  | "Material"
  | "Structure"
  | "Illustration"
  | "Theme"
  | "Reference"
  | "Photography"
  | "Constraints";

export interface Template {
  id: string;
  user_id: string;
  name: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Snippet {
  id: string;
  template_id: string;
  category: SnippetCategory;
  label: string;
  text: string;
  active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface PlaceholderValue {
  id: string;
  template_id: string;
  user_id: string;
  key: string;
  value: string;
}

export interface TemplateWithSnippets extends Template {
  snippets: Snippet[];
}

export interface DefaultSnippet {
  category: SnippetCategory;
  label: string;
  text: string;
  active: boolean;
  sort_order: number;
}

export interface DefaultTemplate {
  name: string;
  snippets: DefaultSnippet[];
}
