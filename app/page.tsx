"use client";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TOOLS, CATEGORIES, type Tool } from "@/lib/tools";
import { ToolCard } from "@/components/ToolCard";
import { ToolModal } from "@/components/ToolModal";
import { Toast, type ToastData } from "@/components/Toast";

export default function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [selected, setSelected] = useState<Tool | null>(null);
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const pushToast = (message: string, type: ToastData["type"] = "info") => {
    setToasts((t) => [...t, { id: Date.now() + Math.random(), message, type }]);
  };

  const removeToast = (id: number) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TOOLS.filter((t) => {
      if (category !== "All" && t.category !== category) return false;
      if (!q) return true;
      return (
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.path.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
      );
    });
  }, [query, category]);

  const grouped = useMemo(() => {
    const map = new Map<string, Tool[]>();
    for (const t of filtered) {
      if (!map.has(t.category)) map.set(t.category, []);
      map.get(t.category)!.push(t);
    }
    return map;
  }, [filtered]);

  return (
    <main className="min-h-screen">
      <Toast toasts={toasts} onDone={removeToast} />
      <ToolModal tool={selected} onClose={() => setSelected(null)} onToast={pushToast} />

      {/* HERO */}
      <section className="relative px-6 pt-16 pb-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-edge bg-panel/60 backdrop-blur px-3 py-1 text-xs text-neutral-400 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-accent2 opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent2" />
            </span>
            Powered by VamxAPI · {TOOLS.length} tools aktif
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
            <span className="shimmer-text">INSOMNIATOOLS</span>
          </h1>
          <p className="mt-3 text-neutral-400 max-w-xl mx-auto text-sm sm:text-base">
            Kumpulan tools VamxAPI dalam satu tempat. Cari, klik, eksekusi.
            Tanpa ribet. Tanpa noise.
          </p>
        </motion.div>

        {/* Search + Filter */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 space-y-4"
        >
          <div className="relative">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500"
              width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Cari tool, path, atau kategori..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-2xl bg-panel/70 border border-edge pl-12 pr-4 py-3.5 text-sm placeholder:text-neutral-500 focus:bg-panel transition"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-thin">
            <FilterChip label="All" active={category === "All"} onClick={() => setCategory("All")} count={TOOLS.length} />
            {CATEGORIES.map((c) => {
              const count = TOOLS.filter((t) => t.category === c).length;
              return (
                <FilterChip
                  key={c}
                  label={c}
                  active={category === c}
                  onClick={() => setCategory(c)}
                  count={count}
                />
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* GRID */}
      <section className="px-6 pb-20 max-w-6xl mx-auto">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-neutral-500">
            Tidak ada tool yang cocok dengan pencarian.
          </div>
        ) : category === "All" && !query ? (
          Array.from(grouped.entries()).map(([cat, tools]) => (
            <div key={cat} className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-lg font-semibold">{cat}</h2>
                <span className="text-xs text-neutral-500">{tools.length} tools</span>
                <div className="flex-1 h-px bg-edge" />
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence>
                  {tools.map((t, i) => (
                    <ToolCard
                      key={t.id}
                      tool={t}
                      index={i}
                      onClick={() => setSelected(t)}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </div>
          ))
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {filtered.map((t, i) => (
                <ToolCard
                  key={t.id}
                  tool={t}
                  index={i}
                  onClick={() => setSelected(t)}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>

      <footer className="border-t border-edge py-8 text-center text-xs text-neutral-500">
        © {new Date().getFullYear()} INSOMNIATOOLS · By InsomniaDev · API by VamxAPI
      </footer>
    </main>
  );
}

function FilterChip({
  label,
  active,
  onClick,
  count
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  count: number;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={`shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all ${
        active
          ? "border-accent/60 bg-accent/15 text-white shadow-glow"
          : "border-edge bg-panel/50 text-neutral-400 hover:text-white hover:bg-panel"
      }`}
    >
      {label}
      <span className={`ml-1.5 ${active ? "text-accent2" : "text-neutral-600"}`}>{count}</span>
    </motion.button>
  );
}