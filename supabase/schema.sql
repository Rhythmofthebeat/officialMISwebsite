create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  school_chapter text,
  linkedin text,
  instagram text,
  website text,
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

grant usage on schema public to anon, authenticated;
grant select, insert, update on public.profiles to authenticated;

drop policy if exists "Users can read their own profile" on public.profiles;
drop policy if exists "Users can create their own profile" on public.profiles;
drop policy if exists "Users can update their own profile" on public.profiles;

create policy "Users can read their own profile"
on public.profiles
for select
to authenticated
using (auth.uid() = id);

create policy "Users can create their own profile"
on public.profiles
for insert
to authenticated
with check (auth.uid() = id);

create policy "Users can update their own profile"
on public.profiles
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  type text not null,
  body text not null,
  author_name text not null,
  author_affiliation text,
  status text not null default 'approved' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now()
);

alter table public.posts enable row level security;
alter table public.posts alter column status set default 'approved';

grant usage on schema public to anon, authenticated;
grant select on public.posts to anon, authenticated;
grant insert, delete on public.posts to authenticated;

drop policy if exists "Anyone can read approved posts" on public.posts;
drop policy if exists "Users can read their own posts" on public.posts;
drop policy if exists "Logged in users can create approved posts" on public.posts;
drop policy if exists "Logged in users can create pending posts" on public.posts;
drop policy if exists "Admin can delete posts" on public.posts;

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

create policy "Logged in users can create approved posts"
on public.posts
for insert
to authenticated
with check (
  auth.uid() = user_id
  and status = 'approved'
);

create policy "Admin can delete posts"
on public.posts
for delete
to authenticated
using ((auth.jwt() ->> 'email') = 'kevinz09302009@gmail.com');
