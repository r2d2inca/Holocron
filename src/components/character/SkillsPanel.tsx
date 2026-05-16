// Full skills list matching the Remnants character sheet
// All skills always visible with proficiency toggle and modifier display

const ALL_SKILLS: { name: string; ability: string }[] = [
  { name: 'Acrobatics', ability: 'dexterity' },
  { name: 'Animal Handling', ability: 'wisdom' },
  { name: 'Athletics', ability: 'strength' },
  { name: 'Aura', ability: 'charisma' },
  { name: 'Deception', ability: 'charisma' },
  { name: 'Force', ability: 'wisdom' },
  { name: 'Gaslight', ability: 'charisma' },
  { name: 'History', ability: 'intelligence' },
  { name: 'Insight', ability: 'wisdom' },
  { name: 'Intimidation', ability: 'charisma' },
  { name: 'Investigation', ability: 'intelligence' },
  { name: 'Medicine', ability: 'intelligence' },
  { name: 'Nature', ability: 'wisdom' },
  { name: 'Perception', ability: 'wisdom' },
  { name: 'Performance', ability: 'charisma' },
  { name: 'Persuasion', ability: 'charisma' },
  { name: 'Piloting', ability: 'dexterity' },
  { name: 'Religion', ability: 'intelligence' },
  { name: 'Sleight of Hand', ability: 'dexterity' },
  { name: 'Stealth', ability: 'dexterity' },
  { name: 'Survival', ability: 'wisdom' },
]

interface SkillsPanelProps {
  character: any
  onUpdate: (updates: Record<string, unknown>) => void
}

export function SkillsPanel({ character, onUpdate }: SkillsPanelProps) {
  const proficientSkills: string[] = character.skills ?? []

  function toggleSkill(skillName: string) {
    if (proficientSkills.includes(skillName)) {
      onUpdate({ skills: proficientSkills.filter((s) => s !== skillName) })
    } else {
      onUpdate({ skills: [...proficientSkills, skillName] })
    }
  }

  function getModifier(ability: string): number {
    return Math.floor(((character[ability] ?? 10) - 10) / 2)
  }

  function formatMod(mod: number): string {
    return mod >= 0 ? `+${mod}` : `${mod}`
  }

  return (
    <div className="bg-hull-800 border border-hull-600 rounded-lg p-4">
      <h3 className="text-xs text-durasteel-400 uppercase tracking-wider mb-3">Skills</h3>
      <div className="space-y-0.5">
        {ALL_SKILLS.map(({ name, ability }) => {
          const isProficient = proficientSkills.includes(name)
          const mod = getModifier(ability)
          return (
            <button
              key={name}
              onClick={() => toggleSkill(name)}
              className="flex items-center gap-2 w-full text-left py-1.5 px-1 rounded hover:bg-hull-700/50 transition-colors cursor-pointer group"
            >
              <div
                className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center transition-colors ${
                  isProficient
                    ? 'border-holo-400 bg-holo-400'
                    : 'border-durasteel-600 group-hover:border-durasteel-400'
                }`}
              >
                {isProficient && (
                  <div className="w-1.5 h-1.5 rounded-full bg-hull-900" />
                )}
              </div>
              <span className={`text-sm flex-1 ${isProficient ? 'text-durasteel-100' : 'text-durasteel-400'}`}>
                {name}
              </span>
              <span className="text-xs text-durasteel-500 w-8">{ability.slice(0, 3).toUpperCase()}</span>
              <span className={`font-mono text-sm w-7 text-right ${isProficient ? 'text-holo-400' : 'text-durasteel-300'}`}>
                {formatMod(mod)}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
