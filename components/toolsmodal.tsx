"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { Tool } from "@/lib/tools";

export function ToolModal({
  tool,
  onClose,
  onToast
}: {
  tool: Tool | null;
  onClose: () => void;
  onToast: (message: string, type: "success" | "error" | "info") => void;
}) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [files, setFiles] = useState<Record<string, File | null>>({});
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [statusCode, setStatusCode] = useState<number | null>(null);

  const reset = () => {
    setValues({});
    setFiles({});
    setResponse(null);
    setStatusCode(null);
    setLoading(false);
  };

  const close = () => {
    reset();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tool) return;
    setLoading(true);
    setResponse(null);
    setStatusCode(null);

    try {
      const hasFile = Object.values(files).some((f) => f !== null);
      const fileParam = tool.params.find((p) => p.type === "file");
      const isMultipart = !!fileParam && hasFile;

      let res: Response;
      if (isMultipart) {
        const fd = new FormData();
        fd.append("__path", tool.path);
        fd.append("__method", tool.method);
        fd.append("__query", JSON.stringify(values));
        for (const [k, f] of Object.entries(files)) {
          if (f) fd.append(k, f);
        }
        res = await fetch("/api/proxy", { method: "POST", body: fd });
      } else {
        res = await fetch("/api/proxy", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            path: tool.path,
            method: tool.method,
            query: tool.method === "GET" ? values : undefined,
            body: tool.method === "POST" ? values : undefined
          })
        });
      }

      const json = await res.json();
      setStatusCode(json.status ?? res.status);
      setResponse(JSON.stringify(json.data ?? json, null, 2));
      if (json.ok !== false) {
        onToast(`${tool.name} berhasil dipanggil`, "success");
      } else {
        onToast(`Gagal memanggil ${tool.name}`, "error");
      }
    } catch (err) {
      onToast(err instanceof Error ? err.message : "Terjadi error", "error");
      setResponse("Request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {tool && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={close}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-edge bg-panel shadow-glow"
          >
            <div className="sticky top-0 z-10 flex items-start justify-between gap-3 border-b border-edge bg-panel/95 backdrop-blur px-5 py-4">
              <div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="rounded-md bg-accent/15 text-accent px-2 py-0.5 font-medium border border-accent/30">
                    {tool.method}
                  </span>
                  <span className="text-neutral-500 truncate">{tool.path}</span>
                </div>
                <h2 className="mt-1 text-lg font-semibold">{tool.name}</h2>
                <p className="text-xs text-neutral-400 mt-0.5">{tool.description}</p>
              </div>
              <button
                onClick={close}
                className="shrink-0 rounded-lg border border-edge p-1.5 text-neutral-400 hover:text-white hover:bg-white/5 transition"
                aria-label="Close"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              {tool.params.length === 0 && (
                <p className="text-sm text-neutral-400">
                  Tool ini tidak butuh parameter. Tekan <b>Jalankan</b>.
                </p>
              )}

              {tool.params.map((param) => (
                <div key={param.name} className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-300 flex justify-between">
                    <span>
                      {param.label}
                      {param.required && <span className="text-rose-400"> *</span>}
                    </span>
                    <span className="text-neutral-500 font-mono text-[10px]">{param.name}</span>
                  </label>

                  {param.type === "select" ? (
                    <select
                      className="w-full rounded-lg bg-ink border border-edge px-3 py-2 text-sm"
                      value={values[param.name] || ""}
                      onChange={(e) =>
                        setValues((v) => ({ ...v, [param.name]: e.target.value }))
                      }
                      required={param.required}
                    >
                      <option value="">-- Pilih --</option>
                      {param.options?.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  ) : param.type === "textarea" ? (
                    <textarea
                      className="w-full rounded-lg bg-ink border border-edge px-3 py-2 text-sm min-h-[80px]"
                      placeholder={param.placeholder}
                      value={values[param.name] || ""}
                      onChange={(e) =>
                        setValues((v) => ({ ...v, [param.name]: e.target.value }))
                      }
                      required={param.required}
                    />
                  ) : param.type === "file" ? (
                    <input
                      type="file"
                      className="w-full rounded-lg bg-ink border border-edge px-3 py-2 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-accent/20 file:text-accent file:px-3 file:py-1.5 file:text-xs file:font-medium hover:file:bg-accent/30 cursor-pointer"
                      onChange={(e) =>
                        setFiles((f) => ({ ...f, [param.name]: e.target.files?.[0] || null }))
                      }
                      required={param.required}
                    />
                  ) : (
                    <input
                      type={param.type}
                      className="w-full rounded-lg bg-ink border border-edge px-3 py-2 text-sm"
                      placeholder={param.placeholder}
                      value={values[param.name] || ""}
                      onChange={(e) =>
                        setValues((v) => ({ ...v, [param.name]: e.target.value }))
                      }
                      required={param.required}
                    />
                  )}
                </div>
              ))}

              <div className="flex items-center gap-2 pt-2">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  disabled={loading}
                  className="rounded-xl bg-gradient-to-r from-accent to-accent2 text-white font-medium text-sm px-5 py-2.5 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg hover:shadow-glow transition-all"
                >
                  {loading ? "Memproses..." : "Jalankan"}
                </motion.button>
                <button
                  type="button"
                  onClick={reset}
                  className="rounded-xl border border-edge px-4 py-2.5 text-sm text-neutral-300 hover:bg-white/5 transition"
                >
                  Reset
                </button>
              </div>
            </form>

            {(response || loading) && (
              <div className="border-t border-edge p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold">Response</h3>
                  {statusCode !== null && (
                    <span
                      className={`text-xs px-2 py-0.5 rounded-md border ${
                        statusCode < 400
                          ? "text-emerald-300 border-emerald-500/40 bg-emerald-500/10"
                          : "text-rose-300 border-rose-500/40 bg-rose-500/10"
                      }`}
                    >
                      HTTP {statusCode}
                    </span>
                  )}
                </div>
                <pre className="text-xs bg-ink border border-edge rounded-lg p-3 overflow-auto max-h-[280px] text-neutral-300 font-mono whitespace-pre-wrap break-all">
                  {loading ? "Loading..." : response}
                </pre>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}