import { useState, useMemo } from 'react'
import { X, ChevronRight, ChevronLeft, Dices, TrendingUp, Sparkles, Heart } from 'lucide-react'
import { classData } from '@/lib/classData'
import type { ClassName, EvolutionNode, AbilityName } from '@/lib/types'

type WizardStep = 'overview' | 'hp' | 'branch' | 'asi' | 'abilities' | 'confirm'

interface RankUpWizardProps {
  open: boolean
  onClose: () => void
  character: any
  classIndex: number // 0 = primary, 1 = secondary
  onRankUp: (updates: Record<string, unknown>) => void
}

const ABILITY_NAMES: { key: AbilityName; label: string }[] = [
  { key: 'strength', label: 'Strength' },
  { key: 'dexterity', label: 'Dexterity' },
  { key: 'constitution', label: 'Constitution' },
  { key: 'intelligence', label: 'Intelligence' },
  { key: 'wisdom', label: 'Wisdom' },
  { key: 'charisma', label: 'Charisma' },
]

function parseHitDie(hitDie: string): number {
  const match = hitDie.match(/\d*d(\d+)/)
  return match ? parseInt(match[1]) : 8
}

function rollDie(sides: number): number {
  return Math.floor(Math.random() * sides) + 1
}

export function RankUpWizard({ open, onClose, character, classIndex, onRankUp }: RankUpWizardProps) {
  // Determine which class we're advancing
  const classes: { className: ClassName; currentRank: string; currentSubTier: number; rankHistory: string[] }[] =
    character.classes ?? [
      {
        className: character.class_name,
        currentRank: character.current_rank,
        currentSubTier: character.current_sub_tier ?? 1,
        rankHistory: character.rank_history ?? [],
      },
    ]

  const currentClass = classes[classIndex]
  if (!currentClass) return null

  const cls = classData.find((c) => c.name === currentClass.className)
  if (!cls) return null

  const currentNode = cls.evolutionTree.find((n) => n.rankName === currentClass.currentRank)
  if (!currentNode) return null

  const hitDieSides = parseHitDie(cls.hitDie)
  const conMod = Math.floor((character.constitution - 10) / 2)

  // Determine what kind of advancement this is
  const isSubTierAdvance = currentClass.currentSubTier < currentNode.maxSubTier
  const isBranchAdvance = !isSubTierAdvance && (currentNode.branches?.length ?? 0) > 0
  const isAtMax = !isSubTierAdvance && !isBranchAdvance

  // Next sub-tier number
  const nextSubTier = isSubTierAdvance ? currentClass.currentSubTier + 1 : 1

  // Check if ASI is granted at this advancement
  const grantsASI = isSubTierAdvance && (currentNode.asiAtSubTiers ?? []).includes(nextSubTier)

  // Build wizard steps
  const steps = useMemo(() => {
    const s: WizardStep[] = ['overview', 'hp']
    if (isBranchAdvance) s.push('branch')
    if (grantsASI) s.push('asi')
    s.push('abilities', 'confirm')
    return s
  }, [isBranchAdvance, grantsASI])

  const [stepIndex, setStepIndex] = useState(0)
  const [hpMethod, setHpMethod] = useState<'average' | 'roll'>('average')
  const [hpRoll, setHpRoll] = useState<number | null>(null)
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null)
  const [asiBoosts, setAsiBoosts] = useState<Partial<Record<AbilityName, number>>>({})
  const [newAbilityText, setNewAbilityText] = useState('')

  if (!open || isAtMax) return null

  const currentStep = steps[stepIndex]

  // HP calculation
  const averageHp = Math.floor(hitDieSides / 2) + 1
  const hpGain = Math.max(1, (hpMethod === 'roll' && hpRoll ? hpRoll : averageHp) + conMod)

  // ASI points remaining (2 total to distribute)
  const asiPointsUsed = Object.values(asiBoosts).reduce((sum, v) => sum + (v || 0), 0)
  const asiPointsRemaining = 2 - asiPointsUsed

  function handleRoll() {
    setHpRoll(rollDie(hitDieSides))
    setHpMethod('roll')
  }

  function handleConfirm() {
    const updates: Record<string, unknown> = {}

    // HP update
    updates.max_hp = character.max_hp + hpGain
    updates.hp = character.hp + hpGain

    if (isBranchAdvance && selectedBranch) {
      // Advancing to a new rank name
      const newRankHistory = [...(currentClass.rankHistory), currentClass.currentRank]

      if (character.classes) {
        // Multiclass: update the specific class entry
        const updatedClasses = [...classes]
        updatedClasses[classIndex] = {
          ...currentClass,
          currentRank: selectedBranch,
          currentSubTier: 1,
          rankHistory: newRankHistory,
        }
        updates.classes = updatedClasses
        updates.current_rank = updatedClasses[0].currentRank // primary always shown
      } else {
        // Single class
        updates.current_rank = selectedBranch
        updates.current_sub_tier = 1
        updates.rank_history = newRankHistory
      }
    } else {
      // Sub-tier advance
      if (character.classes) {
        const updatedClasses = [...classes]
        updatedClasses[classIndex] = {
          ...currentClass,
          currentSubTier: nextSubTier,
        }
        updates.classes = updatedClasses
      } else {
        updates.current_sub_tier = nextSubTier
      }
    }

    // ASI boosts
    if (grantsASI) {
      for (const [ability, boost] of Object.entries(asiBoosts)) {
        if (boost && boost > 0) {
          updates[ability] = (character[ability] ?? 10) + boost
        }
      }
    }

    // New abilities (free-text added by player)
    if (newAbilityText.trim()) {
      const currentAbilities: string[] = character.class_abilities ?? []
      updates.class_abilities = [...currentAbilities, newAbilityText.trim()]
    }

    onRankUp(updates)
    onClose()
  }

  function nextStep() {
    if (stepIndex < steps.length - 1) setStepIndex(stepIndex + 1)
  }

  function prevStep() {
    if (stepIndex > 0) setStepIndex(stepIndex - 1)
  }

  // Determine display label for advancement
  const advancementLabel = isSubTierAdvance
    ? `${currentClass.currentRank} ${toRoman(nextSubTier)}`
    : selectedBranch ?? 'Choose Path'

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-hull-800 border border-hull-600 rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-hull-800 border-b border-hull-700 p-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <TrendingUp size={18} className="text-aurodium-400" />
            <h2 className="font-display text-lg text-durasteel-100 tracking-wider">Rank Up</h2>
          </div>
          <button onClick={onClose} className="text-durasteel-500 hover:text-durasteel-300 cursor-pointer">
            <X size={18} />
          </button>
        </div>

        {/* Step indicator */}
        <div className="px-4 pt-4">
          <div className="flex items-center gap-1">
            {steps.map((s, i) => (
              <div
                key={s}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  i <= stepIndex ? 'bg-aurodium-400' : 'bg-hull-600'
                }`}
              />
            ))}
          </div>
          <div className="text-xs text-durasteel-500 mt-1 capitalize">
            Step {stepIndex + 1} of {steps.length}: {currentStep}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* OVERVIEW */}
          {currentStep === 'overview' && (
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-sm text-durasteel-400 mb-1">Advancing from</div>
                <div className="font-display text-xl text-durasteel-100">
                  {currentClass.currentRank} {currentNode.maxSubTier > 1 && toRoman(currentClass.currentSubTier)}
                </div>
                <ChevronRight className="mx-auto my-2 text-aurodium-400" size={20} />
                <div className="font-display text-xl text-aurodium-400">
                  {advancementLabel}
                </div>
              </div>

              <div className="bg-hull-700 rounded-lg p-4 space-y-2 text-sm">
                <div className="text-durasteel-400">This advancement includes:</div>
                <ul className="space-y-1 text-durasteel-200">
                  <li className="flex items-center gap-2">
                    <Heart size={12} className="text-kyber-400" /> HP increase ({cls.hitDie} + CON)
                  </li>
                  {isBranchAdvance && (
                    <li className="flex items-center gap-2">
                      <TrendingUp size={12} className="text-aurodium-400" /> New rank selection ({currentNode.branches?.length} paths)
                    </li>
                  )}
                  {grantsASI && (
                    <li className="flex items-center gap-2">
                      <Sparkles size={12} className="text-holo-400" /> Ability Score Increase (+2 points)
                    </li>
                  )}
                </ul>
              </div>

              <div className="bg-hull-700 rounded-lg p-3 text-xs text-durasteel-500">
                Class: {currentClass.className} — Hit Die: {cls.hitDie}
              </div>
            </div>
          )}

          {/* HP */}
          {currentStep === 'hp' && (
            <div className="space-y-4">
              <h3 className="font-display text-durasteel-100 tracking-wider">Hit Points</h3>
              <p className="text-sm text-durasteel-400">
                Choose how to determine your HP gain for this rank advancement.
              </p>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => { setHpMethod('average'); setHpRoll(null) }}
                  className={`p-4 rounded-lg border text-center transition-colors cursor-pointer ${
                    hpMethod === 'average' && !hpRoll
                      ? 'border-aurodium-400 bg-aurodium-500/10'
                      : 'border-hull-600 hover:border-hull-500'
                  }`}
                >
                  <div className="text-xs text-durasteel-400 uppercase tracking-wider mb-1">Average</div>
                  <div className="font-mono text-2xl text-durasteel-100">{averageHp}</div>
                  <div className="text-xs text-durasteel-500">guaranteed</div>
                </button>

                <button
                  onClick={handleRoll}
                  className={`p-4 rounded-lg border text-center transition-colors cursor-pointer ${
                    hpRoll
                      ? 'border-aurodium-400 bg-aurodium-500/10'
                      : 'border-hull-600 hover:border-hull-500'
                  }`}
                >
                  <div className="text-xs text-durasteel-400 uppercase tracking-wider mb-1">Roll</div>
                  <div className="font-mono text-2xl text-durasteel-100">
                    {hpRoll ?? <Dices size={24} className="mx-auto text-durasteel-400" />}
                  </div>
                  <div className="text-xs text-durasteel-500">1d{hitDieSides}</div>
                </button>
              </div>

              <div className="bg-hull-700 rounded-lg p-3 text-sm">
                <div className="flex justify-between text-durasteel-300">
                  <span>Hit Die result</span>
                  <span className="font-mono">{hpMethod === 'roll' && hpRoll ? hpRoll : averageHp}</span>
                </div>
                <div className="flex justify-between text-durasteel-300">
                  <span>CON modifier</span>
                  <span className="font-mono">{conMod >= 0 ? '+' : ''}{conMod}</span>
                </div>
                <div className="border-t border-hull-600 mt-2 pt-2 flex justify-between text-durasteel-100 font-medium">
                  <span>Total HP gain</span>
                  <span className="font-mono text-plasma-400">+{hpGain}</span>
                </div>
              </div>
            </div>
          )}

          {/* BRANCH SELECTION */}
          {currentStep === 'branch' && (
            <div className="space-y-4">
              <h3 className="font-display text-durasteel-100 tracking-wider">Choose Your Path</h3>
              <p className="text-sm text-durasteel-400">
                You've reached the end of <span className="text-durasteel-200">{currentClass.currentRank}</span>. Choose your next evolution:
              </p>

              <div className="space-y-2">
                {(currentNode.branches ?? []).map((branchName) => {
                  const branchNode = cls.evolutionTree.find((n) => n.rankName === branchName)
                  return (
                    <button
                      key={branchName}
                      onClick={() => setSelectedBranch(branchName)}
                      className={`w-full text-left rounded-lg p-4 border transition-colors cursor-pointer ${
                        selectedBranch === branchName
                          ? 'border-aurodium-400 bg-aurodium-500/10'
                          : 'border-hull-600 hover:border-hull-500 bg-hull-700'
                      }`}
                    >
                      <div className="text-sm font-medium text-durasteel-100">{branchName}</div>
                      {branchNode?.trigger && (
                        <div className="text-xs text-durasteel-500 mt-0.5">{branchNode.trigger}</div>
                      )}
                      {branchNode && (
                        <div className="text-xs text-durasteel-500 mt-1">
                          {branchNode.maxSubTier} tiers — leads to: {branchNode.branches?.join(', ') || 'Ultimate rank'}
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* ASI */}
          {currentStep === 'asi' && (
            <div className="space-y-4">
              <h3 className="font-display text-durasteel-100 tracking-wider">Ability Score Increase</h3>
              <p className="text-sm text-durasteel-400">
                Distribute 2 points among your ability scores. You can put both in one or split them.
              </p>
              <div className="text-xs text-durasteel-500 mb-2">
                Points remaining: <span className="text-aurodium-400 font-mono">{asiPointsRemaining}</span>
              </div>

              <div className="space-y-2">
                {ABILITY_NAMES.map(({ key, label }) => {
                  const current = character[key] ?? 10
                  const boost = asiBoosts[key] ?? 0
                  return (
                    <div key={key} className="flex items-center justify-between bg-hull-700 rounded-lg p-3">
                      <div>
                        <span className="text-sm text-durasteel-200">{label}</span>
                        <span className="text-xs text-durasteel-500 ml-2">({current})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setAsiBoosts({ ...asiBoosts, [key]: Math.max(0, boost - 1) })}
                          disabled={boost <= 0}
                          className="w-7 h-7 rounded bg-hull-600 hover:bg-hull-500 disabled:opacity-30 disabled:cursor-not-allowed text-durasteel-200 flex items-center justify-center cursor-pointer text-sm"
                        >
                          -
                        </button>
                        <span className={`font-mono w-6 text-center ${boost > 0 ? 'text-aurodium-400' : 'text-durasteel-500'}`}>
                          {boost > 0 ? `+${boost}` : '0'}
                        </span>
                        <button
                          onClick={() => setAsiBoosts({ ...asiBoosts, [key]: Math.min(2, boost + 1) })}
                          disabled={asiPointsRemaining <= 0 || boost >= 2}
                          className="w-7 h-7 rounded bg-hull-600 hover:bg-hull-500 disabled:opacity-30 disabled:cursor-not-allowed text-durasteel-200 flex items-center justify-center cursor-pointer text-sm"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* ABILITIES */}
          {currentStep === 'abilities' && (
            <div className="space-y-4">
              <h3 className="font-display text-durasteel-100 tracking-wider">New Abilities</h3>
              <p className="text-sm text-durasteel-400">
                Add any new class abilities, features, or upgrades gained at this rank tier. Check with your DM for what you unlock.
              </p>

              <textarea
                value={newAbilityText}
                onChange={(e) => setNewAbilityText(e.target.value)}
                rows={4}
                className="w-full bg-hull-900 border border-hull-600 rounded-lg px-4 py-3 text-durasteel-200 text-sm placeholder-durasteel-500 focus:border-holo-500 focus:outline-none resize-none"
                placeholder="e.g. Force Push — Push a target within 25ft backwards 10ft. DC 13 Force check."
              />
              <p className="text-xs text-durasteel-500">Leave blank if no new abilities at this tier. You can always add them later from the Features tab.</p>
            </div>
          )}

          {/* CONFIRM */}
          {currentStep === 'confirm' && (
            <div className="space-y-4">
              <h3 className="font-display text-durasteel-100 tracking-wider">Confirm Rank Up</h3>

              <div className="bg-hull-700 rounded-lg p-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-durasteel-400">Advancing to</span>
                  <span className="text-aurodium-400 font-medium">{advancementLabel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-durasteel-400">HP gain</span>
                  <span className="text-plasma-400 font-mono">+{hpGain}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-durasteel-400">New max HP</span>
                  <span className="text-durasteel-100 font-mono">{character.max_hp + hpGain}</span>
                </div>
                {grantsASI && asiPointsUsed > 0 && (
                  <div className="border-t border-hull-600 pt-2">
                    <span className="text-durasteel-400">ASI:</span>
                    <div className="mt-1 space-y-1">
                      {Object.entries(asiBoosts).filter(([, v]) => v && v > 0).map(([key, val]) => (
                        <div key={key} className="flex justify-between text-durasteel-200">
                          <span className="capitalize">{key}</span>
                          <span className="text-aurodium-400 font-mono">+{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {newAbilityText.trim() && (
                  <div className="border-t border-hull-600 pt-2">
                    <span className="text-durasteel-400">New ability:</span>
                    <p className="text-durasteel-200 text-xs mt-1">{newAbilityText.trim()}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer nav */}
        <div className="sticky bottom-0 bg-hull-800 border-t border-hull-700 p-4 flex items-center justify-between">
          <button
            onClick={prevStep}
            disabled={stepIndex === 0}
            className="flex items-center gap-1 text-sm text-durasteel-400 hover:text-durasteel-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            <ChevronLeft size={16} /> Back
          </button>

          {currentStep === 'confirm' ? (
            <button
              onClick={handleConfirm}
              disabled={isBranchAdvance && !selectedBranch}
              className="bg-aurodium-500 hover:bg-aurodium-400 disabled:opacity-50 disabled:cursor-not-allowed text-hull-950 font-semibold px-6 py-2 rounded-lg transition-colors tracking-wide text-sm cursor-pointer"
            >
              Confirm Rank Up
            </button>
          ) : (
            <button
              onClick={nextStep}
              disabled={currentStep === 'branch' && !selectedBranch}
              className="flex items-center gap-1 bg-hull-700 hover:bg-hull-600 disabled:opacity-50 disabled:cursor-not-allowed text-durasteel-200 text-sm px-4 py-2 rounded-lg transition-colors cursor-pointer"
            >
              Next <ChevronRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function toRoman(n: number): string {
  const numerals = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']
  return numerals[n] ?? String(n)
}
