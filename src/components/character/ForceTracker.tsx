import { useState } from 'react'
import { Zap, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react'

interface ForceAbilityEntry {
  name: string
  description?: string
  cooldown?: string
  uses_remaining?: number
  max_uses?: number
  is_on_cooldown?: boolean
}

interface ForceTrackerProps {
  forceSlots: number
  forceSlotsUsed: number
  forceAbilities: ForceAbilityEntry[]
  onUpdate: (updates: Record<string, unknown>) => void
  onSpendSlot: () => void
  onRestoreSlots: () => void
  onUseAbility: (abilityName: string) => void
}

export function ForceTracker({
  forceSlots,
  forceSlotsUsed,
  forceAbilities,
  onUpdate,
  onSpendSlot,
  onRestoreSlots,
  onUseAbility,
}: ForceTrackerProps) {
  const [expanded, setExpanded] = useState(false)
  const slotsRemaining = forceSlots - forceSlotsUsed

  return (
    <div className="bg-hull-800 border border-hull-600 rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Zap size={14} className="text-holo-400" />
          <span className="text-xs text-durasteel-400 uppercase tracking-wider">Force Slots</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onSpendSlot}
            disabled={slotsRemaining <= 0}
            className="text-xs bg-hull-700 hover:bg-hull-600 disabled:opacity-40 disabled:cursor-not-allowed text-durasteel-200 px-2 py-1 rounded transition-colors cursor-pointer"
          >
            Spend
          </button>
          <button
            onClick={onRestoreSlots}
            disabled={forceSlotsUsed <= 0}
            className="text-durasteel-500 hover:text-holo-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* Slot circles */}
      <div className="flex gap-1.5 mb-3 flex-wrap">
        {Array.from({ length: forceSlots }).map((_, i) => (
          <div
            key={i}
            className={`w-6 h-6 rounded-full border transition-colors ${
              i < slotsRemaining
                ? 'bg-holo-500/30 border-holo-500'
                : 'bg-hull-700 border-hull-600'
            }`}
          />
        ))}
      </div>

      {/* Force Abilities List */}
      {forceAbilities.length > 0 && (
        <>
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-xs text-durasteel-400 hover:text-durasteel-200 transition-colors cursor-pointer mb-2"
          >
            {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            {forceAbilities.length} abilities
          </button>
          {expanded && (
            <div className="space-y-2">
              {forceAbilities.map((ability) => (
                <div
                  key={ability.name}
                  className={`rounded p-2 text-sm border ${
                    ability.is_on_cooldown
                      ? 'bg-hull-700/50 border-hull-600 opacity-60'
                      : 'bg-holo-500/5 border-holo-500/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-durasteel-200 font-medium text-xs">{ability.name}</span>
                    {ability.cooldown && ability.cooldown !== 'N/A' && (
                      <button
                        onClick={() => onUseAbility(ability.name)}
                        disabled={ability.is_on_cooldown}
                        className="text-xs bg-holo-500/20 hover:bg-holo-500/30 disabled:opacity-40 disabled:cursor-not-allowed text-holo-400 px-2 py-0.5 rounded transition-colors cursor-pointer"
                      >
                        {ability.is_on_cooldown ? 'On Cooldown' : 'Use'}
                      </button>
                    )}
                  </div>
                  {ability.description && (
                    <p className="text-xs text-durasteel-400 mt-1 leading-relaxed">{ability.description}</p>
                  )}
                  {ability.cooldown && ability.cooldown !== 'N/A' && (
                    <span className="text-xs text-durasteel-500 mt-1 inline-block">
                      Resets: {ability.cooldown}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
