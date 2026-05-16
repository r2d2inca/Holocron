import { useState } from 'react'
import { Plus, X, Swords } from 'lucide-react'

interface Attack {
  name: string
  bonus: string
  type: string
  damage?: string
}

interface AttacksPanelProps {
  character: any
  onUpdate: (updates: Record<string, unknown>) => void
}

export function AttacksPanel({ character, onUpdate }: AttacksPanelProps) {
  const [showAdd, setShowAdd] = useState(false)
  const [newAttack, setNewAttack] = useState<Attack>({ name: '', bonus: '', type: '', damage: '' })
  const attacks: Attack[] = character.attacks ?? []

  function addAttack() {
    if (!newAttack.name.trim()) return
    onUpdate({ attacks: [...attacks, { ...newAttack, name: newAttack.name.trim() }] })
    setNewAttack({ name: '', bonus: '', type: '', damage: '' })
    setShowAdd(false)
  }

  function removeAttack(index: number) {
    onUpdate({ attacks: attacks.filter((_, i) => i !== index) })
  }

  return (
    <div className="bg-hull-800 border border-hull-600 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Swords size={14} className="text-kyber-400" />
          <h3 className="text-xs text-durasteel-400 uppercase tracking-wider">Attacks / Action Abilities</h3>
        </div>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="text-durasteel-500 hover:text-holo-400 transition-colors cursor-pointer"
        >
          <Plus size={14} />
        </button>
      </div>

      {/* Header row */}
      {attacks.length > 0 && (
        <div className="grid grid-cols-12 gap-2 mb-1 text-xs text-durasteel-500 uppercase tracking-wider px-2">
          <div className="col-span-4">Name</div>
          <div className="col-span-2">Bonus</div>
          <div className="col-span-3">Type</div>
          <div className="col-span-3">Damage</div>
        </div>
      )}

      {/* Attack rows */}
      <div className="space-y-1">
        {attacks.map((attack, i) => (
          <div key={i} className="grid grid-cols-12 gap-2 bg-hull-700 rounded p-2 items-center group">
            <div className="col-span-4 text-sm text-durasteel-200 font-medium truncate">{attack.name}</div>
            <div className="col-span-2 font-mono text-sm text-holo-400">{attack.bonus}</div>
            <div className="col-span-3 text-xs text-durasteel-400">{attack.type}</div>
            <div className="col-span-2 font-mono text-sm text-kyber-400">{attack.damage}</div>
            <div className="col-span-1 flex justify-end">
              <button
                onClick={() => removeAttack(i)}
                className="text-durasteel-500 hover:text-kyber-400 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
              >
                <X size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {attacks.length === 0 && !showAdd && (
        <p className="text-durasteel-500 text-sm">No attacks added</p>
      )}

      {/* Add form */}
      {showAdd && (
        <div className="mt-2 bg-hull-900 border border-hull-600 rounded p-3 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              value={newAttack.name}
              onChange={(e) => setNewAttack({ ...newAttack, name: e.target.value })}
              placeholder="Attack name..."
              className="bg-hull-800 border border-hull-600 rounded px-3 py-1.5 text-sm text-durasteel-200 focus:border-holo-500 focus:outline-none"
              autoFocus
            />
            <input
              type="text"
              value={newAttack.bonus}
              onChange={(e) => setNewAttack({ ...newAttack, bonus: e.target.value })}
              placeholder="Bonus (e.g. +5)"
              className="bg-hull-800 border border-hull-600 rounded px-3 py-1.5 text-sm text-durasteel-200 focus:border-holo-500 focus:outline-none"
            />
            <input
              type="text"
              value={newAttack.type}
              onChange={(e) => setNewAttack({ ...newAttack, type: e.target.value })}
              placeholder="Type (e.g. Melee, Ranged)"
              className="bg-hull-800 border border-hull-600 rounded px-3 py-1.5 text-sm text-durasteel-200 focus:border-holo-500 focus:outline-none"
            />
            <input
              type="text"
              value={newAttack.damage ?? ''}
              onChange={(e) => setNewAttack({ ...newAttack, damage: e.target.value })}
              placeholder="Damage (e.g. 1d8+3)"
              className="bg-hull-800 border border-hull-600 rounded px-3 py-1.5 text-sm text-durasteel-200 focus:border-holo-500 focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={addAttack}
              className="text-xs bg-holo-500/20 text-holo-400 hover:bg-holo-500/30 px-3 py-1 rounded transition-colors cursor-pointer"
            >
              Add Attack
            </button>
            <button
              onClick={() => setShowAdd(false)}
              className="text-xs text-durasteel-500 hover:text-durasteel-300 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
