import { useCharacterStore } from '@/stores/characterStore'
import type { AbilityName } from '@/lib/types'

const ABILITIES: { key: AbilityName; label: string }[] = [
  { key: 'strength', label: 'Strength' },
  { key: 'dexterity', label: 'Dexterity' },
  { key: 'constitution', label: 'Constitution' },
  { key: 'intelligence', label: 'Intelligence' },
  { key: 'wisdom', label: 'Wisdom' },
  { key: 'charisma', label: 'Charisma' },
]

function modifier(score: number): string {
  const mod = Math.floor((score - 10) / 2)
  return mod >= 0 ? `+${mod}` : `${mod}`
}

export function AbilityStep() {
  const { draft, updateDraft, setStep } = useCharacterStore()
  const scores = draft.abilityScores

  function setScore(key: AbilityName, value: number) {
    updateDraft({
      abilityScores: { ...scores, [key]: Math.max(1, Math.min(20, value)) },
    })
  }

  return (
    <div>
      <p className="text-durasteel-300 text-sm mb-6">
        Set your ability scores. Standard array: 15, 14, 13, 12, 10, 8 — or use your DM's method.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-xl">
        {ABILITIES.map(({ key, label }) => (
          <div
            key={key}
            className="bg-hull-800 border border-hull-600 rounded-lg p-4 text-center"
          >
            <label className="text-xs text-durasteel-400 uppercase tracking-wider block mb-2">
              {label}
            </label>
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => setScore(key, scores[key] - 1)}
                className="w-8 h-8 rounded bg-hull-700 text-durasteel-200 hover:bg-hull-600 transition-colors text-lg font-bold"
              >
                -
              </button>
              <span className="text-2xl font-bold text-durasteel-100 w-10 text-center">
                {scores[key]}
              </span>
              <button
                onClick={() => setScore(key, scores[key] + 1)}
                className="w-8 h-8 rounded bg-hull-700 text-durasteel-200 hover:bg-hull-600 transition-colors text-lg font-bold"
              >
                +
              </button>
            </div>
            <span className="text-holo-400 text-sm font-mono mt-1 block">
              {modifier(scores[key])}
            </span>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <button
          onClick={() => setStep(1)}
          className="border border-durasteel-500 text-durasteel-200 hover:border-holo-500 px-6 py-3 rounded-lg transition-colors tracking-wide text-sm"
        >
          Back
        </button>
        <button
          onClick={() => setStep(3)}
          className="bg-holo-500 hover:bg-holo-400 text-hull-950 font-semibold px-6 py-3 rounded-lg transition-colors tracking-wide"
        >
          Next: Details
        </button>
      </div>
    </div>
  )
}
