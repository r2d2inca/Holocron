import { useState } from 'react'
import { Heart, Plus, Minus, Shield } from 'lucide-react'

interface HpTrackerProps {
  currentHp: number
  maxHp: number
  tempHp: number
  onUpdate: (updates: Record<string, unknown>) => void
}

export function HpTracker({ currentHp, maxHp, tempHp, onUpdate }: HpTrackerProps) {
  const [amountStr, setAmountStr] = useState('')
  const amount = parseInt(amountStr) || 0

  function takeDamage() {
    if (!amount) return
    let remaining = amount
    if (tempHp > 0) {
      const absorbed = Math.min(tempHp, remaining)
      remaining -= absorbed
      onUpdate({ temp_hp: tempHp - absorbed, hp: Math.max(0, currentHp - remaining) })
    } else {
      onUpdate({ hp: Math.max(0, currentHp - remaining) })
    }
    setAmountStr('')
  }

  function heal() {
    if (!amount) return
    onUpdate({ hp: Math.min(maxHp, currentHp + amount) })
    setAmountStr('')
  }

  function addTempHp() {
    if (!amount) return
    onUpdate({ temp_hp: Math.max(tempHp, amount) })
    setAmountStr('')
  }

  const hpPercent = maxHp > 0 ? Math.max(0, (currentHp / maxHp) * 100) : 0
  const barColor =
    hpPercent > 50 ? 'bg-plasma-500' : hpPercent > 25 ? 'bg-aurodium-500' : 'bg-kyber-500'

  return (
    <div className="space-y-3">
      {/* HP Bar */}
      <div className="relative h-6 bg-hull-700 rounded-full overflow-hidden border border-hull-600">
        <div
          className={`h-full ${barColor} transition-all duration-300`}
          style={{ width: `${hpPercent}%` }}
        />
        <div className="absolute inset-0 flex items-center justify-center font-mono text-xs font-bold text-durasteel-100">
          {currentHp} / {maxHp}
          {tempHp > 0 && <span className="text-holo-400 ml-1">+{tempHp}</span>}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2">
        <div className="flex items-center border border-hull-600 rounded">
          <button
            onClick={() => setAmountStr(String(Math.max(1, amount - 1)))}
            className="px-2 py-1 hover:bg-hull-700 transition-colors cursor-pointer text-durasteel-300"
          >
            <Minus size={14} />
          </button>
          <input
            type="number"
            value={amountStr}
            onChange={(e) => setAmountStr(e.target.value)}
            className="w-14 text-center font-mono text-sm border-x border-hull-600 py-1 bg-hull-900 text-durasteel-100"
            min={1}
            placeholder="0"
          />
          <button
            onClick={() => setAmountStr(String(amount + 1))}
            className="px-2 py-1 hover:bg-hull-700 transition-colors cursor-pointer text-durasteel-300"
          >
            <Plus size={14} />
          </button>
        </div>

        <button onClick={takeDamage} className="flex items-center gap-1 bg-kyber-600 hover:bg-kyber-500 text-white text-sm px-3 py-1.5 rounded transition-colors">
          <Heart size={14} /> Damage
        </button>
        <button onClick={heal} className="flex items-center gap-1 bg-plasma-600 hover:bg-plasma-500 text-white text-sm px-3 py-1.5 rounded transition-colors">
          <Plus size={14} /> Heal
        </button>
        <button onClick={addTempHp} className="flex items-center gap-1 bg-hull-700 hover:bg-hull-600 text-durasteel-200 text-sm px-3 py-1.5 rounded transition-colors">
          <Shield size={14} /> Temp
        </button>
      </div>
    </div>
  )
}
