"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
        <h2 className="mb-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
          What&apos;s <span className="squiggle">cooking</span>
        </h2>
        <p className="mx-auto max-w-md text-muted">
          Games, tools, and experiments — each one built to spark a little joy.
        </p>
      </motion.div>

      {/* Category filter pills */}
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={cn(
              "bouncy rounded-full px-4 py-2 text-sm font-semibold transition-all",
              activeCategory === cat.id
                ? "bg-foreground text-background"
                : "bg-warm-gray text-muted hover:text-foreground"
            )}
          >
            <span className="mr-1.5">{cat.emoji}</span>
            {cat.label}
          </button>
        ))}
      </div>

      {/* Bento grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredProjects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </motion.div>
      </AnimatePresence>

      {filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-2 py-20 text-center"
        >
          <span className="text-4xl">🏗️</span>
          <p className="text-muted">Nothing here yet. Stay tuned!</p>
        </motion.div>
      )}
    </section>
  );
}
