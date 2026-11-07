"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

export type ToastData = { id: number; message: string; type: "success" | "error" | "info" };

export function Toast({
  toasts,
  onDone
}: {
  toasts: ToastData[];
  onDone: (id: number) => void;
}) {
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2">
      <AnimatePresence>
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onDone={onDone} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function ToastItem({ toast, onDone }: { toast: ToastData; onDone: (id: number) => void }) {
  useEffect(() => {
    const timer = setTimeout(() => onDone(toast.id), 3000);
    return () => clearTimeout(timer);
  }, [toast, onDone]);

  const color =
    toast.type === "success"
      ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-200"
      : toast.type === "error"
      ? "border-rose-500/40 bg-rose-500/10 text-rose-200"
      : "border-accent/40 bg-accent/10 text-accent";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 60 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={`min-w-[220px] max-w-[340px] rounded-xl border px-4 py-3 text-sm shadow-lg backdrop-blur-md ${color}`}
    >
      {toast.message}
    </motion.div>
  );
}