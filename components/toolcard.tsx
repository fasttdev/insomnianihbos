"use client";
import { motion } from "framer-motion";
import type { Tool } from "@/lib/tools";

export function ToolCard({
  tool,
  index,
  onClick
}: {
  tool: Tool;
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.button
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.015, 0.4) }}
      whileHover={{ y: -3 }}
      onClick={onClick}
      className="group relative text-left w-full rounded-2xl border border-edge bg-panel/60 hover:bg-panel backdrop-blur p-4 overflow-hidden transition-colors"
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-accent/10 via-transparent to-accent2/10" />
      <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{background: "linear-gradient(135deg, rgba(124,92,255,.4), transparent 40%, transparent 60%, rgba(34,211,238,.4))", WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)", WebkitMaskComposite: "xor", maskComposite: "exclude", padding: "1px"}} />

      <div className="relative">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span
            className={`text-[10px] font-semibold rounded-md px-2 py-0.5 border ${
              tool.method === "GET"
                ? "text-emerald-300 border-emerald-500/30 bg-emerald-500/10"
                : "text-amber-300 border-amber-500/30 bg-amber-500/10"
            }`}
          >
            {tool.method}
          </span>
          <span className="text-[10px] text-neutral-500 truncate max-w-[140px]">{tool.category}</span>
        </div>

        <h3 className="text-sm font-semibold tracking-tight text-white group-hover:text-white">
          {tool.name}
        </h3>
        <p className="mt-1 text-xs leading-relaxed text-neutral-400 line-clamp-3">
          {tool.description}
        </p>

        <div className="mt-3 flex items-center justify-between text-[10px] text-neutral-500 font-mono">
          <span className="truncate">{tool.path}</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-neutral-500 group-hover:text-accent transition"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </motion.button>
  );
}