import { Coffee, Moon, X } from 'lucide-react'

interface RestModalProps {
  type: 'short' | 'long'
  character: any
  onConfirm: () => void
  onClose: () => void
}

export function RestModal({ type, character, onConfirm, onClose }: RestModalProps) {
  const isLong = type === 'long'

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-hull-800 border border-hull-600 rounded-xl max-w-sm w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {isLong ? <Moon size={18} className="text-holo-400" /> : <Coffee size={18} className="text-holo-400" />}
            <h2 className="font-display text-lg text-durasteel-100 tracking-wider">
              {isLong ? 'Long Rest' : 'Short Rest'}
            </h2>
          </div>
          <button onClick={onClose} className="text-durasteel-500 hover:text-durasteel-300 cursor-pointer">
            <X size={18} />
          </button>
        </div>

        <div className="space-y-2 text-sm text-durasteel-300 mb-6">
          {isLong ? (
            <>
              <p>A long rest will:</p>
              <ul className="list-disc list-inside space-y-1 text-durasteel-400">
                <li>Restore HP to maximum ({character.max_hp})</li>
                <li>Remove all temporary HP</li>
                <li>Restore all Force slots</li>
                <li>Restore all Hit Dice</li>
                <li>Reset death saves</li>
                <li>Reset all ability cooldowns</li>
                <li>Reset lightsaber form cooldowns</li>
              </ul>
            </>
          ) : (
            <>
              <p>A short rest will:</p>
              <ul className="list-disc list-inside space-y-1 text-durasteel-400">
                <li>Reset short-rest ability cooldowns</li>
                <li>Reset short-rest Force ability cooldowns</li>
              </ul>
              <p className="text-durasteel-500 text-xs mt-2">HP is not restored on a short rest.</p>
            </>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onConfirm}
            className="flex-1 bg-holo-500 hover:bg-holo-400 text-hull-950 font-semibold py-2 rounded-lg transition-colors tracking-wide text-sm cursor-pointer"
          >
            Confirm Rest
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-hull-700 hover:bg-hull-600 text-durasteel-200 py-2 rounded-lg transition-colors text-sm cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
