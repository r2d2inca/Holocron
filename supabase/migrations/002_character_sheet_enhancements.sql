-- Migration: Character sheet enhancements for full player interactivity
-- Run this in Supabase SQL Editor after 001_initial_schema.sql

-- Track force slot usage (how many are currently spent)
ALTER TABLE public.characters
  ADD COLUMN IF NOT EXISTS force_slots_used int DEFAULT 0 NOT NULL;

-- Custom features added by players (with use-tracking)
ALTER TABLE public.characters
  ADD COLUMN IF NOT EXISTS custom_features jsonb DEFAULT '[]'::jsonb;

-- Sub-tier tracking within a rank (e.g. Acolyte I, II, III)
ALTER TABLE public.characters
  ADD COLUMN IF NOT EXISTS current_sub_tier int DEFAULT 1 NOT NULL;

-- Multiclass support: array of class progressions
-- When null, character is single-class (uses class_name/current_rank/current_sub_tier/rank_history)
-- When populated, each entry tracks: className, currentRank, currentSubTier, rankHistory
ALTER TABLE public.characters
  ADD COLUMN IF NOT EXISTS classes jsonb DEFAULT NULL;

-- Ensure AC defaults are reasonable
ALTER TABLE public.characters
  ALTER COLUMN ac SET DEFAULT 10;
