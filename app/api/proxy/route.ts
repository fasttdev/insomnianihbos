import { NextRequest, NextResponse } from "next/server";

const BASE = "https://vamxapi.my.id";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";
    const apiKey = process.env.VAMX_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "VAMX_API_KEY not configured on server" },
        { status: 500 }
      );
    }

    // --- JSON payload mode ---
    if (contentType.includes("application/json")) {
      const { path, method, query, body } = await req.json();
      const url = new URL(BASE + path);
      if (query && typeof query === "object") {
        for (const [k, v] of Object.entries(query)) {
          if (v !== undefined && v !== null && v !== "") {
            url.searchParams.set(k, String(v));
          }
        }
      }
      // pass apikey via query + header
      url.searchParams.set("apikey", apiKey);

      const init: RequestInit = {
        method: method || "GET",
        headers: {
          "x-api-key": apiKey,
          Authorization: `Bearer ${apiKey}`,
          Accept: "*/*"
        }
      };
      if (init.method !== "GET" && body && typeof body === "object") {
        (init.headers as Record<string, string>)["Content-Type"] =
          "application/json";
        init.body = JSON.stringify(body);
      }

      const r = await fetch(url.toString(), init);
      const text = await r.text();
      let data: unknown = text;
      try {
        data = JSON.parse(text);
      } catch {
        /* keep raw text */
      }
      return NextResponse.json(
        { ok: r.ok, status: r.status, data },
        { status: 200 }
      );
    }

    // --- Multipart mode ---
    const form = await req.formData();
    const path = String(form.get("__path") || "");
    const method = String(form.get("__method") || "GET");
    const queryRaw = String(form.get("__query") || "{}");
    let query: Record<string, string> = {};
    try {
      query = JSON.parse(queryRaw);
    } catch {}

    const url = new URL(BASE + path);
    for (const [k, v] of Object.entries(query)) {
      if (v !== undefined && v !== null && v !== "") {
        url.searchParams.set(k, String(v));
      }
    }
    url.searchParams.set("apikey", apiKey);

    const forward = new FormData();
    for (const [key, value] of form.entries()) {
      if (key.startsWith("__")) continue;
      if (value instanceof File) forward.append(key, value, value.name);
      else forward.append(key, String(value));
    }

    const r = await fetch(url.toString(), {
      method: method || "POST",
      headers: {
        "x-api-key": apiKey,
        Authorization: `Bearer ${apiKey}`,
        Accept: "*/*"
      },
      body: method === "GET" ? undefined : forward
    });
    const text = await r.text();
    let data: unknown = text;
    try {
      data = JSON.parse(text);
    } catch {}
    return NextResponse.json({ ok: r.ok, status: r.status, data });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, message: "INSOMNIATOOLS proxy ready" });
}