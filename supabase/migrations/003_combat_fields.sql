-- Migration: Add combat tracking fields
-- Run this in Supabase SQL Editor after 002

-- Death saves
ALTER TABLE public.characters
  ADD COLUMN IF NOT EXISTS death_save_successes int DEFAULT 0 NOT NULL;
ALTER TABLE public.characters
  ADD COLUMN IF NOT EXISTS death_save_failures int DEFAULT 0 NOT NULL;

-- Hit dice tracking
ALTER TABLE public.characters
  ADD COLUMN IF NOT EXISTS hit_dice_total int DEFAULT 1 NOT NULL;
ALTER TABLE public.characters
  ADD COLUMN IF NOT EXISTS hit_dice_remaining int DEFAULT 1 NOT NULL;

-- Attacks table (Name, Bonus, Type, Damage)
ALTER TABLE public.characters
  ADD COLUMN IF NOT EXISTS attacks jsonb DEFAULT '[]'::jsonb;
