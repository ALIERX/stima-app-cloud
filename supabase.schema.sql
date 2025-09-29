-- Supabase SQL to create a simple 'assets' table for STIMA MVP

create extension if not exists "uuid-ossp";

create table if not exists public.assets (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  category text not null,
  brand text,
  name text,
  year int,
  declared_value_eur numeric,
  description text,
  image text -- base64 or URL (MVP)
);

alter table public.assets enable row level security;

create policy "assets are readable by anyone"
  on public.assets for select
  using (true);

create policy "insert assets with anon key"
  on public.assets for insert
  with check (true);
