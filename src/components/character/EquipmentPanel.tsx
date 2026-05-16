import { useState } from 'react'
import { Plus, X, Swords, Shield, Package, ChevronDown, ChevronUp } from 'lucide-react'

interface EquipmentPanelProps {
  character: any
  onUpdate: (updates: Record<string, unknown>) => void
}

export function EquipmentPanel({ character, onUpdate }: EquipmentPanelProps) {
  const [showAddWeapon, setShowAddWeapon] = useState(false)
  const [showAddItem, setShowAddItem] = useState(false)
  const [newWeapon, setNewWeapon] = useState('')
  const [newItem, setNewItem] = useState('')
  const [weaponsExpanded, setWeaponsExpanded] = useState(true)
  const [equipExpanded, setEquipExpanded] = useState(true)

  const weapons: string[] = character.weapons ?? []
  const equipment: string[] = character.equipment ?? []

  function addWeapon() {
    if (!newWeapon.trim()) return
    onUpdate({ weapons: [...weapons, newWeapon.trim()] })
    setNewWeapon('')
    setShowAddWeapon(false)
  }

  function removeWeapon(index: number) {
    onUpdate({ weapons: weapons.filter((_, i) => i !== index) })
  }

  function addItem() {
    if (!newItem.trim()) return
    onUpdate({ equipment: [...equipment, newItem.trim()] })
    setNewItem('')
    setShowAddItem(false)
  }

  function removeItem(index: number) {
    onUpdate({ equipment: equipment.filter((_, i) => i !== index) })
  }

  function updateArmor(value: string) {
    onUpdate({ armor: value })
  }

  function updateShield(value: string) {
    onUpdate({ shield: value })
  }

  return (
    <div className="space-y-4">
      {/* Weapons */}
      <div className="bg-hull-800 border border-hull-600 rounded-lg p-4">
        <button
          onClick={() => setWeaponsExpanded(!weaponsExpanded)}
          className="flex items-center justify-between w-full cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Swords size={14} className="text-kyber-400" />
            <h3 className="text-xs text-durasteel-400 uppercase tracking-wider">Weapons</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-durasteel-500">{weapons.length}</span>
            {weaponsExpanded ? <ChevronUp size={14} className="text-durasteel-500" /> : <ChevronDown size={14} className="text-durasteel-500" />}
          </div>
        </button>

        {weaponsExpanded && (
          <div className="mt-3">
            {weapons.length > 0 ? (
              <div className="space-y-2">
                {weapons.map((weapon, i) => (
                  <div key={i} className="flex items-center justify-between bg-hull-700 rounded p-2 group">
                    <span className="text-sm text-durasteel-200">{weapon}</span>
                    <button
                      onClick={() => removeWeapon(i)}
                      className="text-durasteel-500 hover:text-kyber-400 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-durasteel-500 text-sm">No weapons equipped</p>
            )}

            {showAddWeapon ? (
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="text"
                  value={newWeapon}
                  onChange={(e) => setNewWeapon(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addWeapon()}
                  placeholder="Weapon name..."
                  className="flex-1 bg-hull-900 border border-hull-600 rounded px-3 py-1.5 text-sm text-durasteel-200 focus:border-holo-500 focus:outline-none"
                  autoFocus
                />
                <button onClick={addWeapon} className="text-plasma-400 hover:text-plasma-300 cursor-pointer">
                  <Plus size={16} />
                </button>
                <button onClick={() => setShowAddWeapon(false)} className="text-durasteel-500 hover:text-durasteel-300 cursor-pointer">
                  <X size={16} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowAddWeapon(true)}
                className="flex items-center gap-1 text-xs text-durasteel-500 hover:text-holo-400 mt-2 transition-colors cursor-pointer"
              >
                <Plus size={12} /> Add Weapon
              </button>
            )}
          </div>
        )}
      </div>

      {/* Armor & Shield */}
      <div className="bg-hull-800 border border-hull-600 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <Shield size={14} className="text-durasteel-300" />
          <h3 className="text-xs text-durasteel-400 uppercase tracking-wider">Armor & Shield</h3>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs text-durasteel-500 w-14">Armor</span>
            <input
              type="text"
              value={character.armor || ''}
              onChange={(e) => updateArmor(e.target.value)}
              placeholder="None"
              className="flex-1 bg-hull-900 border border-hull-600 rounded px-3 py-1.5 text-sm text-durasteel-200 focus:border-holo-500 focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-durasteel-500 w-14">Shield</span>
            <input
              type="text"
              value={character.shield || ''}
              onChange={(e) => updateShield(e.target.value)}
              placeholder="None"
              className="flex-1 bg-hull-900 border border-hull-600 rounded px-3 py-1.5 text-sm text-durasteel-200 focus:border-holo-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Equipment / Inventory */}
      <div className="bg-hull-800 border border-hull-600 rounded-lg p-4">
        <button
          onClick={() => setEquipExpanded(!equipExpanded)}
          className="flex items-center justify-between w-full cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Package size={14} className="text-durasteel-300" />
            <h3 className="text-xs text-durasteel-400 uppercase tracking-wider">Inventory</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-durasteel-500">{equipment.length} items</span>
            {equipExpanded ? <ChevronUp size={14} className="text-durasteel-500" /> : <ChevronDown size={14} className="text-durasteel-500" />}
          </div>
        </button>

        {equipExpanded && (
          <div className="mt-3">
            {equipment.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {equipment.map((item, i) => (
                  <span key={i} className="group flex items-center gap-1 bg-hull-700 text-durasteel-300 text-xs px-2 py-1 rounded">
                    {item}
                    <button
                      onClick={() => removeItem(i)}
                      className="text-durasteel-500 hover:text-kyber-400 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                    >
                      <X size={10} />
                    </button>
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-durasteel-500 text-sm">No equipment</p>
            )}

            {showAddItem ? (
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="text"
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addItem()}
                  placeholder="Item name..."
                  className="flex-1 bg-hull-900 border border-hull-600 rounded px-3 py-1.5 text-sm text-durasteel-200 focus:border-holo-500 focus:outline-none"
                  autoFocus
                />
                <button onClick={addItem} className="text-plasma-400 hover:text-plasma-300 cursor-pointer">
                  <Plus size={16} />
                </button>
                <button onClick={() => setShowAddItem(false)} className="text-durasteel-500 hover:text-durasteel-300 cursor-pointer">
                  <X size={16} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowAddItem(true)}
                className="flex items-center gap-1 text-xs text-durasteel-500 hover:text-holo-400 mt-2 transition-colors cursor-pointer"
              >
                <Plus size={12} /> Add Item
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
