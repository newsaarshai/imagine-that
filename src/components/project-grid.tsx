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
    <section className="mx-auto max-w-6xl px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <h2 className="mb-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
          Projects
        </h2>
        <p className="max-w-md text-muted">
          Things I&apos;ve built or am building. Click one to check it out.
        </p>
      </motion.div>

      {/* Category filter pills */}
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={cn(
              "bouncy rounded-full px-4 py-1.5 text-sm font-medium transition-all",
              activeCategory === cat.id
                ? "bg-foreground text-background"
                : "bg-warm-gray text-muted hover:text-foreground"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredProjects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </motion.div>
      </AnimatePresence>

      {filteredProjects.length === 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-16 text-center text-muted"
        >
          Nothing in this category yet — stay tuned!
        </motion.p>
      )}
    </section>
  );
}
