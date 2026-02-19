"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="pt-16">
      <section className="mx-auto max-w-2xl px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Say hi
          </h1>
          <p className="text-lg text-muted">
            Found a bug? Have an idea? Or just want to chat? I&apos;d love to hear from you.
          </p>
        </motion.div>

        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          href="mailto:new.saar.shai@gmail.com"
          className="card-shadow group flex items-center gap-4 rounded-2xl border border-card-border bg-card-bg p-6"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-coral/10">
            <Mail className="h-5 w-5 text-coral" />
          </div>
          <div>
            <h3 className="font-bold">Email me</h3>
            <p className="text-sm text-muted group-hover:text-foreground transition-colors">
              new.saar.shai@gmail.com
            </p>
          </div>
        </motion.a>
      </section>
    </div>
  );
}
