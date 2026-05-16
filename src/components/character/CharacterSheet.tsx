import { useState } from 'react'
import { Swords, Sparkles, User, Zap, Heart, Shield, Gauge, Trash2, Coffee, Moon, Check, Eye, BookOpen } from 'lucide-react'
import { HpTracker } from './HpTracker'
import { AbilityScores } from './AbilityScores'
import { ForceTracker } from './ForceTracker'
import { CreditsTracker } from './CreditsTracker'
import { SkillsPanel } from './SkillsPanel'
import { FeaturesPanel } from './FeaturesPanel'
import { PersonalityPanel } from './PersonalityPanel'
import { ClassResources } from './ClassResources'
import { LightsaberFormTracker } from './LightsaberFormTracker'
import { RestModal } from './RestModal'
import { MulticlassPanel } from './MulticlassPanel'
import { RankUpWizard } from './RankUpWizard'
import { DeathSaves } from './DeathSaves'
import { AttacksPanel } from './AttacksPanel'
import { HitDiceTracker } from './HitDiceTracker'
import { classData } from '@/lib/classData'
import { ArmoryLookup } from './ArmoryLookup'

type SheetTab = 'stats' | 'combat' | 'features' | 'personality'

interface CharacterSheetProps {
  character: any
  onUpdate: (updates: Record<string, unknown>) => void
  onDelete: () => void
}

const TABS: { id: SheetTab; label: string; icon: React.ReactNode }[] = [
  { id: 'stats', label: 'Stats & Skills', icon: <User size={14} /> },
  { id: 'combat', label: 'Combat', icon: <Swords size={14} /> },
  { id: 'features', label: 'Abilities & Gear', icon: <Sparkles size={14} /> },
  { id: 'personality', label: 'Profile', icon: <User size={14} /> },
]

function mod(score: number): number {
  return Math.floor((score - 10) / 2)
}

function formatMod(score: number): string {
  const m = mod(score)
  return m >= 0 ? `+${m}` : `${m}`
}

function toRoman(n: number): string {
  const numerals = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']
  return numerals[n] ?? String(n)
}

