import { Dices } from 'lucide-react'

interface HitDiceTrackerProps {
  hitDie: string
  hitDiceTotal: number
  hitDiceRemaining: number
  onUpdate: (updates: Record<string, unknown>) => void
}

export function HitDiceTracker({ hitDie, hitDiceTotal, hitDiceRemaining, onUpdate }: HitDiceTrackerProps) {
  function spendDie() {
    if (hitDiceRemaining <= 0) return
    onUpdate({ hit_dice_remaining: hitDiceRemaining - 1 })
  }

  function restoreAll() {
    onUpdate({ hit_dice_remaining: hitDiceTotal })
  }

  return (
    <div className="bg-hull-800 border border-hull-600 rounded-lg p-4 text-center">
      <Dices size={20} className="text-durasteel-300 mx-auto mb-1" />
      <div className="text-xs text-durasteel-400 uppercase tracking-wider">Hit Dice</div>
      <div className="font-mono text-xl text-durasteel-100">
        {hitDiceRemaining}<span className="text-durasteel-500 text-sm">/{hitDiceTotal}</span>
      </div>
      <div className="text-xs text-durasteel-500 mb-2">{hitDie}</div>
      <div className="flex justify-center gap-2">
        <button
          onClick={spendDie}
          disabled={hitDiceRemaining <= 0}
          className="text-xs bg-hull-700 hover:bg-hull-600 disabled:opacity-40 disabled:cursor-not-allowed text-durasteel-200 px-2 py-1 rounded transition-colors cursor-pointer"
        >
          Spend
        </button>
        <button
          onClick={restoreAll}
          disabled={hitDiceRemaining >= hitDiceTotal}
          className="text-xs bg-hull-700 hover:bg-hull-600 disabled:opacity-40 disabled:cursor-not-allowed text-durasteel-200 px-2 py-1 rounded transition-colors cursor-pointer"
        >
          Restore
        </button>
      </div>
    </div>
  )
}
