import { useState } from 'react'
import { useCharacterStore } from '@/stores/characterStore'
import { raceData, organicRaces, droidRaces } from '@/lib/raceData'
import type { Race, RaceData } from '@/lib/types'

export function RaceStep() {
  const { draft, updateDraft, setStep } = useCharacterStore()
  const [tab, setTab] = useState<'Organic' | 'Droid'>('Organic')
  const [selected, setSelected] = useState<RaceData | null>(
    draft.race ? raceData.find((r) => r.name === draft.race) ?? null : null
  )

  const races = tab === 'Organic' ? organicRaces : droidRaces

  function handleNext() {
    if (!selected) return
    updateDraft({ race: selected.name })
    setStep(1)
  }

  return (
    <div>
      {/* Category tabs */}
      <div className="flex gap-2 mb-6">
        {(['Organic', 'Droid'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setTab(cat)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold tracking-wider transition-colors ${
              tab === cat
                ? 'bg-holo-500 text-hull-950'
                : 'bg-hull-800 text-durasteel-300 hover:bg-hull-700'
            }`}
          >
            {cat}s
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Race list */}
        <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-2">
          {races.map((race) => (
            <button
              key={race.name}
              onClick={() => setSelected(race)}
              className={`p-3 rounded-lg text-left text-sm transition-colors border ${
                selected?.name === race.name
                  ? 'bg-holo-500/10 border-holo-500 text-holo-300'
                  : 'bg-hull-800 border-hull-600 text-durasteel-200 hover:border-durasteel-400'
              }`}
            >
              <div className="font-semibold">{race.name}</div>
              <div className="text-xs text-durasteel-400 mt-1">
                {race.size} &middot; {race.speed} ft
              </div>
            </button>
          ))}
        </div>

        {/* Race detail panel */}
        <div className="bg-hull-800 border border-hull-600 rounded-lg p-5 h-fit sticky top-4">
          {selected ? (
            <>
              <h3 className="font-display text-lg text-holo-400 tracking-wider mb-3">
                {selected.name}
              </h3>
              <div className="space-y-2 text-sm text-durasteel-200">
                <Row label="Size" value={selected.size} />
                <Row label="Speed" value={`${selected.speed} ft`} />
                <Row label="Alignment" value={selected.alignment} />
                <Row label="Life Span" value={selected.lifeSpan} />
                <Row
                  label="Ability Bonuses"
                  value={Object.entries(selected.abilityScoreBonus)
                    .map(([k, v]) => `+${v} ${k.charAt(0).toUpperCase() + k.slice(1)}`)
                    .join(', ')}
                />
                <Row label="Languages" value={selected.languages.join(', ')} />
                {selected.abilities.length > 0 && (
                  <div>
                    <span className="text-durasteel-400 text-xs uppercase tracking-wider">
                      Abilities
                    </span>
                    <ul className="mt-1 space-y-1">
                      {selected.abilities.map((a) => (
                        <li key={a} className="text-xs text-durasteel-300">{a}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {selected.equipment.length > 0 && (
                  <Row label="Equipment" value={selected.equipment.join(', ')} />
                )}
              </div>
            </>
          ) : (
            <p className="text-durasteel-500 text-sm">Select a race to view details</p>
          )}
        </div>
      </div>

      {/* Next button */}
      <div className="flex justify-end mt-8">
        <button
          onClick={handleNext}
          disabled={!selected}
          className="bg-holo-500 hover:bg-holo-400 disabled:opacity-40 disabled:cursor-not-allowed text-hull-950 font-semibold px-6 py-3 rounded-lg transition-colors tracking-wide"
        >
          Next: Class
        </button>
      </div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-durasteel-400 text-xs uppercase tracking-wider">{label}</span>
      <p className="text-durasteel-100">{value}</p>
    </div>
  )
}
