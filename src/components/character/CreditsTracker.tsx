import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

interface CreditsTrackerProps {
  credits: number
  onUpdate: (updates: Record<string, unknown>) => void
}

export function CreditsTracker({ credits, onUpdate }: CreditsTrackerProps) {
  const [amountStr, setAmountStr] = useState('')
  const amount = parseInt(amountStr) || 0

  function addCredits() {
    if (!amount) return
    onUpdate({ credits: credits + amount })
    setAmountStr('')
  }

  function spendCredits() {
    if (!amount) return
    onUpdate({ credits: Math.max(0, credits - amount) })
    setAmountStr('')
  }

  return (
    <div className="bg-hull-800 border border-hull-600 rounded-lg p-4">
      <div className="text-xs text-durasteel-400 uppercase tracking-wider mb-1">Credits</div>
      <div className="font-mono text-xl text-aurodium-400 mb-3">{credits.toLocaleString()}</div>
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={amountStr}
          onChange={(e) => setAmountStr(e.target.value)}
          className="w-20 text-center font-mono text-sm border border-hull-600 rounded py-1 bg-hull-900 text-durasteel-100 focus:border-holo-500 focus:outline-none"
          min={1}
          placeholder="0"
        />
        <button
          onClick={spendCredits}
          disabled={!amount}
          className="flex items-center gap-1 bg-kyber-600/80 hover:bg-kyber-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs px-2 py-1.5 rounded transition-colors cursor-pointer"
        >
          <Minus size={12} /> Spend
        </button>
        <button
          onClick={addCredits}
          disabled={!amount}
          className="flex items-center gap-1 bg-plasma-600/80 hover:bg-plasma-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs px-2 py-1.5 rounded transition-colors cursor-pointer"
        >
          <Plus size={12} /> Earn
        </button>
      </div>
    </div>
  )
}
