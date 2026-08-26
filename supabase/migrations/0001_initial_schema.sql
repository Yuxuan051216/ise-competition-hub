create extension if not exists pgcrypto;
create type public.app_role as enum ('user','moderator','admin');
create type public.review_status as enum ('draft','pending','approved','rejected');

create table public.profiles (
  id uuid primary key references auth.users on delete cascade,
  nickname text not null check(char_length(nickname) between 1 and 40),
  avatar_url text, bio text check(char_length(bio)<=300), real_name text,
  show_real_name boolean not null default false,
  role public.app_role not null default 'user', created_at timestamptz not null default now()
);
create table public.competitions (
  id bigint generated always as identity primary key, slug text unique not null,
  name text not null, summary text, tags text[] not null default '{}', difficulty text,
  preparation_cycle text, official_url text, status public.review_status not null default 'approved',
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.competition_editions (id bigint generated always as identity primary key,competition_id bigint not null references public.competitions on delete cascade,year int not null,registration_start date,registration_end date,event_start date,event_end date,source_url text,verified_at timestamptz,unique(competition_id,year));
create table public.information_sources (id bigint generated always as identity primary key,competition_id bigint references public.competitions on delete cascade,title text not null,url text not null,source_type text not null,checked_at timestamptz,is_official boolean not null default false);
create table public.registration_requirements (id bigint generated always as identity primary key,edition_id bigint not null references public.competition_editions on delete cascade,content text not null,source_url text);
create table public.external_resources (id bigint generated always as identity primary key,competition_id bigint not null references public.competitions on delete cascade,title text not null,url text not null,resource_type text not null,license text,status public.review_status not null default 'pending');
create table public.submissions (
  id uuid primary key default gen_random_uuid(), author_id uuid references public.profiles on delete set null,
  competition_id bigint not null references public.competitions on delete restrict,
  type text not null check(type in ('experience','project','information')),
  title text not null check(char_length(title) between 2 and 100), content text not null check(char_length(content) between 10 and 5000),
  award text not null check(char_length(award) between 1 and 80), contributor_name text check(char_length(contributor_name)<=40),
  license text, status public.review_status not null default 'pending', reviewed_by uuid references public.profiles,
  reviewed_at timestamptz, created_at timestamptz not null default now()
);
create table public.submission_contacts (submission_id uuid primary key references public.submissions on delete cascade,email text not null check(char_length(email)<=254),created_at timestamptz not null default now());
create table public.submission_files (id uuid primary key default gen_random_uuid(),submission_id uuid not null references public.submissions on delete cascade,storage_path text unique not null,original_name text not null check(char_length(original_name)<=255),mime_type text not null,size_bytes bigint not null check(size_bytes>0 and size_bytes<=10485760),created_at timestamptz not null default now());
create table public.comments (id uuid primary key default gen_random_uuid(),author_id uuid not null references public.profiles on delete cascade,competition_id bigint not null references public.competitions on delete cascade,parent_id uuid references public.comments on delete cascade,content text not null check(char_length(content) between 1 and 3000),status public.review_status not null default 'pending',created_at timestamptz not null default now());
create table public.comment_votes (user_id uuid references public.profiles on delete cascade,comment_id uuid references public.comments on delete cascade,created_at timestamptz not null default now(),primary key(user_id,comment_id));
create table public.bookmarks (user_id uuid references public.profiles on delete cascade,competition_id bigint references public.competitions on delete cascade,created_at timestamptz not null default now(),primary key(user_id,competition_id));
create table public.reports (id uuid primary key default gen_random_uuid(),reporter_id uuid references public.profiles on delete set null,target_type text not null,target_id text not null,reason text not null,status public.review_status not null default 'pending',created_at timestamptz not null default now());
create table public.corrections (id uuid primary key default gen_random_uuid(),author_id uuid references public.profiles on delete set null,competition_id bigint not null references public.competitions on delete cascade,content text not null,source_url text,status public.review_status not null default 'pending',created_at timestamptz not null default now());

create function public.is_staff() returns boolean language sql stable security definer set search_path=pg_catalog,public as $$select exists(select 1 from public.profiles where id=(select auth.uid()) and role in ('moderator','admin'))$$;
revoke all on function public.is_staff() from public;grant execute on function public.is_staff() to authenticated,service_role;
create function public.handle_new_user() returns trigger language plpgsql security definer set search_path=pg_catalog,public as $$begin insert into public.profiles(id,nickname) values(new.id,coalesce(nullif(new.raw_user_meta_data->>'nickname',''),split_part(new.email,'@',1),'新用户'));return new;end$$;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;alter table public.competitions enable row level security;alter table public.competition_editions enable row level security;alter table public.information_sources enable row level security;alter table public.registration_requirements enable row level security;alter table public.external_resources enable row level security;alter table public.submissions enable row level security;alter table public.submission_contacts enable row level security;alter table public.submission_files enable row level security;alter table public.comments enable row level security;alter table public.comment_votes enable row level security;alter table public.bookmarks enable row level security;alter table public.reports enable row level security;alter table public.corrections enable row level security;

revoke all on public.profiles from anon,authenticated;grant select on public.profiles to authenticated;grant update(nickname,avatar_url,bio,real_name,show_real_name) on public.profiles to authenticated;
create policy "read own or staff profile" on public.profiles for select to authenticated using(id=(select auth.uid()) or public.is_staff());
create policy "update own profile" on public.profiles for update to authenticated using(id=(select auth.uid())) with check(id=(select auth.uid()));
create view public.public_profiles with(security_barrier=true) as select id,nickname,avatar_url,bio,case when show_real_name then real_name else null end as real_name,show_real_name,created_at from public.profiles;
revoke all on public.public_profiles from public;grant select on public.public_profiles to anon,authenticated;

create policy "public approved competitions" on public.competitions for select to anon,authenticated using(status='approved');
create policy "public editions" on public.competition_editions for select to anon,authenticated using(true);create policy "public sources" on public.information_sources for select to anon,authenticated using(true);create policy "public requirements" on public.registration_requirements for select to anon,authenticated using(true);create policy "public approved resources" on public.external_resources for select to anon,authenticated using(status='approved');
create policy "public approved submissions" on public.submissions for select to anon,authenticated using(status='approved' or author_id=(select auth.uid()) or public.is_staff());
create policy "public files for approved submissions" on public.submission_files for select to anon,authenticated using(exists(select 1 from public.submissions s where s.id=submission_id and s.status='approved'));
create policy "staff contacts" on public.submission_contacts for select to authenticated using(public.is_staff());
create policy "approved comments" on public.comments for select to anon,authenticated using(status='approved' or author_id=(select auth.uid()) or public.is_staff());
create policy "create own comment" on public.comments for insert to authenticated with check(author_id=(select auth.uid()) and status='pending');
create policy "own votes" on public.comment_votes for all to authenticated using(user_id=(select auth.uid())) with check(user_id=(select auth.uid()));create policy "own bookmarks" on public.bookmarks for all to authenticated using(user_id=(select auth.uid())) with check(user_id=(select auth.uid()));
create policy "create correction" on public.corrections for insert to authenticated with check(author_id=(select auth.uid()) and status='pending');create policy "read own correction" on public.corrections for select to authenticated using(author_id=(select auth.uid()) or public.is_staff());create policy "create report" on public.reports for insert to authenticated with check(reporter_id=(select auth.uid()) and status='pending');
create policy "staff manage competitions" on public.competitions for all to authenticated using(public.is_staff()) with check(public.is_staff());create policy "staff manage submissions" on public.submissions for all to authenticated using(public.is_staff()) with check(public.is_staff());create policy "staff manage files" on public.submission_files for all to authenticated using(public.is_staff()) with check(public.is_staff());create policy "staff manage contacts" on public.submission_contacts for all to authenticated using(public.is_staff()) with check(public.is_staff());
create index submissions_competition_created_idx on public.submissions(competition_id,created_at desc);create index submission_files_submission_idx on public.submission_files(submission_id);
