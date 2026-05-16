import { useState } from 'react'
import { useCharacterStore } from '@/stores/characterStore'
import { classData } from '@/lib/classData'
import { Plus, X } from 'lucide-react'
import type { ClassData, ClassName } from '@/lib/types'

export function ClassStep() {
  const { draft, updateDraft, setStep } = useCharacterStore()
  const [selected, setSelected] = useState<ClassData | null>(
    draft.className ? classData.find((c) => c.name === draft.className) ?? null : null
  )
  const [secondSelected, setSecondSelected] = useState<ClassData | null>(
    draft.secondClassName ? classData.find((c) => c.name === draft.secondClassName) ?? null : null
  )
  const [showMulticlass, setShowMulticlass] = useState(!!draft.secondClassName)

  function handleNext() {
    if (!selected) return
    updateDraft({
      className: selected.name,
      secondClassName: secondSelected?.name ?? null,
    })
    setStep(2)
  }

  function removeSecondClass() {
    setSecondSelected(null)
    setShowMulticlass(false)
  }

  // Filter out the primary class from second class options
  const secondClassOptions = classData.filter((c) => c.name !== selected?.name)

  return (
    <div>
      {/* Primary Class */}
      <div className="mb-2">
        <h3 className="text-xs text-durasteel-400 uppercase tracking-wider mb-3">Primary Class</h3>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Class list */}
        <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-2">
          {classData.map((cls) => (
            <button
              key={cls.name}
              onClick={() => {
                setSelected(cls)
                // If second class is the same, clear it
                if (secondSelected?.name === cls.name) {
                  setSecondSelected(null)
                }
              }}
              className={`p-4 rounded-lg text-left transition-colors border cursor-pointer ${
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
                <Row label="Skills" value={selected.skillAccess.length > 0 ? `Pick ${selected.skillPicks} from: ${selected.skillAccess.join(', ')}` : `Pick ${selected.skillPicks}`} />
                <Row label="Starting Rank" value={selected.startingRank} />
              </div>
            </>
          ) : (
            <p className="text-durasteel-500 text-sm">Select a class to view details</p>
          )}
        </div>
      </div>

      {/* Multiclass Section */}
      <div className="mt-8">
        {!showMulticlass ? (
          <button
            onClick={() => setShowMulticlass(true)}
            disabled={!selected}
            className="flex items-center gap-2 text-sm text-durasteel-400 hover:text-holo-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer border border-hull-600 hover:border-holo-500/30 rounded-lg px-4 py-3"
          >
            <Plus size={14} /> Add Second Class (Multiclass)
          </button>
        ) : (
          <div className="bg-hull-800/50 border border-hull-600 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs text-aurodium-400 uppercase tracking-wider">Second Class (Optional)</h3>
              <button
                onClick={removeSecondClass}
                className="text-durasteel-500 hover:text-kyber-400 transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {secondClassOptions.map((cls) => (
                <button
                  key={cls.name}
                  onClick={() => setSecondSelected(cls)}
                  className={`p-3 rounded-lg text-left transition-colors border cursor-pointer ${
                    secondSelected?.name === cls.name
                      ? 'bg-aurodium-500/10 border-aurodium-500 text-aurodium-300'
                      : 'bg-hull-800 border-hull-600 text-durasteel-200 hover:border-durasteel-400'
                  }`}
                >
                  <div className="font-semibold text-xs">{cls.name}</div>
                  <div className="text-xs text-durasteel-500 mt-0.5">
                    {cls.startingRank}
                  </div>
                </button>
              ))}
            </div>

            {secondSelected && (
              <div className="mt-3 bg-hull-700 rounded-lg p-3 text-xs">
                <div className="text-aurodium-400 font-medium mb-1">{secondSelected.name}</div>
                <p className="text-durasteel-400 leading-relaxed">{secondSelected.description}</p>
                <div className="mt-2 text-durasteel-500">
                  Starts at: <span className="text-durasteel-300">{secondSelected.startingRank}</span> &middot;
                  Hit Die: <span className="text-durasteel-300">{secondSelected.hitDie}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <button
          onClick={() => setStep(0)}
          className="border border-durasteel-500 text-durasteel-200 hover:border-holo-500 px-6 py-3 rounded-lg transition-colors tracking-wide text-sm cursor-pointer"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={!selected}
          className="bg-holo-500 hover:bg-holo-400 disabled:opacity-40 disabled:cursor-not-allowed text-hull-950 font-semibold px-6 py-3 rounded-lg transition-colors tracking-wide cursor-pointer"
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
