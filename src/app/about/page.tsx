"use client";

import { motion } from "framer-motion";

const sections = [
  {
    emoji: "💡",
    title: "The Idea",
    text: "I love building things — small apps, games, and creative experiments. This site is a home for all of them. Think of it as a digital workshop where every project gets its own space.",
  },
  {
    emoji: "🎯",
    title: "What You'll Find",
    text: "Mini games you can play right in your browser. Creative tools that help you make cool things. Interactive experiments that push what the web can do. New stuff added regularly.",
  },
  {
    emoji: "🛠️",
    title: "Built With",
    text: "Next.js, React, Tailwind CSS, and Framer Motion for smooth animations. Hosted on Vercel with Supabase for anything that needs a database. Everything is built to be fast, responsive, and fun.",
  },
  {
    emoji: "🌱",
    title: "Always Growing",
    text: "This is a living site. New projects get added, old ones get updated, and the whole thing evolves over time. Bookmark it and check back — there's always something new cooking.",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-16">
      <section className="mx-auto max-w-3xl px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="mb-4 inline-block text-5xl"
          >
            ✦
          </motion.span>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            About <span className="gradient-text">imaginethat</span>
          </h1>
          <p className="mx-auto max-w-lg text-lg text-muted">
            A personal playground for creative software — games, tools, and
            experiments that are fun to build and fun to use.
          </p>
        </motion.div>

        <div className="space-y-8">
          {sections.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              className="card-shadow flex gap-5 rounded-2xl border border-card-border bg-card-bg p-6"
            >
              <span className="mt-1 text-3xl">{section.emoji}</span>
              <div>
                <h2 className="mb-2 text-lg font-bold">{section.title}</h2>
                <p className="leading-relaxed text-muted">{section.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
