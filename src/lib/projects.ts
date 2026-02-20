export interface Project {
  id: string;
  title: string;
  description: string;
  category: "game" | "tool" | "experiment" | "app";
  href: string;
  emoji: string;
  color: string;
  tags: string[];
  status: "live" | "coming-soon" | "beta";
}

export const projects: Project[] = [
  {
    id: "prompt-composer",
    title: "Prompt Composer",
    description:
      "Build modular image-generation prompts by toggling and editing reusable snippets.",
    category: "tool",
    href: "/prompt-composer",
    emoji: "🎨",
    color: "#6366F1",
    tags: ["ai", "prompts", "images"],
    status: "live",
  },
];

export const categories = [
  { id: "all", label: "All", emoji: "🌟" },
  { id: "game", label: "Games", emoji: "🎮" },
  { id: "tool", label: "Tools", emoji: "🔧" },
  { id: "experiment", label: "Experiments", emoji: "🧪" },
  { id: "app", label: "Apps", emoji: "📱" },
] as const;
