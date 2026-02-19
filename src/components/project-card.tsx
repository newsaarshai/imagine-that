"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Gamepad2, Wrench, FlaskConical, AppWindow } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/lib/projects";

const categoryIcons = {
  game: Gamepad2,
  tool: Wrench,
  experiment: FlaskConical,
  app: AppWindow,
};

const categoryColors = {
  game: "from-emerald-500/20 to-emerald-500/5 text-emerald-400 border-emerald-500/20",
  tool: "from-blue-500/20 to-blue-500/5 text-blue-400 border-blue-500/20",
  experiment: "from-amber-500/20 to-amber-500/5 text-amber-400 border-amber-500/20",
  app: "from-rose-500/20 to-rose-500/5 text-rose-400 border-rose-500/20",
};

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = categoryIcons[project.category];
  const colorClass = categoryColors[project.category];

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    cardRef.current.style.setProperty("--card-mouse-x", `${x}%`);
    cardRef.current.style.setProperty("--card-mouse-y", `${y}%`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={project.href}>
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          className="group relative overflow-hidden rounded-2xl border border-card-border bg-card-bg p-6 transition-all duration-300 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5"
          style={{
            background: `radial-gradient(600px circle at var(--card-mouse-x, 50%) var(--card-mouse-y, 50%), rgba(108, 92, 231, 0.04), transparent 40%)`,
          }}
        >
          {/* Category badge */}
          <div className="mb-4 flex items-center justify-between">
            <div
              className={`inline-flex items-center gap-1.5 rounded-full border bg-gradient-to-r px-3 py-1 text-xs font-medium ${colorClass}`}
            >
              <Icon className="h-3 w-3" />
              {project.category}
            </div>
            {project.status === "coming-soon" && (
              <span className="rounded-full bg-white/5 px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-muted">
                Coming Soon
              </span>
            )}
            {project.status === "beta" && (
              <span className="rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-amber-400">
                Beta
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="mb-2 text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent-light">
            {project.title}
          </h3>

          {/* Description */}
          <p className="mb-5 text-sm leading-relaxed text-muted">
            {project.description}
          </p>

          {/* Tags */}
          <div className="mb-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-white/5 px-2 py-0.5 text-xs text-muted/80"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Arrow indicator */}
          <div className="flex items-center gap-1 text-xs text-muted transition-all group-hover:gap-2 group-hover:text-accent-light">
            {project.status === "live" ? "Open" : "View details"}
            <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
