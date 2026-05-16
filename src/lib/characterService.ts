import { supabase } from './supabase'
import { raceData } from './raceData'
import { classData } from './classData'
import type { AbilityScores } from './types'

interface CreateCharacterInput {
  name: string
  race: string
  className: string
  secondClassName?: string
  abilityScores: AbilityScores
  backstory: string
  equipment?: string[]
}

export async function createCharacter(input: CreateCharacterInput) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const race = raceData.find((r) => r.name === input.race)
  const cls = classData.find((c) => c.name === input.className)
  if (!race || !cls) throw new Error('Invalid race or class')

  const maxHp = cls.hitPointsBase + Math.floor((input.abilityScores.constitution - 10) / 2)

  // Build multiclass data if second class is selected
  let classes = null
  let combinedProficiencies = [...cls.proficiencies]
  let combinedSavingThrows: string[] = [...cls.savingThrows]

  if (input.secondClassName) {
    const secondCls = classData.find((c) => c.name === input.secondClassName)
    if (secondCls) {
      classes = [
        {
          className: cls.name,
          currentRank: cls.startingRank,
          currentSubTier: 1,
          rankHistory: [],
        },
        {
          className: secondCls.name,
          currentRank: secondCls.startingRank,
          currentSubTier: 1,
          rankHistory: [],
        },
      ]
      // Merge proficiencies (no duplicates)
      secondCls.proficiencies.forEach((p) => {
        if (!combinedProficiencies.includes(p)) combinedProficiencies.push(p)
      })
      // Merge saving throws (no duplicates)
      secondCls.savingThrows.forEach((s) => {
        if (!combinedSavingThrows.includes(s)) combinedSavingThrows.push(s)
      })
    }
  }

  const row: Record<string, unknown> = {
    user_id: user.id,
    name: input.name,
    race: race.name,
    race_category: race.category,
    class_name: cls.name,
    current_rank: cls.startingRank,
    strength: input.abilityScores.strength,
    dexterity: input.abilityScores.dexterity,
    constitution: input.abilityScores.constitution,
    intelligence: input.abilityScores.intelligence,
    wisdom: input.abilityScores.wisdom,
    charisma: input.abilityScores.charisma,
    hp: maxHp,
    max_hp: maxHp,
    speed: race.speed,
    size: race.size,
    alignment: race.alignment,
    languages: race.languages,
    racial_abilities: race.abilities,
    saving_throws: combinedSavingThrows,
    proficiencies: combinedProficiencies,
    equipment: [...race.equipment, ...(input.equipment ?? [])],
    backstory: input.backstory,
  }

  // Include multiclass and sub-tier tracking
  row.current_sub_tier = 1
  if (classes) {
    row.classes = classes
  }

  const { data, error } = await supabase
    .from('characters')
    .insert(row)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getCharacters() {
  const { data, error } = await supabase
    .from('characters')
    .select('*')
    .eq('is_active', true)
    .order('updated_at', { ascending: false })

  if (error) throw error
  return data
}

export async function getCharacter(id: string) {
  const { data, error } = await supabase
    .from('characters')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

export async function updateCharacter(id: string, updates: Record<string, unknown>) {
  const { data, error } = await supabase
    .from('characters')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteCharacter(id: string) {
  const { error } = await supabase
    .from('characters')
    .delete()
    .eq('id', id)

  if (error) throw error
}
