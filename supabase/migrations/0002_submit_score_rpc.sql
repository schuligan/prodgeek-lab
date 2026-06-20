-- PRO-28 · submit_score — the only write path. security definer so it can insert
-- past RLS, but only after re-validating the score in-DB (anti-cheat that holds
-- even against direct API calls). Granted to the anon (publishable) key.

create or replace function public.submit_score(p_name text, p_score int, p_hits int, p_run_ms int)
returns table(name text, score int)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_name text := left(coalesce(nullif(trim(p_name), ''), 'you'), 12);
begin
  -- Achievable totals are exactly 100 * hits(hits+1)/2; anything else is tampering.
  if p_hits is null or p_hits < 1 or p_hits > 100 then
    raise exception 'invalid_run';
  end if;
  if p_score is distinct from (100 * (p_hits * (p_hits + 1)) / 2) then
    raise exception 'score_mismatch';
  end if;
  if p_run_ms is null or p_run_ms < p_hits * 900 then
    raise exception 'too_fast';
  end if;

  insert into public.leaderboard(name, score) values (v_name, p_score);

  return query
    select l.name, l.score
    from public.leaderboard l
    order by l.score desc, l.created_at asc
    limit 10;
end;
$$;

revoke all on function public.submit_score(text, int, int, int) from public;
grant execute on function public.submit_score(text, int, int, int) to anon, authenticated;
