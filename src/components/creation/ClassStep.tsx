import { useState } from 'react'
import { useCharacterStore } from '@/stores/characterStore'
import { classData } from '@/lib/classData'
import type { ClassData, ClassName } from '@/lib/types'

export function ClassStep() {
  const { draft, updateDraft, setStep } = useCharacterStore()
  const [selected, setSelected] = useState<ClassData | null>(
    draft.className ? classData.find((c) => c.name === draft.className) ?? null : null
  )

  function handleNext() {
    if (!selected) return
    updateDraft({ className: selected.name })
    setStep(2)
  }

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Class list */}
        <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-2">
          {classData.map((cls) => (
            <button
              key={cls.name}
              onClick={() => setSelected(cls)}
              className={`p-4 rounded-lg text-left transition-colors border ${
                selected?.name === cls.name
                  ? 'bg-holo-500/10 border-holo-500 text-holo-300'
                  : 'bg-hull-800 border-hull-600 text-durasteel-200 hover:border-durasteel-400'
              }`}
            >
              <div className="font-semibold text-sm">{cls.name}</div>
              <div className="text-xs text-durasteel-400 mt-1">
                {cls.hitDie} &middot; {cls.startingRank}
              </div>
            </button>
          ))}
        </div>

        {/* Class detail panel */}
        <div className="bg-hull-800 border border-hull-600 rounded-lg p-5 h-fit sticky top-4">
          {selected ? (
            <>
              <h3 className="font-display text-lg text-holo-400 tracking-wider mb-2">
                {selected.name}
              </h3>
              <p className="text-xs text-durasteel-300 mb-4 leading-relaxed">
                {selected.description}
              </p>
              <div className="space-y-2 text-sm">
                <Row label="HP at Rank 1" value={`${selected.hitPointsBase} + Con`} />
                <Row label="Hit Die" value={selected.hitDie} />
                <Row label="Saving Throws" value={selected.savingThrows.map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(', ')} />
                <Row label="Proficiencies" value={selected.proficiencies.join(', ')} />
                {selected.armorProficiencies.length > 0 && (
                  <Row label="Armor" value={selected.armorProficiencies.join(', ')} />
                )}
                <Row label="Skills" value={`Pick ${selected.skillPicks} from: ${selected.skillAccess.join(', ')}`} />
                <Row label="Starting Rank" value={selected.startingRank} />
              </div>
            </>
          ) : (
            <p className="text-durasteel-500 text-sm">Select a class to view details</p>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <button
          onClick={() => setStep(0)}
          className="border border-durasteel-500 text-durasteel-200 hover:border-holo-500 px-6 py-3 rounded-lg transition-colors tracking-wide text-sm"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={!selected}
          className="bg-holo-500 hover:bg-holo-400 disabled:opacity-40 disabled:cursor-not-allowed text-hull-950 font-semibold px-6 py-3 rounded-lg transition-colors tracking-wide"
        >
          Next: Abilities
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
