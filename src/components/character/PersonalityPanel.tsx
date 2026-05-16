import { useState } from 'react'
import { Pencil, Check } from 'lucide-react'

interface PersonalityPanelProps {
  character: any
  onUpdate: (updates: Record<string, unknown>) => void
}

export function PersonalityPanel({ character, onUpdate }: PersonalityPanelProps) {
  const [notes, setNotes] = useState(character.notes ?? '')
  const [backstory, setBackstory] = useState(character.backstory ?? '')
  const [editingName, setEditingName] = useState(false)
  const [nameValue, setNameValue] = useState(character.name)
  const [dirty, setDirty] = useState(false)

  function save() {
    onUpdate({ notes, backstory })
    setDirty(false)
  }

  function saveName() {
    if (nameValue.trim()) {
      onUpdate({ name: nameValue.trim() })
    }
    setEditingName(false)
  }

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Character info */}
      <div className="bg-hull-800 border border-hull-600 rounded-lg p-4">
        <h3 className="text-xs text-durasteel-400 uppercase tracking-wider mb-3">Character Info</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="col-span-2">
            <span className="text-durasteel-500">Name</span>
            {editingName ? (
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="text"
                  value={nameValue}
                  onChange={(e) => setNameValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && saveName()}
                  className="flex-1 bg-hull-900 border border-hull-600 rounded px-3 py-1.5 text-sm text-durasteel-100 focus:border-holo-500 focus:outline-none"
                  autoFocus
                />
                <button onClick={saveName} className="text-plasma-400 hover:text-plasma-300 cursor-pointer">
                  <Check size={14} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <p className="text-durasteel-100">{character.name}</p>
                <button onClick={() => setEditingName(true)} className="text-durasteel-500 hover:text-holo-400 cursor-pointer">
                  <Pencil size={12} />
                </button>
              </div>
            )}
          </div>
          <div>
            <span className="text-durasteel-500">Race</span>
            <p className="text-durasteel-100">{character.race}</p>
          </div>
          <div>
            <span className="text-durasteel-500">Class</span>
            <p className="text-durasteel-100">{character.class_name}</p>
          </div>
          <div>
            <span className="text-durasteel-500">Current Rank</span>
            <p className="text-durasteel-100">{character.current_rank}</p>
          </div>
          <div>
            <span className="text-durasteel-500">Alignment</span>
            <p className="text-durasteel-100">{character.alignment}</p>
          </div>
          <div>
            <span className="text-durasteel-500">Size</span>
            <p className="text-durasteel-100">{character.size}</p>
          </div>
          <div>
            <span className="text-durasteel-500">Race Category</span>
            <p className="text-durasteel-100">{character.race_category}</p>
          </div>
        </div>
      </div>

      {/* Backstory */}
      <div className="bg-hull-800 border border-hull-600 rounded-lg p-4">
        <h3 className="text-xs text-durasteel-400 uppercase tracking-wider mb-3">Backstory</h3>
        <textarea
          value={backstory}
          onChange={(e) => { setBackstory(e.target.value); setDirty(true) }}
          rows={6}
          className="w-full bg-hull-900 border border-hull-600 rounded-lg px-4 py-3 text-durasteel-200 text-sm placeholder-durasteel-500 focus:border-holo-500 focus:outline-none transition-colors resize-none"
          placeholder="Write your character's backstory..."
        />
      </div>

      {/* Notes */}
      <div className="bg-hull-800 border border-hull-600 rounded-lg p-4">
        <h3 className="text-xs text-durasteel-400 uppercase tracking-wider mb-3">Session Notes</h3>
        <textarea
          value={notes}
          onChange={(e) => { setNotes(e.target.value); setDirty(true) }}
          rows={6}
          className="w-full bg-hull-900 border border-hull-600 rounded-lg px-4 py-3 text-durasteel-200 text-sm placeholder-durasteel-500 focus:border-holo-500 focus:outline-none transition-colors resize-none"
          placeholder="Track session notes, quest info, NPCs..."
        />
      </div>

      {dirty && (
        <button
          onClick={save}
          className="bg-holo-500 hover:bg-holo-400 text-hull-950 font-semibold px-6 py-2 rounded-lg transition-colors tracking-wide text-sm cursor-pointer"
        >
          Save Changes
        </button>
      )}
    </div>
  )
}
