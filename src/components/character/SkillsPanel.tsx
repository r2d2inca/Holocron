import { useState } from 'react'
import { Plus, X } from 'lucide-react'

// Remnants RPG skills with their linked ability
const SKILL_MAP: Record<string, string> = {
  'Acrobatics': 'dexterity',
  'Athletics': 'strength',
  'Aura': 'charisma',
  'Deception': 'charisma',
  'Force': 'wisdom',
  'Gaslighting': 'charisma',
  'Insight': 'wisdom',
  'Intimidation': 'charisma',
  'Investigation': 'intelligence',
  'Mechanics': 'intelligence',
  'Medicine': 'intelligence',
  'Nature': 'wisdom',
  'Perception': 'wisdom',
  'Performance': 'charisma',
  'Persuasion': 'charisma',
  'Piloting': 'dexterity',
  'Sleight of Hand': 'dexterity',
  'Stealth': 'dexterity',
  'Survival': 'wisdom',
}

interface SkillsPanelProps {
  character: any
  onUpdate: (updates: Record<string, unknown>) => void
}

export function SkillsPanel({ character, onUpdate }: SkillsPanelProps) {
  const [showAdd, setShowAdd] = useState(false)
  const skills: string[] = character.skills ?? []

  function getModifier(ability: string): number {
    return Math.floor((character[ability] - 10) / 2)
  }

  function formatMod(mod: number): string {
    return mod >= 0 ? `+${mod}` : `${mod}`
  }

  function removeSkill(skill: string) {
    onUpdate({ skills: skills.filter((s) => s !== skill) })
  }

  function addSkill(skill: string) {
    if (skills.includes(skill)) return
    onUpdate({ skills: [...skills, skill] })
    setShowAdd(false)
  }

  const availableSkills = Object.keys(SKILL_MAP).filter((s) => !skills.includes(s))

  return (
    <div className="bg-hull-800 border border-hull-600 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs text-durasteel-400 uppercase tracking-wider">Skills</h3>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="text-durasteel-500 hover:text-holo-400 transition-colors cursor-pointer"
        >
          <Plus size={14} />
        </button>
      </div>

      {showAdd && (
        <div className="mb-3 max-h-40 overflow-y-auto bg-hull-900 border border-hull-600 rounded p-2 space-y-1">
          {availableSkills.map((skill) => (
            <button
              key={skill}
              onClick={() => addSkill(skill)}
              className="block w-full text-left text-xs text-durasteel-300 hover:text-holo-400 hover:bg-hull-700 px-2 py-1 rounded transition-colors cursor-pointer"
            >
              {skill} <span className="text-durasteel-500">({SKILL_MAP[skill].slice(0, 3).toUpperCase()})</span>
            </button>
          ))}
        </div>
      )}

      <div className="space-y-1">
        {skills.length > 0 ? (
          skills.sort().map((skill) => {
            const ability = SKILL_MAP[skill] || 'wisdom'
            const mod = getModifier(ability)
            return (
              <div key={skill} className="flex items-center gap-2 text-sm py-1 group">
                <div className="w-2 h-2 rounded-full bg-holo-400" />
                <span className="text-durasteel-200 flex-1">{skill}</span>
                <span className="text-xs text-durasteel-500">{ability.slice(0, 3).toUpperCase()}</span>
                <span className="font-mono text-durasteel-100 w-8 text-right">{formatMod(mod)}</span>
                <button
                  onClick={() => removeSkill(skill)}
                  className="text-durasteel-500 hover:text-kyber-400 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                >
                  <X size={12} />
                </button>
              </div>
            )
          })
        ) : (
          <p className="text-durasteel-500 text-sm">No skills selected</p>
        )}
      </div>
    </div>
  )
}
