import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useCharacterStore } from '@/stores/characterStore'
import { raceData } from '@/lib/raceData'
import { classData } from '@/lib/classData'
import { createCharacter } from '@/lib/characterService'

export function ReviewStep() {
  const { draft, setStep, resetDraft } = useCharacterStore()
  const navigate = useNavigate()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const race = raceData.find((r) => r.name === draft.race)
  const cls = classData.find((c) => c.name === draft.className)
  const secondCls = draft.secondClassName ? classData.find((c) => c.name === draft.secondClassName) : null

  async function handleCreate() {
    if (!draft.race || !draft.className) return
    setSaving(true)
    setError('')
    try {
      await createCharacter({
        name: draft.name,
        race: draft.race!,
        className: draft.className!,
        secondClassName: draft.secondClassName ?? undefined,
        abilityScores: draft.abilityScores,
        backstory: draft.backstory,
      })
      resetDraft()
      navigate('/dashboard')
    } catch (err: any) {
      console.error('Character save error:', err)
      const msg = err?.message || err?.details || JSON.stringify(err)
      setError(msg)
      setSaving(false)
    }
  }

  return (
    <div className="max-w-xl">
      <div className="bg-hull-800 border border-hull-600 rounded-lg p-6 space-y-4">
        <h3 className="font-display text-xl text-holo-400 tracking-wider">
          {draft.name || 'Unnamed Character'}
        </h3>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-durasteel-400 text-xs uppercase tracking-wider block">Race</span>
            <p className="text-durasteel-100">{race?.name ?? '—'}</p>
          </div>
          <div>
            <span className="text-durasteel-400 text-xs uppercase tracking-wider block">Primary Class</span>
            <p className="text-durasteel-100">{cls?.name ?? '—'}</p>
          </div>
          <div>
            <span className="text-durasteel-400 text-xs uppercase tracking-wider block">Starting Rank</span>
            <p className="text-durasteel-100">{cls?.startingRank ?? '—'}</p>
          </div>
          {secondCls && (
            <div>
              <span className="text-aurodium-400 text-xs uppercase tracking-wider block">Second Class</span>
              <p className="text-durasteel-100">{secondCls.name} ({secondCls.startingRank})</p>
            </div>
          )}
          <div>
            <span className="text-durasteel-400 text-xs uppercase tracking-wider block">Size / Speed</span>
            <p className="text-durasteel-100">
              {race ? `${race.size} / ${race.speed} ft` : '—'}
            </p>
          </div>
        </div>

        {/* Ability scores */}
        <div>
          <span className="text-durasteel-400 text-xs uppercase tracking-wider block mb-2">
            Ability Scores
          </span>
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(draft.abilityScores).map(([key, val]) => (
              <div key={key} className="bg-hull-700 rounded p-2 text-center">
                <span className="text-xs text-durasteel-400 uppercase">{key.slice(0, 3)}</span>
                <p className="text-lg font-bold text-durasteel-100">{val}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Backstory */}
        {draft.backstory && (
          <div>
            <span className="text-durasteel-400 text-xs uppercase tracking-wider block mb-1">
              Backstory
            </span>
            <p className="text-durasteel-300 text-sm whitespace-pre-wrap">{draft.backstory}</p>
          </div>
        )}
      </div>

      {error && (
        <p className="text-kyber-400 text-sm mt-4">{error}</p>
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <button
          onClick={() => setStep(3)}
          className="border border-durasteel-500 text-durasteel-200 hover:border-holo-500 px-6 py-3 rounded-lg transition-colors tracking-wide text-sm cursor-pointer"
        >
          Back
        </button>
        <button
          onClick={handleCreate}
          disabled={saving}
          className="bg-plasma-500 hover:bg-plasma-400 disabled:opacity-50 text-hull-950 font-semibold px-6 py-3 rounded-lg transition-colors tracking-wide cursor-pointer"
        >
          {saving ? 'Saving...' : 'Create Character'}
        </button>
      </div>
    </div>
  )
}
