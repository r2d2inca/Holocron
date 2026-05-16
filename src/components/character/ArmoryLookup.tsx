import { useState } from 'react'
import { Search, X, ChevronDown, ChevronUp, Swords, Shield, Zap, Crosshair } from 'lucide-react'
import { weapons, shields, advancedWeapons } from '@/lib/weaponData'
import { forceAbilities, lightsaberForms, nightSisterSpells } from '@/lib/forceData'
import type { Weapon, Shield as ShieldType, AdvancedWeapon, ForceAbility, LightsaberForm, NightSisterSpell } from '@/lib/types'

type CompendiumTab = 'weapons' | 'shields' | 'advanced' | 'force' | 'forms' | 'magic'

interface ArmoryLookupProps {
  onAddWeapon?: (weapon: Weapon) => void
  onAddAttack?: (attack: { name: string; bonus: string; type: string; damage: string }) => void
  onClose: () => void
}

export function ArmoryLookup({ onAddWeapon, onAddAttack, onClose }: ArmoryLookupProps) {
  const [tab, setTab] = useState<CompendiumTab>('weapons')
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('All')
  const [expandedItem, setExpandedItem] = useState<string | null>(null)

  const query = search.toLowerCase()

  const filteredWeapons = weapons.filter((w) => {
    const matchesSearch = w.name.toLowerCase().includes(query) || w.category.toLowerCase().includes(query)
    const matchesCategory = categoryFilter === 'All' || w.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const filteredShields = shields.filter((s) => s.name.toLowerCase().includes(query))
  const filteredAdvanced = advancedWeapons.filter((a) => a.name.toLowerCase().includes(query) || a.description.toLowerCase().includes(query))
  const filteredForce = forceAbilities.filter((f) => f.name.toLowerCase().includes(query) || f.description.toLowerCase().includes(query))
  const filteredForms = lightsaberForms.filter((f) => f.name.toLowerCase().includes(query))
  const filteredMagic = nightSisterSpells.filter((s) => s.name.toLowerCase().includes(query))

  const weaponCategories = ['All', ...Array.from(new Set(weapons.map((w) => w.category)))]

  const TABS: { id: CompendiumTab; label: string; icon: React.ReactNode; count: number }[] = [
    { id: 'weapons', label: 'Weapons', icon: <Swords size={12} />, count: filteredWeapons.length },
    { id: 'shields', label: 'Shields', icon: <Shield size={12} />, count: filteredShields.length },
    { id: 'advanced', label: 'Advanced', icon: <Crosshair size={12} />, count: filteredAdvanced.length },
    { id: 'force', label: 'Force', icon: <Zap size={12} />, count: filteredForce.length },
    { id: 'forms', label: 'Saber Forms', icon: <Swords size={12} />, count: filteredForms.length },
    { id: 'magic', label: 'Night Sister', icon: <Zap size={12} />, count: filteredMagic.length },
  ]

  function handleAddWeaponAsAttack(w: Weapon) {
    onAddAttack?.({
      name: w.name,
      bonus: '',
      type: `${w.category} — ${w.rangeOrType}`,
      damage: w.damage,
    })
  }

  function handleAddAdvancedAsAttack(a: AdvancedWeapon) {
    onAddAttack?.({
      name: a.name,
      bonus: '',
      type: `Advanced — ${a.worn !== 'N/A' ? a.worn : 'Thrown'}`,
      damage: a.damage,
    })
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-hull-800 border border-hull-600 rounded-xl max-w-3xl w-full max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-hull-700">
          <h2 className="font-display text-lg text-holo-400 tracking-wider">Armory & Compendium</h2>
          <button onClick={onClose} className="text-durasteel-500 hover:text-durasteel-300 cursor-pointer">
            <X size={18} />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-hull-700">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-durasteel-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search weapons, abilities, gear..."
              className="w-full bg-hull-900 border border-hull-600 rounded-lg pl-9 pr-4 py-2 text-sm text-durasteel-200 placeholder-durasteel-500 focus:border-holo-500 focus:outline-none"
              autoFocus
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 px-4 pt-2 overflow-x-auto">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => { setTab(t.id); setCategoryFilter('All') }}
              className={`flex items-center gap-1 px-3 py-1.5 text-xs rounded-t transition-colors cursor-pointer whitespace-nowrap ${
                tab === t.id
                  ? 'bg-hull-700 text-holo-400'
                  : 'text-durasteel-500 hover:text-durasteel-300'
              }`}
            >
              {t.icon} {t.label} <span className="text-durasteel-600">({t.count})</span>
            </button>
          ))}
        </div>

        {/* Category filter for weapons */}
        {tab === 'weapons' && (
          <div className="flex items-center gap-1 px-4 py-2 overflow-x-auto">
            {weaponCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`text-xs px-2 py-1 rounded transition-colors cursor-pointer whitespace-nowrap ${
                  categoryFilter === cat
                    ? 'bg-holo-500/20 text-holo-400'
                    : 'text-durasteel-500 hover:text-durasteel-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1">

          {/* WEAPONS */}
          {tab === 'weapons' && filteredWeapons.map((w) => (
            <WeaponCard
              key={w.name + w.category}
              weapon={w}
              expanded={expandedItem === w.name}
              onToggle={() => setExpandedItem(expandedItem === w.name ? null : w.name)}
              onAdd={onAddAttack ? () => handleAddWeaponAsAttack(w) : undefined}
            />
          ))}

          {/* SHIELDS */}
          {tab === 'shields' && filteredShields.map((s) => (
            <ShieldCard key={s.name} shield={s} expanded={expandedItem === s.name} onToggle={() => setExpandedItem(expandedItem === s.name ? null : s.name)} />
          ))}

          {/* ADVANCED */}
          {tab === 'advanced' && filteredAdvanced.map((a) => (
            <AdvancedCard
              key={a.name}
              weapon={a}
              expanded={expandedItem === a.name}
              onToggle={() => setExpandedItem(expandedItem === a.name ? null : a.name)}
              onAdd={onAddAttack ? () => handleAddAdvancedAsAttack(a) : undefined}
            />
          ))}

          {/* FORCE */}
          {tab === 'force' && filteredForce.map((f) => (
            <ForceCard key={f.name} ability={f} expanded={expandedItem === f.name} onToggle={() => setExpandedItem(expandedItem === f.name ? null : f.name)} />
          ))}

          {/* SABER FORMS */}
          {tab === 'forms' && filteredForms.map((f) => (
            <FormCard key={f.name} form={f} expanded={expandedItem === f.name} onToggle={() => setExpandedItem(expandedItem === f.name ? null : f.name)} />
          ))}

          {/* NIGHT SISTER */}
          {tab === 'magic' && filteredMagic.map((s) => (
            <MagicCard key={s.name} spell={s} expanded={expandedItem === s.name} onToggle={() => setExpandedItem(expandedItem === s.name ? null : s.name)} />
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── CARD COMPONENTS ───

function WeaponCard({ weapon, expanded, onToggle, onAdd }: { weapon: Weapon; expanded: boolean; onToggle: () => void; onAdd?: () => void }) {
  return (
    <div className="bg-hull-700 rounded-lg overflow-hidden">
      <button onClick={onToggle} className="w-full flex items-center gap-3 p-3 cursor-pointer hover:bg-hull-600/50 transition-colors">
        <div className="flex-1 text-left">
          <div className="text-sm text-durasteel-100 font-medium">{weapon.name}</div>
          <div className="text-xs text-durasteel-500">{weapon.category}</div>
        </div>
        <span className="font-mono text-sm text-kyber-400">{weapon.damage}</span>
        <span className="text-xs text-durasteel-500 w-16 text-right">{weapon.rangeOrType}</span>
        {expanded ? <ChevronUp size={14} className="text-durasteel-500" /> : <ChevronDown size={14} className="text-durasteel-500" />}
      </button>
      {expanded && (
        <div className="px-3 pb-3 pt-1 border-t border-hull-600 space-y-2">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div><span className="text-durasteel-500">Cost:</span> <span className="text-aurodium-400">{weapon.cost} credits</span></div>
            <div><span className="text-durasteel-500">Damage:</span> <span className="text-kyber-400">{weapon.damage}</span></div>
            <div><span className="text-durasteel-500">Type/Range:</span> <span className="text-durasteel-200">{weapon.rangeOrType}</span></div>
            <div><span className="text-durasteel-500">Category:</span> <span className="text-durasteel-200">{weapon.category}</span></div>
          </div>
          {weapon.attributes.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {weapon.attributes.map((attr, i) => (
                <span key={i} className="bg-holo-500/10 text-holo-400 text-xs px-2 py-0.5 rounded">{attr}</span>
              ))}
            </div>
          )}
          {onAdd && (
            <button
              onClick={(e) => { e.stopPropagation(); onAdd() }}
              className="text-xs bg-holo-500/20 text-holo-400 hover:bg-holo-500/30 px-3 py-1 rounded transition-colors cursor-pointer"
            >
              + Add to Attacks
            </button>
          )}
        </div>
      )}
    </div>
  )
}

function ShieldCard({ shield, expanded, onToggle }: { shield: ShieldType; expanded: boolean; onToggle: () => void }) {
  return (
    <div className="bg-hull-700 rounded-lg overflow-hidden">
      <button onClick={onToggle} className="w-full flex items-center gap-3 p-3 cursor-pointer hover:bg-hull-600/50 transition-colors">
        <div className="flex-1 text-left">
          <div className="text-sm text-durasteel-100 font-medium">{shield.name}</div>
        </div>
        <span className="font-mono text-sm text-holo-400">+{shield.acBonus} AC</span>
        {expanded ? <ChevronUp size={14} className="text-durasteel-500" /> : <ChevronDown size={14} className="text-durasteel-500" />}
      </button>
      {expanded && (
        <div className="px-3 pb-3 pt-1 border-t border-hull-600 space-y-2 text-xs">
          <div><span className="text-durasteel-500">Cost:</span> <span className="text-aurodium-400">{shield.cost} credits</span></div>
          <div><span className="text-durasteel-500">AC Bonus:</span> <span className="text-holo-400">+{shield.acBonus}</span></div>
          <div>
            <span className="text-durasteel-500">Effective against:</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {shield.against.map((a, i) => (
                <span key={i} className="bg-hull-600 text-durasteel-300 text-xs px-2 py-0.5 rounded">{a}</span>
              ))}
            </div>
          </div>
          {shield.attributes.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {shield.attributes.map((attr, i) => (
                <span key={i} className="bg-holo-500/10 text-holo-400 text-xs px-2 py-0.5 rounded">{attr}</span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function AdvancedCard({ weapon, expanded, onToggle, onAdd }: { weapon: AdvancedWeapon; expanded: boolean; onToggle: () => void; onAdd?: () => void }) {
  return (
    <div className="bg-hull-700 rounded-lg overflow-hidden">
      <button onClick={onToggle} className="w-full flex items-center gap-3 p-3 cursor-pointer hover:bg-hull-600/50 transition-colors">
        <div className="flex-1 text-left">
          <div className="text-sm text-durasteel-100 font-medium">{weapon.name}</div>
          <div className="text-xs text-durasteel-500">{weapon.worn !== 'N/A' ? `Worn: ${weapon.worn}` : 'Throwable'}</div>
        </div>
        <span className="font-mono text-sm text-kyber-400">{weapon.damage}</span>
        {expanded ? <ChevronUp size={14} className="text-durasteel-500" /> : <ChevronDown size={14} className="text-durasteel-500" />}
      </button>
      {expanded && (
        <div className="px-3 pb-3 pt-1 border-t border-hull-600 space-y-2 text-xs">
          <p className="text-durasteel-300 leading-relaxed">{weapon.description}</p>
          <div className="grid grid-cols-2 gap-2">
            <div><span className="text-durasteel-500">Price:</span> <span className="text-aurodium-400">{weapon.price} credits</span></div>
            <div><span className="text-durasteel-500">Damage:</span> <span className="text-kyber-400">{weapon.damage}</span></div>
            <div><span className="text-durasteel-500">Range:</span> <span className="text-durasteel-200">{weapon.range}</span></div>
            <div><span className="text-durasteel-500">Worn:</span> <span className="text-durasteel-200">{weapon.worn}</span></div>
          </div>
          {onAdd && (
            <button
              onClick={(e) => { e.stopPropagation(); onAdd() }}
              className="text-xs bg-holo-500/20 text-holo-400 hover:bg-holo-500/30 px-3 py-1 rounded transition-colors cursor-pointer"
            >
              + Add to Attacks
            </button>
          )}
        </div>
      )}
    </div>
  )
}

function ForceCard({ ability, expanded, onToggle }: { ability: ForceAbility; expanded: boolean; onToggle: () => void }) {
  return (
    <div className="bg-hull-700 rounded-lg overflow-hidden">
      <button onClick={onToggle} className="w-full flex items-center gap-3 p-3 cursor-pointer hover:bg-hull-600/50 transition-colors">
        <div className="flex-1 text-left">
          <div className="text-sm text-durasteel-100 font-medium">{ability.name}</div>
          <div className="text-xs text-durasteel-500">{ability.cooldown}</div>
        </div>
        <span className="text-xs text-durasteel-400">{ability.range}</span>
        {expanded ? <ChevronUp size={14} className="text-durasteel-500" /> : <ChevronDown size={14} className="text-durasteel-500" />}
      </button>
      {expanded && (
        <div className="px-3 pb-3 pt-1 border-t border-hull-600 space-y-2 text-xs">
          <p className="text-durasteel-300 leading-relaxed">{ability.description}</p>
          <div className="grid grid-cols-2 gap-2">
            <div><span className="text-durasteel-500">Range:</span> <span className="text-durasteel-200">{ability.range}</span></div>
            <div><span className="text-durasteel-500">Cooldown:</span> <span className="text-durasteel-200">{ability.cooldown}</span></div>
          </div>
          <div>
            <span className="text-durasteel-500">Access:</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {ability.access.map((a, i) => (
                <span key={i} className="bg-holo-500/10 text-holo-400 text-xs px-2 py-0.5 rounded">{a}</span>
              ))}
            </div>
          </div>
          {ability.higherRank !== 'N/A' && (
            <div><span className="text-durasteel-500">Higher Rank:</span> <span className="text-durasteel-300">{ability.higherRank}</span></div>
          )}
        </div>
      )}
    </div>
  )
}

function FormCard({ form, expanded, onToggle }: { form: LightsaberForm; expanded: boolean; onToggle: () => void }) {
  return (
    <div className="bg-hull-700 rounded-lg overflow-hidden">
      <button onClick={onToggle} className="w-full flex items-center gap-3 p-3 cursor-pointer hover:bg-hull-600/50 transition-colors">
        <div className="flex-1 text-left">
          <div className="text-sm text-durasteel-100 font-medium">{form.name}</div>
          <div className="text-xs text-durasteel-500">{form.title}</div>
        </div>
        <span className="text-xs text-aurodium-400">{form.ranks.length} ranks</span>
        {expanded ? <ChevronUp size={14} className="text-durasteel-500" /> : <ChevronDown size={14} className="text-durasteel-500" />}
      </button>
      {expanded && (
        <div className="px-3 pb-3 pt-1 border-t border-hull-600 space-y-2">
          {form.ranks.map((r) => (
            <div key={r.rank} className="bg-hull-600/50 rounded p-2 text-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="text-aurodium-400 font-medium">Rank {r.rank}: {r.name}</span>
                <span className="text-durasteel-500">{r.cooldown}</span>
              </div>
              <p className="text-durasteel-300 leading-relaxed">{r.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function MagicCard({ spell, expanded, onToggle }: { spell: NightSisterSpell; expanded: boolean; onToggle: () => void }) {
  return (
    <div className="bg-hull-700 rounded-lg overflow-hidden">
      <button onClick={onToggle} className="w-full flex items-center gap-3 p-3 cursor-pointer hover:bg-hull-600/50 transition-colors">
        <div className="flex-1 text-left">
          <div className="text-sm text-durasteel-100 font-medium">{spell.name}</div>
          <div className="text-xs text-durasteel-500">Level {spell.level}</div>
        </div>
        <span className="text-xs text-durasteel-400">{spell.cooldown}</span>
        {expanded ? <ChevronUp size={14} className="text-durasteel-500" /> : <ChevronDown size={14} className="text-durasteel-500" />}
      </button>
      {expanded && (
        <div className="px-3 pb-3 pt-1 border-t border-hull-600 space-y-2 text-xs">
          <p className="text-durasteel-300 leading-relaxed">{spell.description}</p>
          <div className="grid grid-cols-2 gap-2">
            <div><span className="text-durasteel-500">Range:</span> <span className="text-durasteel-200">{spell.range}</span></div>
            <div><span className="text-durasteel-500">Cooldown:</span> <span className="text-durasteel-200">{spell.cooldown}</span></div>
          </div>
          {spell.higherRank !== 'N/A' && (
            <div><span className="text-durasteel-500">Higher Rank:</span> <span className="text-durasteel-300">{spell.higherRank}</span></div>
          )}
        </div>
      )}
    </div>
  )
}
