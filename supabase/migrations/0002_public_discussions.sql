create table public.discussion_messages (
  id uuid primary key default gen_random_uuid(),competition_id bigint not null references public.competitions on delete cascade,
  author_id uuid references public.profiles on delete set null,display_name text not null check(char_length(display_name) between 1 and 30),
  content text not null check(char_length(content) between 2 and 1000),status public.review_status not null default 'pending',
  reviewed_by uuid references public.profiles,reviewed_at timestamptz,created_at timestamptz not null default now()
);
alter table public.discussion_messages enable row level security;
create policy "read approved discussion" on public.discussion_messages for select to anon,authenticated using(status='approved' or author_id=(select auth.uid()) or public.is_staff());
create policy "staff moderate discussion" on public.discussion_messages for all to authenticated using(public.is_staff()) with check(public.is_staff());
create index discussion_messages_competition_created_idx on public.discussion_messages(competition_id,created_at desc);

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values('submission-files','submission-files',false,10485760,array['application/pdf','application/vnd.openxmlformats-officedocument.wordprocessingml.document','application/vnd.openxmlformats-officedocument.presentationml.presentation','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','application/zip','application/x-zip-compressed','image/png','image/jpeg','text/plain']) on conflict(id) do update set public=false,file_size_limit=excluded.file_size_limit,allowed_mime_types=excluded.allowed_mime_types;
