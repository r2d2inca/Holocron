import { useCharacterStore } from '@/stores/characterStore'
import { raceData } from '@/lib/raceData'
import { classData } from '@/lib/classData'

export function ReviewStep() {
  const { draft, setStep } = useCharacterStore()
  const race = raceData.find((r) => r.name === draft.race)
  const cls = classData.find((c) => c.name === draft.className)

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
            <span className="text-durasteel-400 text-xs uppercase tracking-wider block">Class</span>
            <p className="text-durasteel-100">{cls?.name ?? '—'}</p>
          </div>
          <div>
            <span className="text-durasteel-400 text-xs uppercase tracking-wider block">Starting Rank</span>
            <p className="text-durasteel-100">{cls?.startingRank ?? '—'}</p>
          </div>
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

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <button
          onClick={() => setStep(3)}
          className="border border-durasteel-500 text-durasteel-200 hover:border-holo-500 px-6 py-3 rounded-lg transition-colors tracking-wide text-sm"
        >
          Back
        </button>
        <button
          onClick={() => {
            // TODO: Save to Supabase
            alert('Character saved! (Supabase integration coming soon)')
          }}
          className="bg-plasma-500 hover:bg-plasma-400 text-hull-950 font-semibold px-6 py-3 rounded-lg transition-colors tracking-wide"
        >
          Create Character
        </button>
      </div>
    </div>
  )
}
