import { useCharacterStore } from '@/stores/characterStore'

export function DetailsStep() {
  const { draft, updateDraft, setStep } = useCharacterStore()

  return (
    <div className="max-w-xl">
      <div className="space-y-6">
        {/* Name */}
        <div>
          <label className="text-xs text-durasteel-400 uppercase tracking-wider block mb-2">
            Character Name
          </label>
          <input
            type="text"
            value={draft.name}
            onChange={(e) => updateDraft({ name: e.target.value })}
            placeholder="Enter character name..."
            className="w-full bg-hull-800 border border-hull-600 rounded-lg px-4 py-3 text-durasteel-100 placeholder-durasteel-500 focus:border-holo-500 focus:outline-none transition-colors"
          />
        </div>

        {/* Backstory */}
        <div>
          <label className="text-xs text-durasteel-400 uppercase tracking-wider block mb-2">
            Backstory
          </label>
          <textarea
            value={draft.backstory}
            onChange={(e) => updateDraft({ backstory: e.target.value })}
            placeholder="Tell us about your character's history..."
            rows={6}
            className="w-full bg-hull-800 border border-hull-600 rounded-lg px-4 py-3 text-durasteel-100 placeholder-durasteel-500 focus:border-holo-500 focus:outline-none transition-colors resize-none"
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <button
          onClick={() => setStep(2)}
          className="border border-durasteel-500 text-durasteel-200 hover:border-holo-500 px-6 py-3 rounded-lg transition-colors tracking-wide text-sm"
        >
          Back
        </button>
        <button
          onClick={() => setStep(4)}
          disabled={!draft.name.trim()}
          className="bg-holo-500 hover:bg-holo-400 disabled:opacity-40 disabled:cursor-not-allowed text-hull-950 font-semibold px-6 py-3 rounded-lg transition-colors tracking-wide"
        >
          Next: Review
        </button>
      </div>
    </div>
  )
}
