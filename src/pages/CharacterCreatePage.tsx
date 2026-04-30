import { Link } from 'react-router'
import { ArrowLeft } from 'lucide-react'
import { useCharacterStore } from '@/stores/characterStore'
import { RaceStep } from '@/components/creation/RaceStep'
import { ClassStep } from '@/components/creation/ClassStep'
import { AbilityStep } from '@/components/creation/AbilityStep'
import { DetailsStep } from '@/components/creation/DetailsStep'
import { ReviewStep } from '@/components/creation/ReviewStep'

const STEPS = [
  { label: 'Race', component: RaceStep },
  { label: 'Class', component: ClassStep },
  { label: 'Abilities', component: AbilityStep },
  { label: 'Details', component: DetailsStep },
  { label: 'Review', component: ReviewStep },
] as const

export function CharacterCreatePage() {
  const { step, setStep } = useCharacterStore()
  const CurrentStep = STEPS[step].component

  return (
    <div className="min-h-screen bg-hull-900">
      {/* Header */}
      <header className="border-b border-hull-700 bg-hull-800/60 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/dashboard" className="text-durasteel-400 hover:text-durasteel-100 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="font-display text-lg text-durasteel-100 tracking-wider">
            New Character
          </h1>
        </div>
      </header>

      {/* Step indicator */}
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex gap-1">
          {STEPS.map((s, i) => (
            <button
              key={s.label}
              onClick={() => i <= step && setStep(i)}
              className={`flex-1 py-2 text-xs font-semibold tracking-wider rounded transition-colors ${
                i === step
                  ? 'bg-holo-500 text-hull-950'
                  : i < step
                    ? 'bg-hull-700 text-holo-400 cursor-pointer hover:bg-hull-600'
                    : 'bg-hull-800 text-durasteel-500 cursor-not-allowed'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Step content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        <CurrentStep />
      </main>
    </div>
  )
}
