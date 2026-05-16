import { useState } from 'react'
import { Swords, ChevronDown, ChevronUp } from 'lucide-react'

interface FormEntry {
  name: string
  current_rank: number
  max_rank: number
  active_ability?: string
  is_on_cooldown?: boolean
  cooldown_reset?: string
}

interface LightsaberFormTrackerProps {
  forms: FormEntry[]
  onUseForm: (formName: string) => void
}

export function LightsaberFormTracker({ forms, onUseForm }: LightsaberFormTrackerProps) {
  const [expanded, setExpanded] = useState(false)

  if (forms.length === 0) return null

  return (
    <div className="bg-hull-800 border border-hull-600 rounded-lg p-4">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between w-full cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <Swords size={14} className="text-aurodium-400" />
          <span className="text-xs text-durasteel-400 uppercase tracking-wider">Lightsaber Forms</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-durasteel-500">{forms.length} known</span>
          {expanded ? <ChevronUp size={14} className="text-durasteel-500" /> : <ChevronDown size={14} className="text-durasteel-500" />}
        </div>
      </button>

      {expanded && (
        <div className="mt-3 space-y-2">
          {forms.map((form) => (
            <div
              key={form.name}
              className={`rounded p-3 border ${
                form.is_on_cooldown
                  ? 'bg-hull-700/50 border-hull-600 opacity-60'
                  : 'bg-aurodium-500/5 border-aurodium-500/20'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-durasteel-200 font-medium text-sm">{form.name}</span>
                {form.cooldown_reset && (
                  <button
                    onClick={() => onUseForm(form.name)}
                    disabled={form.is_on_cooldown}
                    className="text-xs bg-aurodium-500/20 hover:bg-aurodium-500/30 disabled:opacity-40 disabled:cursor-not-allowed text-aurodium-400 px-2 py-0.5 rounded transition-colors cursor-pointer"
                  >
                    {form.is_on_cooldown ? 'On Cooldown' : 'Use'}
                  </button>
                )}
              </div>
              {/* Rank pips */}
              <div className="flex items-center gap-1">
                <span className="text-xs text-durasteel-500 mr-1">Rank</span>
                {Array.from({ length: form.max_rank }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-sm ${
                      i < form.current_rank
                        ? 'bg-aurodium-400'
                        : 'bg-hull-600'
                    }`}
                  />
                ))}
              </div>
              {form.active_ability && (
                <p className="text-xs text-durasteel-400 mt-2">{form.active_ability}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
