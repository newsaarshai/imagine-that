"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/lib/projects";

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={project.href}>
        <div className="card-shadow group relative overflow-hidden rounded-2xl border border-card-border bg-card-bg">
          {/* Colored top bar */}
          <div
            className="flex h-32 items-center justify-center"
            style={{ backgroundColor: `${project.color}15` }}
          >
            <motion.span
              className="text-5xl select-none"
              whileHover={{ scale: 1.3, rotate: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {project.emoji}
            </motion.span>
          </div>

          <div className="p-5">
            {/* Status + category */}
            <div className="mb-3 flex items-center justify-between">
              <span
                className="rounded-full px-2.5 py-0.5 text-xs font-semibold"
                style={{
                  backgroundColor: `${project.color}15`,
                  color: project.color,
                }}
              >
                {project.category}
              </span>
              {project.status === "coming-soon" && (
                <span className="rounded-full bg-warm-gray px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted">
                  Coming Soon
                </span>
              )}
              {project.status === "beta" && (
                <span className="rounded-full bg-amber/10 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-amber">
                  Beta
                </span>
              )}
            </div>

            {/* Title */}
            <h3 className="mb-1.5 text-lg font-bold tracking-tight text-foreground">
              {project.title}
            </h3>

            {/* Description */}
            <p className="mb-4 text-sm leading-relaxed text-muted">
              {project.description}
            </p>

            {/* Tags */}
            <div className="mb-3 flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-warm-gray px-2 py-0.5 text-xs font-medium text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Link hint */}
            <div className="flex items-center gap-1 text-xs font-medium text-muted transition-all group-hover:gap-2 group-hover:text-foreground">
              {project.status === "live" ? "Play now" : "View details"}
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
