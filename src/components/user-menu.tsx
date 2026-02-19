"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";

export function UserMenu({ user }: { user: User | null }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.refresh();
    setOpen(false);
  }

  if (!user) {
    return (
      <Link
        href="/sign-in"
        className="bouncy inline-flex h-8 items-center rounded-full bg-foreground px-4 text-xs font-semibold text-background"
      >
        Sign in
      </Link>
    );
  }

  const avatar = user.user_metadata?.avatar_url as string | undefined;
  const name = (user.user_metadata?.full_name as string | undefined) ?? user.email ?? "You";
  const initials = name.slice(0, 2).toUpperCase();

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="bouncy flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border-2 border-card-border bg-warm-gray focus:outline-none"
        aria-label="User menu"
      >
        {avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={avatar} alt={name} className="h-full w-full object-cover" />
        ) : (
          <span className="text-xs font-bold text-foreground">{initials}</span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-10 z-50 min-w-[180px] rounded-2xl border border-card-border bg-card-bg p-1 shadow-lg"
          >
            <div className="px-3 py-2 text-xs text-muted truncate border-b border-card-border mb-1">
              {name}
            </div>
            <button
              onClick={signOut}
              className="w-full rounded-xl px-3 py-2 text-left text-sm text-foreground hover:bg-warm-gray transition-colors"
            >
              Sign out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