export function CharacterSheet({ character, onUpdate, onDelete }: CharacterSheetProps) {
  const [activeTab, setActiveTab] = useState<SheetTab>('stats')
  const [restModal, setRestModal] = useState<'short' | 'long' | null>(null)
  const [editingAC, setEditingAC] = useState(false)
  const [acValue, setAcValue] = useState(character.ac)
  const [editingSpeed, setEditingSpeed] = useState(false)
  const [speedValue, setSpeedValue] = useState(character.speed)
  const [rankUpClassIndex, setRankUpClassIndex] = useState<number | null>(null)
  const [showArmory, setShowArmory] = useState(false)

  const forceSlotsUsed = character.force_slots_used ?? 0
  const cls = classData.find((c) => c.name === character.class_name)
  const hitDie = cls?.hitDie ?? '1d8'
  const passiveForce = 10 + mod(character.wisdom)

  // Compute hit dice total from rank history length + 1 (or default 1)
  const rankCount = (character.rank_history?.length ?? 0) + 1
  const hitDiceTotal = character.hit_dice_total ?? rankCount
  const hitDiceRemaining = character.hit_dice_remaining ?? hitDiceTotal

  function handleShortRest() {
    onUpdate({ force_slots_used: 0 })
    setRestModal(null)
  }

  function handleLongRest() {
    onUpdate({
      hp: character.max_hp,
      temp_hp: 0,
      force_slots_used: 0,
      hit_dice_remaining: hitDiceTotal,
      death_save_successes: 0,
      death_save_failures: 0,
    })
    setRestModal(null)
  }

  function handleSpendForceSlot() {
    if (forceSlotsUsed < character.force_slots) {
      onUpdate({ force_slots_used: forceSlotsUsed + 1 })
    }
  }

  function handleRestoreForceSlots() {
    onUpdate({ force_slots_used: 0 })
  }

  function handleUseForceAbility(_abilityName: string) {
    handleSpendForceSlot()
  }

  function handleUseLightsaberForm(_formName: string) {}

  function saveAC() {
    onUpdate({ ac: acValue })
    setEditingAC(false)
  }

  function saveSpeed() {
    onUpdate({ speed: speedValue })
    setEditingSpeed(false)
  }

  const lightsaberForms = (character.lightsaber_forms ?? []).map((form: string) => ({
    name: form,
    current_rank: 1,
    max_rank: 5,
  }))

  const forceAbilityEntries = (character.force_abilities ?? []).map((name: string) => ({
    name,
    cooldown: 'Short Rest',
  }))

  return (
    <div>
      {/* Header badges */}
      <div className="flex items-center gap-2 flex-wrap mb-4">
        <span className="bg-holo-500/15 text-holo-400 text-xs font-semibold px-2.5 py-1 rounded tracking-wider">
          {character.race}
        </span>
        <span className="bg-hull-700 text-durasteel-200 text-xs font-semibold px-2.5 py-1 rounded tracking-wider">
          {character.class_name}
        </span>
        {character.classes?.[1] && (
          <span className="bg-hull-700 text-durasteel-200 text-xs font-semibold px-2.5 py-1 rounded tracking-wider">
            / {character.classes[1].className}
          </span>
        )}
        <span className="bg-aurodium-500/15 text-aurodium-400 text-xs font-semibold px-2.5 py-1 rounded tracking-wider">
          {character.current_rank} {(character.current_sub_tier ?? 1) > 1 || (character.classes?.[0]?.currentSubTier ?? 1) > 1
            ? toRoman(character.classes?.[0]?.currentSubTier ?? character.current_sub_tier ?? 1)
            : ''}
        </span>
        {character.race_category && (
          <span className="bg-hull-700 text-durasteel-400 text-xs px-2.5 py-1 rounded tracking-wider">
            {character.race_category}
          </span>
        )}
        {character.alignment && character.alignment !== 'N/A' && (
          <span className="bg-hull-700 text-durasteel-400 text-xs px-2.5 py-1 rounded tracking-wider">
            {character.alignment}
          </span>
        )}
      </div>

      {/* ─── TOP COMBAT STATS ROW ─── */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
        {/* HP */}
        <div className="bg-hull-800 border border-hull-600 rounded-lg p-4 text-center">
          <Heart size={20} className="text-kyber-400 mx-auto mb-1" />
          <div className="text-xs text-durasteel-400 uppercase tracking-wider">Hit Points</div>
          <div className="font-mono text-xl">
            <span className={character.hp <= character.max_hp / 4 ? 'text-kyber-400' : 'text-durasteel-100'}>
              {character.hp}
            </span>
            <span className="text-durasteel-500 text-sm"> / {character.max_hp}</span>
          </div>
          {character.temp_hp > 0 && (
            <div className="font-mono text-sm text-holo-400">+{character.temp_hp} temp</div>
          )}
        </div>

        {/* AC */}
        <div className="bg-hull-800 border border-hull-600 rounded-lg p-4 text-center">
          <Shield size={20} className="text-durasteel-300 mx-auto mb-1" />
          <div className="text-xs text-durasteel-400 uppercase tracking-wider">Armor Class</div>
          {editingAC ? (
            <div className="flex items-center justify-center gap-1 mt-1">
              <input
                type="number"
                value={acValue}
                onChange={(e) => setAcValue(parseInt(e.target.value) || 0)}
                className="w-14 text-center font-mono text-xl bg-hull-900 border border-hull-500 rounded px-1 text-durasteel-100 focus:border-holo-500 focus:outline-none"
                autoFocus
              />
              <button onClick={saveAC} className="text-plasma-400 hover:text-plasma-300 cursor-pointer">
                <Check size={14} />
              </button>
            </div>
          ) : (
            <div className="font-mono text-2xl text-durasteel-100 cursor-pointer hover:text-holo-400 transition-colors" onClick={() => setEditingAC(true)}>
              {character.ac}
            </div>
          )}
        </div>

        {/* Speed */}
        <div className="bg-hull-800 border border-hull-600 rounded-lg p-4 text-center">
          <Gauge size={20} className="text-durasteel-300 mx-auto mb-1" />
          <div className="text-xs text-durasteel-400 uppercase tracking-wider">Speed</div>
          {editingSpeed ? (
            <div className="flex items-center justify-center gap-1 mt-1">
              <input
                type="number"
                value={speedValue}
                onChange={(e) => setSpeedValue(parseInt(e.target.value) || 0)}
                className="w-14 text-center font-mono text-xl bg-hull-900 border border-hull-500 rounded px-1 text-durasteel-100 focus:border-holo-500 focus:outline-none"
                autoFocus
              />
              <button onClick={saveSpeed} className="text-plasma-400 hover:text-plasma-300 cursor-pointer">
                <Check size={14} />
              </button>
            </div>
          ) : (
            <div className="font-mono text-2xl text-durasteel-100 cursor-pointer hover:text-holo-400 transition-colors" onClick={() => setEditingSpeed(true)}>
              {character.speed}<span className="text-sm text-durasteel-500"> ft</span>
            </div>
          )}
        </div>

        {/* Passive Force */}
        <div className="bg-hull-800 border border-hull-600 rounded-lg p-4 text-center">
          <Eye size={20} className="text-holo-400 mx-auto mb-1" />
          <div className="text-xs text-durasteel-400 uppercase tracking-wider">Passive Force</div>
          <div className="font-mono text-2xl text-durasteel-100">{passiveForce}</div>
        </div>

        {/* Initiative */}
        <div className="bg-hull-800 border border-hull-600 rounded-lg p-4 text-center">
          <Zap size={20} className="text-aurodium-400 mx-auto mb-1" />
          <div className="text-xs text-durasteel-400 uppercase tracking-wider">Initiative</div>
          <div className="font-mono text-2xl text-durasteel-100">{formatMod(character.dexterity)}</div>
        </div>

        {/* Hit Dice */}
        <HitDiceTracker
          hitDie={hitDie}
          hitDiceTotal={hitDiceTotal}
          hitDiceRemaining={hitDiceRemaining}
          onUpdate={onUpdate}
        />
      </div>

      {/* HP Tracker */}
      <div className="bg-hull-800 border border-hull-600 rounded-lg p-4 mb-4">
        <HpTracker
          currentHp={character.hp}
          maxHp={character.max_hp}
          tempHp={character.temp_hp}
          onUpdate={onUpdate}
        />
      </div>

      {/* Death Saves (show when HP is 0) */}
      {character.hp <= 0 && (
        <div className="mb-4">
          <DeathSaves
            successes={character.death_save_successes ?? 0}
            failures={character.death_save_failures ?? 0}
            onUpdate={onUpdate}
          />
        </div>
      )}

      {/* Force Slots, Credits & Class Resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        {character.force_slots > 0 && (
          <ForceTracker
            forceSlots={character.force_slots}
            forceSlotsUsed={forceSlotsUsed}
            forceAbilities={forceAbilityEntries}
            onUpdate={onUpdate}
            onSpendSlot={handleSpendForceSlot}
            onRestoreSlots={handleRestoreForceSlots}
            onUseAbility={handleUseForceAbility}
          />
        )}
        <CreditsTracker credits={character.credits} onUpdate={onUpdate} />
      </div>

      {/* Lightsaber Forms */}
      {lightsaberForms.length > 0 && (
        <div className="mb-4">
          <LightsaberFormTracker forms={lightsaberForms} onUseForm={handleUseLightsaberForm} />
        </div>
      )}

      {/* Class-specific resources */}
      <div className="mb-4">
        <ClassResources character={character} onUpdate={onUpdate} />
      </div>

      {/* Class Progression & Multiclass */}
      <div className="mb-4">
        <MulticlassPanel
          character={character}
          onUpdate={onUpdate}
          onRankUp={(classIndex) => setRankUpClassIndex(classIndex)}
        />
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        <button
          onClick={() => setRestModal('short')}
          className="flex items-center gap-1.5 bg-hull-800 border border-hull-600 hover:border-holo-500 text-durasteel-200 text-sm px-3 py-2 rounded-lg transition-colors cursor-pointer"
        >
          <Coffee size={14} /> Short Rest
        </button>
        <button
          onClick={() => setRestModal('long')}
          className="flex items-center gap-1.5 bg-hull-800 border border-hull-600 hover:border-holo-500 text-durasteel-200 text-sm px-3 py-2 rounded-lg transition-colors cursor-pointer"
        >
          <Moon size={14} /> Long Rest
        </button>
        <button
          onClick={() => setShowArmory(true)}
          className="flex items-center gap-1.5 bg-hull-800 border border-hull-600 hover:border-aurodium-500 text-durasteel-200 text-sm px-3 py-2 rounded-lg transition-colors cursor-pointer"
        >
          <BookOpen size={14} /> Armory
        </button>
        <div className="flex-1" />
        <button
          onClick={onDelete}
          className="flex items-center gap-1.5 text-kyber-400 hover:text-kyber-300 text-sm px-3 py-2 transition-colors cursor-pointer"
        >
          <Trash2 size={14} /> Delete
        </button>
      </div>

      {/* ─── TAB NAVIGATION ─── */}
      <div className="flex items-center gap-1 mb-4 border-b border-hull-700 overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-display uppercase tracking-wider transition-colors cursor-pointer border-b-2 -mb-px whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-holo-400 text-holo-400'
                : 'border-transparent text-durasteel-500 hover:text-durasteel-300'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* ─── TAB CONTENT ─── */}

      {/* STATS & SKILLS */}
      {activeTab === 'stats' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 space-y-4">
            <AbilityScores character={character} onUpdate={onUpdate} />

            {/* Saving Throws */}
            <div className="bg-hull-800 border border-hull-600 rounded-lg p-4">
              <h3 className="text-xs text-durasteel-400 uppercase tracking-wider mb-3">Saving Throws</h3>
              <div className="grid grid-cols-3 gap-2">
                {(['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'] as const).map((ability) => {
                  const isProficient = (character.saving_throws ?? []).includes(ability)
                  const m = mod(character[ability])
                  return (
                    <div
                      key={ability}
                      className={`flex items-center gap-2 text-sm p-2 rounded ${
                        isProficient ? 'bg-holo-500/10' : ''
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full ${isProficient ? 'bg-holo-400' : 'bg-hull-600'}`} />
                      <span className="text-durasteel-300 capitalize text-xs">{ability.slice(0, 3)}</span>
                      <span className="font-mono text-durasteel-100 ml-auto">
                        {m >= 0 ? '+' : ''}{m}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            {/* Skills - full list like the paper sheet */}
            <SkillsPanel character={character} onUpdate={onUpdate} />

            {/* Proficiencies */}
            <div className="bg-hull-800 border border-hull-600 rounded-lg p-4">
              <h3 className="text-xs text-durasteel-400 uppercase tracking-wider mb-3">Proficiencies</h3>
              <div className="flex flex-wrap gap-2">
                {(character.proficiencies ?? []).length > 0 ? (
                  (character.proficiencies as string[]).map((prof: string) => (
                    <span key={prof} className="bg-hull-700 text-durasteel-300 text-xs px-2 py-1 rounded">
                      {prof}
                    </span>
                  ))
                ) : (
                  <p className="text-durasteel-500 text-sm">None</p>
                )}
              </div>
            </div>

            {/* Languages */}
            <div className="bg-hull-800 border border-hull-600 rounded-lg p-4">
              <h3 className="text-xs text-durasteel-400 uppercase tracking-wider mb-3">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {(character.languages ?? []).map((lang: string) => (
                  <span key={lang} className="bg-hull-700 text-durasteel-300 text-xs px-2 py-1 rounded">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* COMBAT */}
      {activeTab === 'combat' && (
        <div className="space-y-4">
          <AttacksPanel character={character} onUpdate={onUpdate} />

          {/* Force Abilities / Gadgets (always visible section like the paper sheet) */}
          <div className="bg-hull-800 border border-hull-600 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Zap size={14} className="text-holo-400" />
              <h3 className="text-xs text-durasteel-400 uppercase tracking-wider">Force Abilities / Gadgets</h3>
            </div>
            {(character.force_abilities ?? []).length > 0 ? (
              <div className="space-y-2">
                {(character.force_abilities as string[]).map((ability: string, i: number) => (
                  <div key={i} className="bg-holo-500/5 border border-holo-500/20 rounded p-3 text-sm text-durasteel-200">
                    {ability}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-durasteel-500 text-sm">No Force abilities or gadgets</p>
            )}
          </div>

          {/* Death Saves (always visible in combat tab) */}
          <DeathSaves
            successes={character.death_save_successes ?? 0}
            failures={character.death_save_failures ?? 0}
            onUpdate={onUpdate}
          />
        </div>
      )}

      {/* FEATURES & GEAR */}
      {activeTab === 'features' && (
        <FeaturesPanel character={character} onUpdate={onUpdate} />
      )}

      {/* PROFILE */}
      {activeTab === 'personality' && (
        <PersonalityPanel character={character} onUpdate={onUpdate} />
      )}

      {/* Rest Modal */}
      {restModal && (
        <RestModal
          type={restModal}
          character={character}
          onConfirm={restModal === 'long' ? handleLongRest : handleShortRest}
          onClose={() => setRestModal(null)}
        />
      )}

      {/* Rank Up Wizard */}
      {rankUpClassIndex !== null && (
        <RankUpWizard
          open={true}
          onClose={() => setRankUpClassIndex(null)}
          character={character}
          classIndex={rankUpClassIndex}
          onRankUp={onUpdate}
        />
      )}

      {/* Armory & Compendium */}
      {showArmory && (
        <ArmoryLookup
          onClose={() => setShowArmory(false)}
          onAddAttack={(attack) => {
            const currentAttacks = character.attacks ?? []
            onUpdate({ attacks: [...currentAttacks, attack] })
          }}
        />
      )}
    </div>
  )
}
