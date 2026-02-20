-- Prompt Composer database setup
-- Run this in the Supabase SQL Editor (supabase.com → your project → SQL Editor → New query)

-- 1. Create the snippet category enum
create type public.snippet_category as enum (
  'Product', 'Material', 'Structure', 'Illustration',
  'Theme', 'Reference', 'Photography', 'Constraints'
);

-- 2. Templates table
create table public.templates (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users(id) on delete cascade,
  name       text not null default 'New Template',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.templates enable row level security;

create policy "Users can view own templates"
  on public.templates for select using (auth.uid() = user_id);
create policy "Users can insert own templates"
  on public.templates for insert with check (auth.uid() = user_id);
create policy "Users can update own templates"
  on public.templates for update using (auth.uid() = user_id);
create policy "Users can delete own templates"
  on public.templates for delete using (auth.uid() = user_id);

-- 3. Snippets table
create table public.snippets (
  id          uuid primary key default gen_random_uuid(),
  template_id uuid not null references public.templates(id) on delete cascade,
  category    snippet_category not null default 'Theme',
  label       text not null default 'New Snippet',
  text        text not null default '',
  active      boolean not null default true,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

alter table public.snippets enable row level security;

create policy "Users can view own snippets"
  on public.snippets for select
  using (exists (
    select 1 from public.templates where templates.id = snippets.template_id and templates.user_id = auth.uid()
  ));
create policy "Users can insert own snippets"
  on public.snippets for insert
  with check (exists (
    select 1 from public.templates where templates.id = snippets.template_id and templates.user_id = auth.uid()
  ));
create policy "Users can update own snippets"
  on public.snippets for update
  using (exists (
    select 1 from public.templates where templates.id = snippets.template_id and templates.user_id = auth.uid()
  ));
create policy "Users can delete own snippets"
  on public.snippets for delete
  using (exists (
    select 1 from public.templates where templates.id = snippets.template_id and templates.user_id = auth.uid()
  ));

-- 4. Placeholder values table
create table public.placeholder_values (
  id          uuid primary key default gen_random_uuid(),
  template_id uuid not null references public.templates(id) on delete cascade,
  user_id     uuid not null references auth.users(id) on delete cascade,
  key         text not null,
  value       text not null default '',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  unique (template_id, user_id, key)
);

alter table public.placeholder_values enable row level security;

create policy "Users can view own placeholder values"
  on public.placeholder_values for select using (auth.uid() = user_id);
create policy "Users can insert own placeholder values"
  on public.placeholder_values for insert with check (auth.uid() = user_id);
create policy "Users can update own placeholder values"
  on public.placeholder_values for update using (auth.uid() = user_id);
create policy "Users can delete own placeholder values"
  on public.placeholder_values for delete using (auth.uid() = user_id);

-- 5. Indexes for performance
create index idx_templates_user on public.templates(user_id);
create index idx_snippets_template on public.snippets(template_id);
create index idx_placeholder_values_template on public.placeholder_values(template_id, user_id);
