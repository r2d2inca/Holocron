import { useState } from 'react'
import { Plus, TrendingUp, ChevronRight } from 'lucide-react'
import { classData } from '@/lib/classData'
import type { ClassName } from '@/lib/types'

interface ClassEntry {
  className: ClassName
  currentRank: string
  currentSubTier: number
  rankHistory: string[]
}

interface MulticlassPanelProps {
  character: any
  onUpdate: (updates: Record<string, unknown>) => void
  onRankUp: (classIndex: number) => void
}

function toRoman(n: number): string {
  const numerals = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']
  return numerals[n] ?? String(n)
}

export function MulticlassPanel({ character, onUpdate, onRankUp }: MulticlassPanelProps) {
  const [showAddClass, setShowAddClass] = useState(false)

  // Normalize to array format
  const classes: ClassEntry[] = character.classes ?? [
    {
      className: character.class_name,
      currentRank: character.current_rank,
      currentSubTier: character.current_sub_tier ?? 1,
      rankHistory: character.rank_history ?? [],
    },
  ]

  const canMulticlass = classes.length < 2

  function addSecondClass(className: ClassName) {
    const cls = classData.find((c) => c.name === className)
    if (!cls) return

    const newClasses: ClassEntry[] = [
      ...classes,
      {
        className,
        currentRank: cls.startingRank,
        currentSubTier: 1,
        rankHistory: [],
      },
    ]

    onUpdate({
      classes: newClasses,
      // Also update proficiencies with the new class's profs
      proficiencies: [
        ...(character.proficiencies ?? []),
        ...cls.proficiencies.filter((p: string) => !(character.proficiencies ?? []).includes(p)),
      ],
    })
    setShowAddClass(false)
  }

  const availableClasses = classData.filter(
    (c) => !classes.some((existing) => existing.className === c.name)
  )

  return (
    <div className="bg-hull-800 border border-hull-600 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs text-durasteel-400 uppercase tracking-wider">Class Progression</h3>
        {canMulticlass && (
          <button
            onClick={() => setShowAddClass(!showAddClass)}
            className="flex items-center gap-1 text-xs text-durasteel-500 hover:text-holo-400 transition-colors cursor-pointer"
          >
            <Plus size={12} /> Multiclass
          </button>
        )}
      </div>

      {/* Class entries */}
      <div className="space-y-3">
        {classes.map((entry, idx) => {
          const cls = classData.find((c) => c.name === entry.className)
          const node = cls?.evolutionTree.find((n) => n.rankName === entry.currentRank)
          const isAtMaxSubTier = node ? entry.currentSubTier >= node.maxSubTier : true
          const hasNextBranch = isAtMaxSubTier && (node?.branches?.length ?? 0) > 0
          const canAdvance = !isAtMaxSubTier || hasNextBranch

          return (
            <div key={idx} className="bg-hull-700 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-durasteel-100">{entry.className}</span>
                  {idx === 0 && classes.length > 1 && (
                    <span className="text-xs bg-holo-500/20 text-holo-400 px-1.5 py-0.5 rounded">Primary</span>
                  )}
                  {idx === 1 && (
                    <span className="text-xs bg-aurodium-500/20 text-aurodium-400 px-1.5 py-0.5 rounded">Secondary</span>
                  )}
                </div>
                {canAdvance && (
                  <button
                    onClick={() => onRankUp(idx)}
                    className="flex items-center gap-1 text-xs bg-aurodium-500/20 hover:bg-aurodium-500/30 text-aurodium-400 px-2 py-1 rounded transition-colors cursor-pointer"
                  >
                    <TrendingUp size={12} /> Rank Up
                  </button>
                )}
              </div>

              {/* Current rank display */}
              <div className="flex items-center gap-1 text-xs">
                <span className="bg-aurodium-500/20 text-aurodium-400 px-2 py-0.5 rounded font-medium">
                  {entry.currentRank} {node && node.maxSubTier > 1 && toRoman(entry.currentSubTier)}
                </span>
                {node && (
                  <span className="text-durasteel-500 ml-1">Tier {node.tier}</span>
                )}
              </div>

              {/* Rank path */}
              {entry.rankHistory.length > 0 && (
                <div className="flex items-center gap-1 flex-wrap mt-2">
                  {entry.rankHistory.map((rank, i) => (
                    <div key={i} className="flex items-center gap-0.5">
                      {i > 0 && <ChevronRight size={10} className="text-durasteel-600" />}
                      <span className="text-xs text-durasteel-500">{rank}</span>
                    </div>
                  ))}
                  <ChevronRight size={10} className="text-durasteel-600" />
                  <span className="text-xs text-aurodium-400">{entry.currentRank}</span>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Add multiclass picker */}
      {showAddClass && (
        <div className="mt-3 bg-hull-900 border border-hull-600 rounded-lg p-3">
          <p className="text-xs text-durasteel-400 mb-2">Choose a second class:</p>
          <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
            {availableClasses.map((cls) => (
              <button
                key={cls.name}
                onClick={() => addSecondClass(cls.name)}
                className="text-left bg-hull-700 hover:bg-hull-600 border border-hull-600 hover:border-holo-500/30 rounded p-2 transition-colors cursor-pointer"
              >
                <div className="text-xs text-durasteel-100 font-medium">{cls.name}</div>
                <div className="text-xs text-durasteel-500">Starts at {cls.startingRank}</div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
