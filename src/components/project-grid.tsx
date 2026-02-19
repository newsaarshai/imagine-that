"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ProjectCard } from "./project-card";
import { projects, categories } from "@/lib/projects";
import { cn } from "@/lib/utils";

export function ProjectGrid() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
          What&apos;s <span className="gradient-text">cooking</span>
        </h2>
        <p className="mx-auto max-w-md text-muted">
          Games, tools, and experiments — each one built to spark a little joy.
        </p>
      </motion.div>

      {/* Category filter */}
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-all",
              activeCategory === cat.id
                ? "bg-accent text-white shadow-lg shadow-accent/20"
                : "bg-white/5 text-muted hover:bg-white/10 hover:text-foreground"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-20 text-center text-muted"
        >
          No projects in this category yet. Stay tuned!
        </motion.p>
      )}
    </section>
  );
}
