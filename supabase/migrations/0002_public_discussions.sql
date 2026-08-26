create table if not exists public.discussion_messages (
  id uuid primary key default gen_random_uuid(),
  competition_id bigint not null references public.competitions on delete cascade,
  author_id uuid references public.profiles on delete set null,
  display_name text not null check (char_length(display_name) between 1 and 30),
  content text not null check (char_length(content) between 2 and 1000),
  status review_status not null default 'pending',
  created_at timestamptz not null default now()
);
alter table public.discussion_messages enable row level security;
create policy "read approved discussion" on public.discussion_messages for select using (status = 'approved' or author_id = auth.uid() or public.is_staff());
create policy "visitor submit discussion" on public.discussion_messages for insert to anon, authenticated with check (status = 'pending');
create policy "staff moderate discussion" on public.discussion_messages for all using (public.is_staff()) with check (public.is_staff());
create index if not exists discussion_messages_competition_created_idx on public.discussion_messages(competition_id, created_at desc);
