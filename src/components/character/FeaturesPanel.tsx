import { useState } from 'react'
import { Plus, X, ChevronDown, ChevronUp } from 'lucide-react'
import { EquipmentPanel } from './EquipmentPanel'

interface FeatureEntry {
  name: string
  description: string
  source: string
  uses_max?: number
  uses_remaining?: number
  recharge_on?: 'short_rest' | 'long_rest' | 'never'
}

interface FeaturesPanelProps {
  character: any
  onUpdate: (updates: Record<string, unknown>) => void
}

export function FeaturesPanel({ character, onUpdate }: FeaturesPanelProps) {
  const [showAddFeature, setShowAddFeature] = useState(false)
  const [newFeature, setNewFeature] = useState({ name: '', description: '', source: 'Class' })
  const [racialExpanded, setRacialExpanded] = useState(true)
  const [classExpanded, setClassExpanded] = useState(true)
  const [forceExpanded, setForceExpanded] = useState(true)
  const [formsExpanded, setFormsExpanded] = useState(true)
  const [magicExpanded, setMagicExpanded] = useState(true)
  const [customExpanded, setCustomExpanded] = useState(true)

  const racialAbilities: string[] = character.racial_abilities ?? []
  const classAbilities: string[] = character.class_abilities ?? []
  const forceAbilities: string[] = character.force_abilities ?? []
  const lightsaberForms: string[] = character.lightsaber_forms ?? []
  const nightSisterMagic: string[] = character.night_sister_magic ?? []
  const customFeatures: FeatureEntry[] = character.custom_features ?? []

  function addCustomFeature() {
    if (!newFeature.name.trim()) return
    onUpdate({ custom_features: [...customFeatures, { ...newFeature, name: newFeature.name.trim(), description: newFeature.description.trim() }] })
    setNewFeature({ name: '', description: '', source: 'Class' })
    setShowAddFeature(false)
  }

  function removeCustomFeature(index: number) {
    onUpdate({ custom_features: customFeatures.filter((_, i) => i !== index) })
  }

  function useFeature(index: number) {
    const updated = [...customFeatures]
    if (updated[index].uses_remaining && updated[index].uses_remaining! > 0) {
      updated[index] = { ...updated[index], uses_remaining: updated[index].uses_remaining! - 1 }
      onUpdate({ custom_features: updated })
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-4">
        {/* Racial Abilities */}
        {racialAbilities.length > 0 && (
          <CollapsibleSection
            title="Racial Abilities"
            count={racialAbilities.length}
            expanded={racialExpanded}
            onToggle={() => setRacialExpanded(!racialExpanded)}
          >
            <div className="space-y-2">
              {racialAbilities.map((ability, i) => (
                <div key={i} className="bg-hull-700 rounded p-3 text-sm text-durasteel-200">
                  {ability}
                </div>
              ))}
            </div>
          </CollapsibleSection>
        )}

        {/* Class Abilities */}
        <CollapsibleSection
          title="Class Abilities"
          count={classAbilities.length}
          expanded={classExpanded}
          onToggle={() => setClassExpanded(!classExpanded)}
        >
          {classAbilities.length > 0 ? (
            <div className="space-y-2">
              {classAbilities.map((ability, i) => (
                <div key={i} className="bg-hull-700 rounded p-3 text-sm text-durasteel-200">
                  {ability}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-durasteel-500 text-sm">Abilities unlock as you progress through ranks</p>
          )}
        </CollapsibleSection>

        {/* Force Abilities */}
        {forceAbilities.length > 0 && (
          <CollapsibleSection
            title="Force Abilities"
            count={forceAbilities.length}
            expanded={forceExpanded}
            onToggle={() => setForceExpanded(!forceExpanded)}
            titleClass="text-holo-400"
          >
            <div className="space-y-2">
              {forceAbilities.map((ability, i) => (
                <div key={i} className="bg-holo-500/5 border border-holo-500/20 rounded p-3 text-sm text-durasteel-200">
                  {ability}
                </div>
              ))}
            </div>
          </CollapsibleSection>
        )}

        {/* Lightsaber Forms */}
        {lightsaberForms.length > 0 && (
          <CollapsibleSection
            title="Lightsaber Forms"
            count={lightsaberForms.length}
            expanded={formsExpanded}
            onToggle={() => setFormsExpanded(!formsExpanded)}
            titleClass="text-aurodium-400"
          >
            <div className="space-y-2">
              {lightsaberForms.map((form, i) => (
                <div key={i} className="bg-aurodium-500/5 border border-aurodium-500/20 rounded p-3 text-sm text-durasteel-200">
                  {form}
                </div>
              ))}
            </div>
          </CollapsibleSection>
        )}

        {/* Night Sister Magic */}
        {nightSisterMagic.length > 0 && (
          <CollapsibleSection
            title="Night Sister Magic"
            count={nightSisterMagic.length}
            expanded={magicExpanded}
            onToggle={() => setMagicExpanded(!magicExpanded)}
            titleClass="text-plasma-400"
          >
            <div className="space-y-2">
              {nightSisterMagic.map((spell, i) => (
                <div key={i} className="bg-plasma-500/5 border border-plasma-500/20 rounded p-3 text-sm text-durasteel-200">
                  {spell}
                </div>
              ))}
            </div>
          </CollapsibleSection>
        )}

        {/* Custom Features (user-added) */}
        <CollapsibleSection
          title="Custom Features"
          count={customFeatures.length}
          expanded={customExpanded}
          onToggle={() => setCustomExpanded(!customExpanded)}
          action={
            <button
              onClick={(e) => { e.stopPropagation(); setShowAddFeature(!showAddFeature) }}
              className="text-durasteel-500 hover:text-holo-400 transition-colors cursor-pointer"
            >
              <Plus size={14} />
            </button>
          }
        >
          {showAddFeature && (
            <div className="bg-hull-900 border border-hull-600 rounded p-3 mb-3 space-y-2">
              <input
                type="text"
                value={newFeature.name}
                onChange={(e) => setNewFeature({ ...newFeature, name: e.target.value })}
                placeholder="Feature name..."
                className="w-full bg-hull-800 border border-hull-600 rounded px-3 py-1.5 text-sm text-durasteel-200 focus:border-holo-500 focus:outline-none"
                autoFocus
              />
              <textarea
                value={newFeature.description}
                onChange={(e) => setNewFeature({ ...newFeature, description: e.target.value })}
                placeholder="Description (optional)..."
                rows={2}
                className="w-full bg-hull-800 border border-hull-600 rounded px-3 py-1.5 text-sm text-durasteel-200 focus:border-holo-500 focus:outline-none resize-none"
              />
              <div className="flex items-center gap-2">
                <select
                  value={newFeature.source}
                  onChange={(e) => setNewFeature({ ...newFeature, source: e.target.value })}
                  className="bg-hull-800 border border-hull-600 rounded px-2 py-1 text-xs text-durasteel-300 focus:border-holo-500 focus:outline-none"
                >
                  <option value="Class">Class</option>
                  <option value="Racial">Racial</option>
                  <option value="Feat">Feat</option>
                  <option value="Item">Item</option>
                  <option value="Other">Other</option>
                </select>
                <button onClick={addCustomFeature} className="text-xs bg-holo-500/20 text-holo-400 hover:bg-holo-500/30 px-3 py-1 rounded transition-colors cursor-pointer">
                  Add
                </button>
                <button onClick={() => setShowAddFeature(false)} className="text-xs text-durasteel-500 hover:text-durasteel-300 cursor-pointer">
                  Cancel
                </button>
              </div>
            </div>
          )}

          {customFeatures.length > 0 ? (
            <div className="space-y-2">
              {customFeatures.map((feature, i) => (
                <div key={i} className="bg-hull-700 rounded p-3 group">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-sm text-durasteel-200 font-medium">{feature.name}</div>
                      {feature.description && (
                        <p className="text-xs text-durasteel-400 mt-1">{feature.description}</p>
                      )}
                      <span className="text-xs text-durasteel-500 mt-1 inline-block">{feature.source}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {feature.uses_max && (
                        <button
                          onClick={() => useFeature(i)}
                          disabled={!feature.uses_remaining || feature.uses_remaining <= 0}
                          className="text-xs bg-hull-600 hover:bg-hull-500 disabled:opacity-40 disabled:cursor-not-allowed text-durasteel-200 px-2 py-0.5 rounded cursor-pointer"
                        >
                          {feature.uses_remaining}/{feature.uses_max}
                        </button>
                      )}
                      <button
                        onClick={() => removeCustomFeature(i)}
                        className="text-durasteel-500 hover:text-kyber-400 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            !showAddFeature && <p className="text-durasteel-500 text-sm">No custom features added</p>
          )}
        </CollapsibleSection>
      </div>

      <div>
        <EquipmentPanel character={character} onUpdate={onUpdate} />
      </div>
    </div>
  )
}

function CollapsibleSection({
  title,
  count,
  expanded,
  onToggle,
  titleClass,
  action,
  children,
}: {
  title: string
  count: number
  expanded: boolean
  onToggle: () => void
  titleClass?: string
  action?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="bg-hull-800 border border-hull-600 rounded-lg p-4">
      <button onClick={onToggle} className="flex items-center justify-between w-full cursor-pointer">
        <h3 className={`text-xs uppercase tracking-wider ${titleClass ?? 'text-durasteel-400'}`}>{title}</h3>
        <div className="flex items-center gap-2">
          {action}
          <span className="text-xs text-durasteel-500">{count}</span>
          {expanded ? <ChevronUp size={14} className="text-durasteel-500" /> : <ChevronDown size={14} className="text-durasteel-500" />}
        </div>
      </button>
      {expanded && <div className="mt-3">{children}</div>}
    </div>
  )
}
