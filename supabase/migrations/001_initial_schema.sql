-- Holocron: Remnants Companion App — Initial Schema
-- Run this in Supabase SQL Editor

-- ─── PROFILES ───
-- Extends Supabase auth.users with app-specific data
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique not null,
  display_name text,
  role text check (role in ('player', 'dm', 'both')) default 'player',
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

alter table public.profiles enable row level security;

create policy "Users can view all profiles"
  on public.profiles for select
  using (true);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- ─── CAMPAIGNS ───
create table public.campaigns (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text default '',
  dm_id uuid references public.profiles(id) on delete set null,
  setting text default 'Remnants',
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

alter table public.campaigns enable row level security;

create policy "Anyone can view campaigns they belong to"
  on public.campaigns for select
  using (
    dm_id = auth.uid()
    or id in (
      select campaign_id from public.characters where user_id = auth.uid()
    )
  );
-- NOTE: This policy was replaced due to infinite recursion. See fix below.

create policy "DM can update own campaigns"
  on public.campaigns for update
  using (dm_id = auth.uid());

create policy "Any user can create campaigns"
  on public.campaigns for insert
  with check (dm_id = auth.uid());

create policy "DM can delete own campaigns"
  on public.campaigns for delete
  using (dm_id = auth.uid());

-- ─── CHARACTERS ───
create table public.characters (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  campaign_id uuid references public.campaigns(id) on delete set null,
  name text not null,

  -- Race & Class
  race text not null,
  race_category text check (race_category in ('Organic', 'Droid')) not null,
  class_name text not null,
  current_rank text not null,
  rank_history jsonb default '[]'::jsonb,

  -- Ability Scores
  strength int default 10 not null,
  dexterity int default 10 not null,
  constitution int default 10 not null,
  intelligence int default 10 not null,
  wisdom int default 10 not null,
  charisma int default 10 not null,

  -- Combat Stats
  hp int not null,
  max_hp int not null,
  temp_hp int default 0 not null,
  ac int default 10 not null,
  speed int default 30 not null,
  size text default 'Medium' not null,

  -- Force & Lightsaber
  force_slots int default 0 not null,
  force_abilities jsonb default '[]'::jsonb,
  lightsaber_forms jsonb default '[]'::jsonb,
  night_sister_magic jsonb default '[]'::jsonb,

  -- Skills & Proficiencies
  skills jsonb default '[]'::jsonb,
  proficiencies jsonb default '[]'::jsonb,
  saving_throws jsonb default '[]'::jsonb,

  -- Equipment & Inventory
  equipment jsonb default '[]'::jsonb,
  weapons jsonb default '[]'::jsonb,
  armor text default '',
  shield text default '',
  credits int default 0 not null,

  -- Character Details
  backstory text default '',
  alignment text default 'N/A',
  languages jsonb default '[]'::jsonb,
  racial_abilities jsonb default '[]'::jsonb,
  class_abilities jsonb default '[]'::jsonb,

  -- Connections (Scoundrel class feature)
  connections jsonb default '[]'::jsonb,

  -- Reputation (Bounty Hunter class feature)
  reputation_level int default 0,

  -- Influence Tokens (Senator class feature)
  influence_tokens int default 0,

  -- Notes
  notes text default '',

  -- Metadata
  is_active boolean default true not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

alter table public.characters enable row level security;

create policy "Users can view own characters"
  on public.characters for select
  using (user_id = auth.uid());

create policy "DM can view campaign characters"
  on public.characters for select
  using (
    campaign_id in (
      select id from public.campaigns where dm_id = auth.uid()
    )
  );

create policy "Users can create own characters"
  on public.characters for insert
  with check (user_id = auth.uid());

create policy "Users can update own characters"
  on public.characters for update
  using (user_id = auth.uid());

create policy "Users can delete own characters"
  on public.characters for delete
  using (user_id = auth.uid());

-- ─── COOLDOWN TRACKER ───
-- Tracks force ability / lightsaber form cooldowns per character
create table public.cooldowns (
  id uuid default gen_random_uuid() primary key,
  character_id uuid references public.characters(id) on delete cascade not null,
  ability_name text not null,
  ability_type text check (ability_type in ('force', 'lightsaber_form', 'night_sister', 'class', 'racial')) not null,
  uses_remaining int default 0 not null,
  max_uses int default 1 not null,
  reset_on text check (reset_on in ('short_rest', 'long_rest', 'campaign_arc', 'campaign', 'never')) default 'long_rest',
  is_active boolean default false,
  created_at timestamptz default now() not null
);

alter table public.cooldowns enable row level security;

create policy "Users can manage own character cooldowns"
  on public.cooldowns for all
  using (
    character_id in (
      select id from public.characters where user_id = auth.uid()
    )
  );

-- ─── AUTO-UPDATE TIMESTAMPS ───
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.handle_updated_at();

create trigger campaigns_updated_at
  before update on public.campaigns
  for each row execute function public.handle_updated_at();

create trigger characters_updated_at
  before update on public.characters
  for each row execute function public.handle_updated_at();

-- ─── AUTO-CREATE PROFILE ON SIGNUP ───
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1))
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
