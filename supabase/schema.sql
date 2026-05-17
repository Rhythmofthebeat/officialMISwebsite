create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  type text not null,
  body text not null,
  author_name text not null,
  author_affiliation text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now()
);

alter table public.posts enable row level security;

drop policy if exists "Anyone can read approved posts" on public.posts;
drop policy if exists "Users can read their own posts" on public.posts;
drop policy if exists "Logged in users can create pending posts" on public.posts;

create policy "Anyone can read approved posts"
on public.posts
for select
to anon, authenticated
using (status = 'approved');

create policy "Users can read their own posts"
on public.posts
for select
to authenticated
using (auth.uid() = user_id);

create policy "Logged in users can create pending posts"
on public.posts
for insert
to authenticated
with check (
  auth.uid() = user_id
  and status = 'pending'
);
