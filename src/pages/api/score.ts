import type { APIRoute } from "astro";
import { createClient } from "@supabase/supabase-js";

// Serverless route (PRO-28) — opts out of prerender so it runs as a Vercel function.
export const prerender = false;

// Publishable (anon) key only — the anti-cheat + write path lives in the
// `submit_score` security-definer RPC, so no service-role secret is needed.
// RESEND_API_KEY stays server-only for the optional goodie email.
const env = (k: string) => process.env[k] ?? (import.meta.env as Record<string, string>)[k];
const SUPABASE_URL = env("SUPABASE_URL");
const SUPABASE_ANON_KEY = env("SUPABASE_ANON_KEY");
const RESEND_KEY = env("RESEND_API_KEY");
const GOODIE_FROM = env("GOODIE_FROM_EMAIL") ?? "Prodgeek Lab <onboarding@resend.dev>";

function db() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return null;
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, { auth: { persistSession: false } });
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}

export const GET: APIRoute = async () => {
  const sb = db();
  if (!sb) return json({ top: [], offline: true }, 200);
  const { data, error } = await sb
    .from("leaderboard")
    .select("name,score")
    .order("score", { ascending: false })
    .order("created_at", { ascending: true })
    .limit(10);
  if (error) return json({ error: "read_failed" }, 500);
  return json({ top: data ?? [] });
};

export const POST: APIRoute = async ({ request }) => {
  const sb = db();
  if (!sb) return json({ error: "offline" }, 503);

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ error: "bad_json" }, 400);
  }

  const name = (String(body.name ?? "").trim().slice(0, 12) || "you").replace(/[<>]/g, "");
  const hits = Number(body.hits);
  const score = Number(body.score);
  const runMs = Number(body.runMs);
  const email = body.email ? String(body.email).trim().slice(0, 120) : "";

  if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return json({ error: "bad_email" }, 422);

  // The RPC re-validates the score in-DB and raises on tampering.
  const { data, error } = await sb.rpc("submit_score", {
    p_name: name,
    p_score: score,
    p_hits: hits,
    p_run_ms: runMs,
  });
  if (error) {
    const code = /score_mismatch|invalid_run|too_fast/.test(error.message) ? 422 : 500;
    return json({ error: code === 422 ? "rejected" : "write_failed" }, code);
  }

  // ---- optional goodie email (lead magnet) — best-effort, never blocks ----
  if (email && RESEND_KEY) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${RESEND_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: GOODIE_FROM,
          to: email,
          subject: "Your idea → MVP starter — from Prodgeek Lab",
          html: goodieHtml(name, score),
        }),
      });
    } catch {
      /* the score already landed; email is best-effort */
    }
  }

  return json({ ok: true, top: data ?? [] });
};

function goodieHtml(name: string, score: number) {
  return `<div style="font-family:system-ui,sans-serif;max-width:520px;color:#11131d">
    <h2 style="margin:0 0 12px">Nice arm, ${name} ⚾</h2>
    <p>You put up <strong>${score}</strong> in the Bullpen — and you left your email, so here's the starter I promised.</p>
    <p><strong>Idea → MVP in one page:</strong></p>
    <ol>
      <li><strong>The one job</strong> — the single thing it must do on day one.</li>
      <li><strong>The brutal 30%</strong> — auth, payments, the data model, the part AI tools stall on.</li>
      <li><strong>The smallest shippable slice</strong> — what a real user could touch in two weeks.</li>
      <li><strong>The "is this worth it?" check</strong> — who pays, and why now.</li>
    </ol>
    <p>Bring this to a call and we'll pressure-test it together — free.</p>
    <p><a href="https://cal.com/prateek-jha" style="color:#1f7a6a">Book a free chat →</a></p>
    <p style="font-size:12px;color:#6b7280">Prodgeek Lab · you got this because you entered your email on the Bullpen leaderboard.</p>
  </div>`;
}
