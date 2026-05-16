interface DeathSavesProps {
  successes: number
  failures: number
  onUpdate: (updates: Record<string, unknown>) => void
}

export function DeathSaves({ successes, failures, onUpdate }: DeathSavesProps) {
  function toggleSuccess(index: number) {
    const newVal = successes === index + 1 ? index : index + 1
    onUpdate({ death_save_successes: newVal })
  }

  function toggleFailure(index: number) {
    const newVal = failures === index + 1 ? index : index + 1
    onUpdate({ death_save_failures: newVal })
  }

  return (
    <div className="bg-hull-800 border border-hull-600 rounded-lg p-4">
      <h3 className="text-xs text-durasteel-400 uppercase tracking-wider mb-3 text-center">Death Saves</h3>
      <div className="flex justify-center gap-8">
        <div className="text-center">
          <div className="text-xs text-plasma-400 mb-2">Success</div>
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <button
                key={i}
                onClick={() => toggleSuccess(i)}
                className="cursor-pointer"
              >
                <div
                  className={`w-5 h-5 rounded-full border-2 transition-colors ${
                    i < successes
                      ? 'border-plasma-400 bg-plasma-400'
                      : 'border-durasteel-600 hover:border-durasteel-400'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
        <div className="text-center">
          <div className="text-xs text-kyber-400 mb-2">Failure</div>
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <button
                key={i}
                onClick={() => toggleFailure(i)}
                className="cursor-pointer"
              >
                <div
                  className={`w-5 h-5 rounded-full border-2 transition-colors ${
                    i < failures
                      ? 'border-kyber-400 bg-kyber-400'
                      : 'border-durasteel-600 hover:border-durasteel-400'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
