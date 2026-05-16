export interface AbilityScores {
  strength: number
  dexterity: number
  constitution: number
  intelligence: number
  wisdom: number
  charisma: number
}

export type AbilityName = keyof AbilityScores

export type Race =
  // Organics
  | 'Human' | 'Clone' | 'Mandalorian' | 'Night Sister' | 'Zabrak'
  | 'Twi\'lek' | 'Togruta' | 'Chiss' | 'Chagrian' | 'Cerean'
  | 'Iktotchi' | 'Utapaun' | 'Umbaran' | 'Wookie' | 'Tuscan'
  | 'Trandosian' | 'Gungan' | 'Rodian' | 'Nautolan' | 'Bith'
  | 'Sullustan' | 'Clawdites' | 'Mon Calamari' | 'Quarren' | 'Bothan'
  | 'Kel Dor' | 'Kaleesh' | 'Jawa' | 'Ewok' | 'Ugnaught'
  | 'Gamorrean' | 'Ithorian' | 'Ortolan' | 'Lasat' | 'Yuzzum'
  | 'Pyke' | 'Hutt' | 'Toydarian' | 'Besalisk'
  // Droids
  | 'B1' | 'B2' | 'BX' | 'Astromech' | 'Protocol' | 'Tactical'
  | 'IG' | 'Magnaguard' | 'Security' | 'Medical' | 'Gonk' | 'Pit Droid'

export type RaceCategory = 'Organic' | 'Droid'

export type ClassName =
  | 'Jedi' | 'Sith' | 'Bounty Hunter' | 'Scoundrel' | 'Senator'
  | 'Tribesman' | 'Storm Trooper' | 'Pilot' | 'Medic' | 'Musician'
  | 'Tinkerer'

export type Size = 'Small' | 'Medium' | 'Large'

export interface RaceData {
  name: Race
  category: RaceCategory
  abilityScoreBonus: Partial<AbilityScores>
  adulthood: string
  lifeSpan: string
  alignment: string
  size: Size
  speed: number
  languages: string[]
  abilities: string[]
  equipment: string[]
}

export interface ClassData {
  name: ClassName
  description: string
  hitPointsBase: number
  hitDie: string
  proficiencies: string[]
  armorProficiencies: string[]
  savingThrows: [AbilityName, AbilityName]
  skillAccess: string[]
  skillPicks: number
  startingRank: string
  evolutionTree: EvolutionNode[]
}

export interface EvolutionNode {
  rankName: string
  tier: number // overall tier in the tree (1, 2, 3...)
  maxSubTier: number // how many sub-tiers within this rank (e.g. Acolyte I, II, III = 3)
  trigger: string
  abilities: string[]
  equipment: string[]
  forceSlots?: number
  specialAbility?: { name: string; description: string }
  branches?: string[] // names of branches available from this node
  asiAtSubTiers?: number[] // which sub-tiers grant ASI (e.g. [2, 3])
}

// Tracks a single class's rank progression
export interface ClassProgression {
  className: ClassName
  currentRank: string
  currentSubTier: number // e.g. if Padawan III, this is 3
  rankHistory: string[] // previous ranks passed through
}

export type WeaponCategory =
  | 'Lightsaber' | 'Pistol Blaster' | 'Rifle Blaster'
  | 'Heavy Blaster' | 'Sniper Blaster' | 'Melee' | 'Nomadic'

export interface Weapon {
  name: string
  category: WeaponCategory
  cost: string
  damage: string
  rangeOrType: string
  attributes: string[]
}

export interface Shield {
  name: string
  cost: string
  acBonus: number
  against: string[]
  attributes: string[]
}

export interface AdvancedWeapon {
  name: string
  price: string
  description: string
  range: string
  damage: string
  worn: string
}

export interface ForceAbility {
  name: string
  access: string[]
  description: string
  range: string
  higherRank: string
  cooldown: string
}

export interface LightsaberForm {
  name: string
  title: string
  ranks: LightsaberFormRank[]
}

export interface LightsaberFormRank {
  rank: number
  name: string
  description: string
  cooldown: string
}

export interface NightSisterSpell {
  name: string
  level: number
  description: string
  range: string
  higherRank: string
  cooldown: string
}

export interface Character {
  id: string
  userId: string
  name: string
  race: Race
  className: ClassName
  currentRank: string
  abilityScores: AbilityScores
  hp: number
  maxHp: number
  tempHp: number
  skills: string[]
  equipment: string[]
  forceSlots: number
  forceAbilities: string[]
  lightsaberForms: string[]
  credits: number
  backstory: string
  createdAt: string
  updatedAt: string
}
