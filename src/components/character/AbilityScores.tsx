import { useState } from 'react'
import { Pencil, Check, X } from 'lucide-react'

const ABILITIES = [
  { key: 'strength', label: 'STR' },
  { key: 'dexterity', label: 'DEX' },
  { key: 'constitution', label: 'CON' },
  { key: 'intelligence', label: 'INT' },
  { key: 'wisdom', label: 'WIS' },
  { key: 'charisma', label: 'CHA' },
] as const

function modifier(score: number): string {
  const mod = Math.floor((score - 10) / 2)
  return mod >= 0 ? `+${mod}` : `${mod}`
}

interface AbilityScoresProps {
  character: any
  onUpdate: (updates: Record<string, unknown>) => void
}

export function AbilityScores({ character, onUpdate }: AbilityScoresProps) {
  const [editing, setEditing] = useState(false)
  const [scores, setScores] = useState<Record<string, number>>({})

  function startEdit() {
    const current: Record<string, number> = {}
    ABILITIES.forEach(({ key }) => { current[key] = character[key] })
    setScores(current)
    setEditing(true)
  }

  function save() {
    onUpdate(scores)
    setEditing(false)
  }

  function cancel() {
    setEditing(false)
  }

  return (
    <div className="bg-hull-800 border border-hull-600 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs text-durasteel-400 uppercase tracking-wider">Ability Scores</h3>
        {!editing ? (
          <button onClick={startEdit} className="text-durasteel-500 hover:text-holo-400 transition-colors cursor-pointer">
            <Pencil size={14} />
          </button>
        ) : (
          <div className="flex items-center gap-1">
            <button onClick={save} className="text-plasma-400 hover:text-plasma-300 transition-colors cursor-pointer">
              <Check size={16} />
            </button>
            <button onClick={cancel} className="text-kyber-400 hover:text-kyber-300 transition-colors cursor-pointer">
              <X size={16} />
            </button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-3 gap-3">
        {ABILITIES.map(({ key, label }) => (
          <div key={key} className="bg-hull-700 rounded-lg p-3 text-center">
            <div className="text-xs text-durasteel-400 tracking-wider mb-1">{label}</div>
            {editing ? (
              <input
                type="number"
                value={scores[key]}
                onChange={(e) => setScores({ ...scores, [key]: parseInt(e.target.value) || 0 })}
                className="w-full text-center text-2xl font-bold bg-hull-900 border border-hull-500 rounded px-1 py-0.5 text-durasteel-100 focus:border-holo-500 focus:outline-none"
                min={1}
                max={30}
              />
            ) : (
              <div className="text-2xl font-bold text-durasteel-100">{character[key]}</div>
            )}
            <div className="text-sm font-mono text-holo-400">
              {modifier(editing ? scores[key] : character[key])}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
