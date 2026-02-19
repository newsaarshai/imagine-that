"use client";

import { motion } from "framer-motion";
import { Mail, MessageCircle } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="pt-16">
      <section className="mx-auto max-w-2xl px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="mb-4 inline-block text-5xl"
          >
            👋
          </motion.span>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Get in <span className="squiggle">touch</span>
          </h1>
          <p className="text-lg text-muted">
            Have an idea, found a bug, or just want to say hi?
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-6"
        >
          <a
            href="mailto:new.saar.shai@gmail.com"
            className="card-shadow group flex items-center gap-4 rounded-2xl border border-card-border bg-card-bg p-6"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-coral/10">
              <Mail className="h-5 w-5 text-coral" />
            </div>
            <div>
              <h3 className="font-bold">Email</h3>
              <p className="text-sm text-muted group-hover:text-foreground transition-colors">
                new.saar.shai@gmail.com
              </p>
            </div>
          </a>

          <div className="card-shadow flex items-center gap-4 rounded-2xl border border-card-border bg-card-bg p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
              <MessageCircle className="h-5 w-5 text-accent" />
            </div>
            <div>
              <h3 className="font-bold">Feedback</h3>
              <p className="text-sm text-muted">
                More ways to reach out coming soon — including a feedback form
                right here on the site.
              </p>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
