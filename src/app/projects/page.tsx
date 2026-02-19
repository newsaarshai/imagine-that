import type { Metadata } from "next";
import { ProjectGrid } from "@/components/project-grid";

export const metadata: Metadata = {
  title: "Projects — imaginethat",
  description: "Browse all games, tools, and experiments.",
};

export default function ProjectsPage() {
  return (
    <div className="pt-16">
      <ProjectGrid />
    </div>
  );
}
