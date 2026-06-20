-- PRO-28 · Bullpen cloud leaderboard — table + RLS.
-- Applied to project cezflrayupqgtooeuyrx (ca-central-1) via Supabase MCP.

create table public.leaderboard (
  id bigint generated always as identity primary key,
  name text not null check (char_length(name) between 1 and 12),
  score integer not null check (score >= 0 and score <= 1000000),
  created_at timestamptz not null default now()
);

alter table public.leaderboard enable row level security;

-- Public can READ the board (anon key, used by GET /api/score).
create policy "leaderboard_public_read"
  on public.leaderboard for select
  to anon, authenticated
  using (true);

-- No insert/update/delete policy on purpose: writes are impossible with the anon
-- key directly. They only happen through the validating submit_score() RPC below.

create index leaderboard_score_desc_idx on public.leaderboard (score desc, created_at asc);
