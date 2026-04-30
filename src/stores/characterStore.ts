import { create } from 'zustand'
import type { Race, ClassName, AbilityScores } from '@/lib/types'

interface CharacterDraft {
  name: string
  race: Race | null
  className: ClassName | null
  abilityScores: AbilityScores
  skills: string[]
  equipment: string[]
  backstory: string
}

interface CharacterStore {
  draft: CharacterDraft
  step: number
  setStep: (step: number) => void
  updateDraft: (updates: Partial<CharacterDraft>) => void
  resetDraft: () => void
}

const initialDraft: CharacterDraft = {
  name: '',
  race: null,
  className: null,
  abilityScores: {
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10,
  },
  skills: [],
  equipment: [],
  backstory: '',
}

export const useCharacterStore = create<CharacterStore>((set) => ({
  draft: { ...initialDraft },
  step: 0,
  setStep: (step) => set({ step }),
  updateDraft: (updates) =>
    set((state) => ({ draft: { ...state.draft, ...updates } })),
  resetDraft: () => set({ draft: { ...initialDraft }, step: 0 }),
}))
