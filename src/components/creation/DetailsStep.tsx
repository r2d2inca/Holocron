import { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { useCharacterStore } from '@/stores/characterStore'
import { raceData } from '@/lib/raceData'
import { classData } from '@/lib/classData'

export function DetailsStep() {
  const { draft, updateDraft, setStep } = useCharacterStore()
  const [newItem, setNewItem] = useState('')

  const race = raceData.find((r) => r.name === draft.race)
  const cls = classData.find((c) => c.name === draft.className)

  // Starting equipment comes from race + anything the player adds
  const raceEquipment = race?.equipment ?? []
  const playerEquipment = draft.equipment

  function addItem() {
    if (!newItem.trim()) return
    updateDraft({ equipment: [...playerEquipment, newItem.trim()] })
    setNewItem('')
  }

  function removeItem(index: number) {
    updateDraft({ equipment: playerEquipment.filter((_, i) => i !== index) })
  }

  return (
    <div className="max-w-xl">
      <div className="space-y-6">
        {/* Name */}
        <div>
          <label className="text-xs text-durasteel-400 uppercase tracking-wider block mb-2">
            Character Name
          </label>
          <input
            type="text"
            value={draft.name}
            onChange={(e) => updateDraft({ name: e.target.value })}
            placeholder="Enter character name..."
            className="w-full bg-hull-800 border border-hull-600 rounded-lg px-4 py-3 text-durasteel-100 placeholder-durasteel-500 focus:border-holo-500 focus:outline-none transition-colors"
          />
        </div>

        {/* Starting Equipment */}
        <div>
          <label className="text-xs text-durasteel-400 uppercase tracking-wider block mb-2">
            Starting Equipment
          </label>

          {/* Race equipment (auto-granted) */}
          {raceEquipment.length > 0 && (
            <div className="mb-3">
              <span className="text-xs text-durasteel-500 mb-1 block">From {race?.name}:</span>
              <div className="flex flex-wrap gap-2">
                {raceEquipment.map((item, i) => (
                  <span key={i} className="bg-hull-700 text-durasteel-300 text-xs px-2 py-1 rounded">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Class proficiency hint */}
          {cls && (
            <div className="mb-3">
              <span className="text-xs text-durasteel-500 mb-1 block">
                {cls.name} is proficient with: {cls.proficiencies.join(', ')}
                {cls.armorProficiencies.length > 0 && ` | Armor: ${cls.armorProficiencies.join(', ')}`}
              </span>
            </div>
          )}

          {/* Player-added equipment */}
          {playerEquipment.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {playerEquipment.map((item, i) => (
                <span key={i} className="group flex items-center gap-1 bg-hull-700 text-durasteel-300 text-xs px-2 py-1 rounded">
                  {item}
                  <button
                    onClick={() => removeItem(i)}
                    className="text-durasteel-500 hover:text-kyber-400 cursor-pointer"
                  >
                    <X size={10} />
                  </button>
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addItem()}
              placeholder="Add weapon, armor, gear..."
              className="flex-1 bg-hull-800 border border-hull-600 rounded-lg px-4 py-2 text-sm text-durasteel-100 placeholder-durasteel-500 focus:border-holo-500 focus:outline-none transition-colors"
            />
            <button
              onClick={addItem}
              disabled={!newItem.trim()}
              className="flex items-center gap-1 bg-hull-700 hover:bg-hull-600 disabled:opacity-40 disabled:cursor-not-allowed text-durasteel-200 text-sm px-3 py-2 rounded-lg transition-colors cursor-pointer"
            >
              <Plus size={14} /> Add
            </button>
          </div>
        </div>

        {/* Backstory */}
        <div>
          <label className="text-xs text-durasteel-400 uppercase tracking-wider block mb-2">
            Backstory
          </label>
          <textarea
            value={draft.backstory}
            onChange={(e) => updateDraft({ backstory: e.target.value })}
            placeholder="Tell us about your character's history..."
            rows={6}
            className="w-full bg-hull-800 border border-hull-600 rounded-lg px-4 py-3 text-durasteel-100 placeholder-durasteel-500 focus:border-holo-500 focus:outline-none transition-colors resize-none"
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <button
          onClick={() => setStep(2)}
          className="border border-durasteel-500 text-durasteel-200 hover:border-holo-500 px-6 py-3 rounded-lg transition-colors tracking-wide text-sm cursor-pointer"
        >
          Back
        </button>
        <button
          onClick={() => setStep(4)}
          disabled={!draft.name.trim()}
          className="bg-holo-500 hover:bg-holo-400 disabled:opacity-40 disabled:cursor-not-allowed text-hull-950 font-semibold px-6 py-3 rounded-lg transition-colors tracking-wide cursor-pointer"
        >
          Next: Review
        </button>
      </div>
    </div>
  )
}
