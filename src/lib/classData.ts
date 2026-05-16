import type { ClassData } from './types'

export const classData: ClassData[] = [
  {
    name: 'Jedi',
    description:
      'Peacekeeping force users who serve as guardians of justice and balance in the galaxy.',
    hitPointsBase: 10,
    hitDie: '1d10',
    proficiencies: ['Lightsaber'],
    armorProficiencies: ['Light Armor', 'Medium Armor'],
    savingThrows: ['wisdom', 'constitution'],
    skillAccess: ['Force'],
    skillPicks: 2,
    startingRank: 'Youngling',
    evolutionTree: [
      { rankName: 'Youngling', tier: 1, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Padawan'] },
      { rankName: 'Padawan',   tier: 2, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Knight'], asiAtSubTiers: [3] },
      { rankName: 'Knight',    tier: 3, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Master', 'Diplomat', 'Sentinel', 'Hermit', 'Code Breaker'], asiAtSubTiers: [2] },
      // Master branch
      { rankName: 'Master',       tier: 4, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Grandmaster'], asiAtSubTiers: [3] },
      { rankName: 'Grandmaster',  tier: 5, maxSubTier: 1, trigger: '', abilities: [], equipment: [] },
      // Diplomat branch
      { rankName: 'Diplomat',    tier: 4, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Negotiator'], asiAtSubTiers: [3] },
      { rankName: 'Negotiator',  tier: 5, maxSubTier: 2, trigger: '', abilities: [], equipment: [], branches: ['Peacekeeper'] },
      { rankName: 'Peacekeeper', tier: 6, maxSubTier: 1, trigger: '', abilities: [], equipment: [] },
      // Sentinel branch
      { rankName: 'Sentinel', tier: 4, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Vanguard'], asiAtSubTiers: [3] },
      { rankName: 'Vanguard', tier: 5, maxSubTier: 2, trigger: '', abilities: [], equipment: [], branches: ['Guardian'] },
      { rankName: 'Guardian', tier: 6, maxSubTier: 1, trigger: '', abilities: [], equipment: [] },
      // Hermit branch
      { rankName: 'Hermit',              tier: 4, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Silent Fist'], asiAtSubTiers: [3] },
      { rankName: 'Silent Fist',         tier: 5, maxSubTier: 2, trigger: '', abilities: [], equipment: [], branches: ['One with the Force'] },
      { rankName: 'One with the Force',  tier: 6, maxSubTier: 1, trigger: '', abilities: [], equipment: [] },
      // Code Breaker branch
      { rankName: 'Code Breaker', tier: 4, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Apostate'], asiAtSubTiers: [3] },
      { rankName: 'Apostate',     tier: 5, maxSubTier: 2, trigger: '', abilities: [], equipment: [], branches: ['Fallen'] },
      { rankName: 'Fallen',       tier: 6, maxSubTier: 1, trigger: '', abilities: [], equipment: [] },
    ],
  },

  {
    name: 'Sith',
    description:
      'Dark side force users who draw power from passion, anger, and the darker currents of the Force.',
    hitPointsBase: 8,
    hitDie: '1d8',
    proficiencies: ['Lightsaber'],
    armorProficiencies: ['Light Armor'],
    savingThrows: ['strength', 'wisdom'],
    skillAccess: ['Force'],
    skillPicks: 2,
    startingRank: 'Acolyte',
    evolutionTree: [
      { rankName: 'Acolyte',    tier: 1, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Apprentice'] },
      { rankName: 'Apprentice', tier: 2, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Sith', 'Vengeful', 'Duelist', 'Assassin', 'Conflicted'], asiAtSubTiers: [3] },
      // Sith branch
      { rankName: 'Sith',  tier: 3, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Lord'], asiAtSubTiers: [2] },
      { rankName: 'Lord',  tier: 4, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Darth'], asiAtSubTiers: [3] },
      { rankName: 'Darth', tier: 5, maxSubTier: 1, trigger: '', abilities: [], equipment: [] },
      // Vengeful branch
      { rankName: 'Vengeful', tier: 3, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Hateful'], asiAtSubTiers: [2] },
      { rankName: 'Hateful',  tier: 4, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Darth'], asiAtSubTiers: [3] },
      // Duelist branch
      { rankName: 'Duelist', tier: 3, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Count'], asiAtSubTiers: [2] },
      { rankName: 'Count',   tier: 4, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Darth'], asiAtSubTiers: [3] },
      // Assassin branch
      { rankName: 'Assassin',        tier: 3, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Inquisitor'], asiAtSubTiers: [2] },
      { rankName: 'Inquisitor',      tier: 4, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Grand Inquisitor'], asiAtSubTiers: [3] },
      { rankName: 'Grand Inquisitor',tier: 5, maxSubTier: 1, trigger: '', abilities: [], equipment: [] },
      // Conflicted branch
      { rankName: 'Conflicted', tier: 3, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Gray'], asiAtSubTiers: [2] },
      { rankName: 'Gray',       tier: 4, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Redeemed'], asiAtSubTiers: [3] },
      { rankName: 'Redeemed',   tier: 5, maxSubTier: 1, trigger: '', abilities: [], equipment: [] },
    ],
  },

  {
    name: 'Bounty Hunter',
    description:
      'Hired guns who track down targets across the galaxy for credits, glory, or revenge.',
    hitPointsBase: 8,
    hitDie: '1d8',
    proficiencies: ['All Blasters', 'All Melee Weapons'],
    armorProficiencies: ['Light Armor', 'Medium Armor', 'Heavy Armor'],
    savingThrows: ['strength', 'dexterity'],
    skillAccess: [],
    skillPicks: 3,
    startingRank: 'Rookie',
    evolutionTree: [
      { rankName: 'Rookie', tier: 1, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Hunter'] },
      { rankName: 'Hunter', tier: 2, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Goon', 'Outlaw', 'Mauler', 'Saboteur', 'Wrecker'], asiAtSubTiers: [3] },
      // Goon branch
      { rankName: 'Goon',      tier: 3, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Henchman'], asiAtSubTiers: [2] },
      { rankName: 'Henchman',  tier: 4, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Enforcer'], asiAtSubTiers: [3] },
      { rankName: 'Enforcer',  tier: 5, maxSubTier: 1, trigger: '', abilities: [], equipment: [] },
      // Outlaw branch
      { rankName: 'Outlaw',     tier: 3, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Gunslinger'], asiAtSubTiers: [2] },
      { rankName: 'Gunslinger', tier: 4, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Cowboy'], asiAtSubTiers: [3] },
      { rankName: 'Cowboy',     tier: 5, maxSubTier: 1, trigger: '', abilities: [], equipment: [] },
      // Mauler branch
      { rankName: 'Mauler',      tier: 3, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Berserker'], asiAtSubTiers: [2] },
      { rankName: 'Berserker',   tier: 4, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Juggernaut'], asiAtSubTiers: [3] },
      { rankName: 'Juggernaut',  tier: 5, maxSubTier: 1, trigger: '', abilities: [], equipment: [] },
      // Saboteur branch
      { rankName: 'Saboteur',    tier: 3, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Deadshot'], asiAtSubTiers: [2] },
      { rankName: 'Deadshot',    tier: 4, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Night Stalker'], asiAtSubTiers: [3] },
      { rankName: 'Night Stalker',tier: 5, maxSubTier: 1, trigger: '', abilities: [], equipment: [] },
      // Wrecker branch
      { rankName: 'Wrecker',           tier: 3, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Explosives Expert'], asiAtSubTiers: [2] },
      { rankName: 'Explosives Expert', tier: 4, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Demolitionist'], asiAtSubTiers: [3] },
      { rankName: 'Demolitionist',     tier: 5, maxSubTier: 1, trigger: '', abilities: [], equipment: [] },
    ],
  },

  {
    name: 'Scoundrel',
    description:
      'Criminals and con artists who live by their wits, charm, and a healthy disregard for the law.',
    hitPointsBase: 8,
    hitDie: '1d8',
    proficiencies: ['Pistol Blaster', 'Knife'],
    armorProficiencies: ['Light Armor'],
    savingThrows: ['dexterity', 'charisma'],
    skillAccess: [],
    skillPicks: 3,
    startingRank: 'Street Rat',
    evolutionTree: [
      { rankName: 'Street Rat', tier: 1, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Scoundrel'] },
      { rankName: 'Scoundrel',  tier: 2, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Hustler', 'Player', 'Swindler', 'Scallywag', 'Dealer'], asiAtSubTiers: [3] },
      // Hustler branch
      { rankName: 'Hustler',  tier: 3, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Thief'], asiAtSubTiers: [2] },
      { rankName: 'Thief',    tier: 4, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Smuggler'], asiAtSubTiers: [3] },
      { rankName: 'Smuggler', tier: 5, maxSubTier: 1, trigger: '', abilities: [], equipment: [] },
      // Player branch
      { rankName: 'Player',            tier: 3, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Gambler'], asiAtSubTiers: [2] },
      { rankName: 'Gambler',           tier: 4, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Heart of the Cards'], asiAtSubTiers: [3] },
      { rankName: 'Heart of the Cards',tier: 5, maxSubTier: 1, trigger: '', abilities: [], equipment: [] },
      // Swindler branch
      { rankName: 'Swindler',     tier: 3, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Trickster'], asiAtSubTiers: [2] },
      { rankName: 'Trickster',    tier: 4, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Silver Tongue'], asiAtSubTiers: [3] },
      { rankName: 'Silver Tongue',tier: 5, maxSubTier: 1, trigger: '', abilities: [], equipment: [] },
      // Scallywag branch
      { rankName: 'Scallywag', tier: 3, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Pirate'], asiAtSubTiers: [2] },
      { rankName: 'Pirate',    tier: 4, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Marauder'], asiAtSubTiers: [3] },
      { rankName: 'Marauder',  tier: 5, maxSubTier: 1, trigger: '', abilities: [], equipment: [] },
      // Dealer branch
      { rankName: 'Dealer',    tier: 3, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Chemist'], asiAtSubTiers: [2] },
      { rankName: 'Chemist',   tier: 4, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Drug Lord'], asiAtSubTiers: [3] },
      { rankName: 'Drug Lord', tier: 5, maxSubTier: 1, trigger: '', abilities: [], equipment: [] },
    ],
  },

  {
    name: 'Senator',
    description:
      'Politicians who wield influence and words as weapons to shape the fate of the galaxy.',
    hitPointsBase: 6,
    hitDie: '1d6',
    proficiencies: ['Pistol Blaster'],
    armorProficiencies: [],
    savingThrows: ['intelligence', 'charisma'],
    skillAccess: [],
    skillPicks: 3,
    startingRank: 'Delegate',
    evolutionTree: [
      { rankName: 'Delegate', tier: 1, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Senator'] },
      { rankName: 'Senator',  tier: 2, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Speaker', 'Voice', 'Noble', 'Puppeteer', 'Analyst'], asiAtSubTiers: [3] },
      // Speaker branch
      { rankName: 'Speaker',        tier: 3, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Chancellor'], asiAtSubTiers: [2] },
      { rankName: 'Chancellor',     tier: 4, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['High Chancellor'], asiAtSubTiers: [3] },
      { rankName: 'High Chancellor',tier: 5, maxSubTier: 1, trigger: '', abilities: [], equipment: [] },
      // Voice branch
      { rankName: 'Voice',    tier: 3, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Populist'], asiAtSubTiers: [2] },
      { rankName: 'Populist', tier: 4, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Savior'], asiAtSubTiers: [3] },
      { rankName: 'Savior',   tier: 5, maxSubTier: 1, trigger: '', abilities: [], equipment: [] },
      // Noble branch
      { rankName: 'Noble',    tier: 3, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Sovereign'], asiAtSubTiers: [2] },
      { rankName: 'Sovereign',tier: 4, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Royalty'], asiAtSubTiers: [3] },
      { rankName: 'Royalty',  tier: 5, maxSubTier: 1, trigger: '', abilities: [], equipment: [] },
      // Puppeteer branch
      { rankName: 'Puppeteer',    tier: 3, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Manipulator'], asiAtSubTiers: [2] },
      { rankName: 'Manipulator',  tier: 4, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Shadow Ruler'], asiAtSubTiers: [3] },
      { rankName: 'Shadow Ruler', tier: 5, maxSubTier: 1, trigger: '', abilities: [], equipment: [] },
      // Analyst branch
      { rankName: 'Analyst',   tier: 3, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Banker'], asiAtSubTiers: [2] },
      { rankName: 'Banker',    tier: 4, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Economist'], asiAtSubTiers: [3] },
      { rankName: 'Economist', tier: 5, maxSubTier: 1, trigger: '', abilities: [], equipment: [] },
    ],
  },

  {
    name: 'Tribesman',
    description:
      'Primitive warriors deeply connected to nature and their homeworld, fierce in battle and wise in survival.',
    hitPointsBase: 8,
    hitDie: '1d8',
    proficiencies: ['Nomadic Weapons', 'Melee Weapons'],
    armorProficiencies: [],
    savingThrows: ['dexterity', 'wisdom'],
    skillAccess: ['Nature'],
    skillPicks: 3,
    startingRank: 'Nomad',
    evolutionTree: [
      { rankName: 'Nomad',     tier: 1, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Tribesman'] },
      { rankName: 'Tribesman', tier: 2, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Warrior', 'Catcher', 'Healer', 'Tamer', 'Dimwit'], asiAtSubTiers: [3] },
      // Warrior branch
      { rankName: 'Warrior',  tier: 3, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Hero'], asiAtSubTiers: [2] },
      { rankName: 'Hero',     tier: 4, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Champion'], asiAtSubTiers: [3] },
      { rankName: 'Champion', tier: 5, maxSubTier: 1, trigger: '', abilities: [], equipment: [] },
      // Catcher branch
      { rankName: 'Catcher',  tier: 3, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Trapper'], asiAtSubTiers: [2] },
      { rankName: 'Trapper',  tier: 4, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Predator'], asiAtSubTiers: [3] },
      { rankName: 'Predator', tier: 5, maxSubTier: 1, trigger: '', abilities: [], equipment: [] },
      // Healer branch
      { rankName: 'Healer', tier: 3, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Shaman'], asiAtSubTiers: [2] },
      { rankName: 'Shaman', tier: 4, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Sage'], asiAtSubTiers: [3] },
      { rankName: 'Sage',   tier: 5, maxSubTier: 1, trigger: '', abilities: [], equipment: [] },
      // Tamer branch
      { rankName: 'Tamer',       tier: 3, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Beastmaster'], asiAtSubTiers: [2] },
      { rankName: 'Beastmaster', tier: 4, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Alpha'], asiAtSubTiers: [3] },
      { rankName: 'Alpha',       tier: 5, maxSubTier: 1, trigger: '', abilities: [], equipment: [] },
      // Dimwit branch
      { rankName: 'Dimwit',      tier: 3, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Idiot'], asiAtSubTiers: [2] },
      { rankName: 'Idiot',       tier: 4, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Serendipity'], asiAtSubTiers: [3] },
      { rankName: 'Serendipity', tier: 5, maxSubTier: 1, trigger: '', abilities: [], equipment: [] },
    ],
  },

  {
    name: 'Storm Trooper',
    description:
      'Imperial soldiers trained for discipline, firepower, and absolute loyalty to the Empire.',
    hitPointsBase: 8,
    hitDie: '1d8',
    proficiencies: ['Blaster Rifle'],
    armorProficiencies: ['Plastoid Armor'],
    savingThrows: ['dexterity', 'constitution'],
    skillAccess: ['Athletics', 'Aura', 'Survival'],
    skillPicks: 0,
    startingRank: 'Recruit',
    evolutionTree: [
      { rankName: 'Recruit',      tier: 1, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Storm Trooper'] },
      { rankName: 'Storm Trooper',tier: 2, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Shock Trooper', 'Boost Trooper', 'Gunner', 'Scout', 'Officer'], asiAtSubTiers: [3] },
      // Shock Trooper branch
      { rankName: 'Shock Trooper', tier: 3, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Death Trooper'], asiAtSubTiers: [2] },
      { rankName: 'Death Trooper', tier: 4, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Purge Trooper'], asiAtSubTiers: [3] },
      { rankName: 'Purge Trooper', tier: 5, maxSubTier: 1, trigger: '', abilities: [], equipment: [] },
      // Boost Trooper branch
      { rankName: 'Boost Trooper',tier: 3, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Jet Trooper'], asiAtSubTiers: [2] },
      { rankName: 'Jet Trooper',  tier: 4, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Stormhawk'], asiAtSubTiers: [3] },
      { rankName: 'Stormhawk',    tier: 5, maxSubTier: 1, trigger: '', abilities: [], equipment: [] },
      // Gunner branch
      { rankName: 'Gunner',       tier: 3, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Heavy Trooper'], asiAtSubTiers: [2] },
      { rankName: 'Heavy Trooper',tier: 4, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Armor Trooper'], asiAtSubTiers: [3] },
      { rankName: 'Armor Trooper',tier: 5, maxSubTier: 1, trigger: '', abilities: [], equipment: [] },
      // Scout branch
      { rankName: 'Scout',   tier: 3, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Spy'], asiAtSubTiers: [2] },
      { rankName: 'Spy',     tier: 4, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Usurper'], asiAtSubTiers: [3] },
      { rankName: 'Usurper', tier: 5, maxSubTier: 1, trigger: '', abilities: [], equipment: [] },
      // Officer branch
      { rankName: 'Officer',    tier: 3, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['ISB Agent'], asiAtSubTiers: [2] },
      { rankName: 'ISB Agent',  tier: 4, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Admiral'], asiAtSubTiers: [3] },
      { rankName: 'Admiral',    tier: 5, maxSubTier: 1, trigger: '', abilities: [], equipment: [] },
    ],
  },

  {
    name: 'Pilot',
    description:
      'Vehicle experts who dominate the skies, hyperspace lanes, and battlefields from the cockpit.',
    hitPointsBase: 6,
    hitDie: '1d6',
    proficiencies: ['Pistol Blaster'],
    armorProficiencies: [],
    savingThrows: ['dexterity', 'intelligence'],
    skillAccess: ['Perception'],
    skillPicks: 2,
    startingRank: 'Cadet',
    evolutionTree: [
      { rankName: 'Cadet',  tier: 1, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Novice'] },
      { rankName: 'Novice', tier: 2, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Striker', 'Bomber', 'Helmsman', 'Walker', 'Street Racer'], asiAtSubTiers: [3] },
      // Striker branch
      { rankName: 'Striker',     tier: 3, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Ace'], asiAtSubTiers: [2] },
      { rankName: 'Ace',         tier: 4, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Interceptor'], asiAtSubTiers: [3] },
      { rankName: 'Interceptor', tier: 5, maxSubTier: 1, trigger: '', abilities: [], equipment: [] },
      // Bomber branch
      { rankName: 'Bomber',      tier: 3, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Devastator'], asiAtSubTiers: [2] },
      { rankName: 'Devastator',  tier: 4, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Hell Dropper'], asiAtSubTiers: [3] },
      { rankName: 'Hell Dropper',tier: 5, maxSubTier: 1, trigger: '', abilities: [], equipment: [] },
      // Helmsman branch
      { rankName: 'Helmsman',  tier: 3, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Cruiser'], asiAtSubTiers: [2] },
      { rankName: 'Cruiser',   tier: 4, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Destroyer'], asiAtSubTiers: [3] },
      { rankName: 'Destroyer', tier: 5, maxSubTier: 1, trigger: '', abilities: [], equipment: [] },
      // Walker branch
      { rankName: 'Walker',      tier: 3, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Tanker'], asiAtSubTiers: [2] },
      { rankName: 'Tanker',      tier: 4, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Assaultman'], asiAtSubTiers: [3] },
      { rankName: 'Assaultman',  tier: 5, maxSubTier: 1, trigger: '', abilities: [], equipment: [] },
      // Street Racer branch
      { rankName: 'Street Racer',tier: 3, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Overdriver'], asiAtSubTiers: [2] },
      { rankName: 'Overdriver',  tier: 4, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Podracer'], asiAtSubTiers: [3] },
      { rankName: 'Podracer',    tier: 5, maxSubTier: 1, trigger: '', abilities: [], equipment: [] },
    ],
  },

  {
    name: 'Medic',
    description:
      'Healers and field surgeons who keep their allies alive through medicine, ingenuity, and sheer determination.',
    hitPointsBase: 6,
    hitDie: '1d6',
    proficiencies: ['Pistol Blaster', 'Knife'],
    armorProficiencies: ['Light Armor'],
    savingThrows: ['dexterity', 'wisdom'],
    skillAccess: ['Medicine'],
    skillPicks: 2,
    startingRank: 'Nurse',
    evolutionTree: [
      { rankName: 'Nurse', tier: 1, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Medic'] },
      { rankName: 'Medic', tier: 2, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Pill Maker', 'Doctor', 'Resilient', 'Junkie', 'Sickener'], asiAtSubTiers: [3] },
      // Pill Maker branch
      { rankName: 'Pill Maker',    tier: 3, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Medicine Man'], asiAtSubTiers: [2] },
      { rankName: 'Medicine Man',  tier: 4, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Pharmacist'], asiAtSubTiers: [3] },
      { rankName: 'Pharmacist',    tier: 5, maxSubTier: 1, trigger: '', abilities: [], equipment: [] },
      // Doctor branch
      { rankName: 'Doctor',   tier: 3, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Surgeon'], asiAtSubTiers: [2] },
      { rankName: 'Surgeon',  tier: 4, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Upgrader'], asiAtSubTiers: [3] },
      { rankName: 'Upgrader', tier: 5, maxSubTier: 1, trigger: '', abilities: [], equipment: [] },
      // Resilient branch
      { rankName: 'Resilient',   tier: 3, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Battle-Med'], asiAtSubTiers: [2] },
      { rankName: 'Battle-Med',  tier: 4, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Gladiator'], asiAtSubTiers: [3] },
      { rankName: 'Gladiator',   tier: 5, maxSubTier: 1, trigger: '', abilities: [], equipment: [] },
      // Junkie branch
      { rankName: 'Junkie',   tier: 3, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Mad Man'], asiAtSubTiers: [2] },
      { rankName: 'Mad Man',  tier: 4, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Rage Maker'], asiAtSubTiers: [3] },
      { rankName: 'Rage Maker',tier: 5, maxSubTier: 1, trigger: '', abilities: [], equipment: [] },
      // Sickener branch
      { rankName: 'Sickener',      tier: 3, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Blight'], asiAtSubTiers: [2] },
      { rankName: 'Blight',        tier: 4, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Plague Doctor'], asiAtSubTiers: [3] },
      { rankName: 'Plague Doctor', tier: 5, maxSubTier: 1, trigger: '', abilities: [], equipment: [] },
    ],
  },

  {
    name: 'Musician',
    description:
      'Performers whose music moves hearts, clouds minds, and can turn the tide of any encounter.',
    hitPointsBase: 8,
    hitDie: '1d8',
    proficiencies: ['Pistol Blaster', 'Melee Weapons'],
    armorProficiencies: ['Light Armor'],
    savingThrows: ['dexterity', 'charisma'],
    skillAccess: [],
    skillPicks: 3,
    startingRank: 'Street Performer',
    evolutionTree: [
      { rankName: 'Street Performer', tier: 1, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Cantina Regular'] },
      { rankName: 'Cantina Regular',  tier: 2, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Traveling Star', 'Screecher', 'Soother', 'Lover', 'Story Teller'], asiAtSubTiers: [3] },
      // Traveling Star branch
      { rankName: 'Traveling Star',    tier: 3, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Celebrity Musician'], asiAtSubTiers: [2] },
      { rankName: 'Celebrity Musician',tier: 4, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Galactic Icon'], asiAtSubTiers: [3] },
      { rankName: 'Galactic Icon',     tier: 5, maxSubTier: 1, trigger: '', abilities: [], equipment: [] },
      // Screecher branch
      { rankName: 'Screecher',   tier: 3, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Siren'], asiAtSubTiers: [2] },
      { rankName: 'Siren',       tier: 4, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Punk Rocker'], asiAtSubTiers: [3] },
      { rankName: 'Punk Rocker', tier: 5, maxSubTier: 1, trigger: '', abilities: [], equipment: [] },
      // Soother branch
      { rankName: 'Soother',     tier: 3, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Sleeper'], asiAtSubTiers: [2] },
      { rankName: 'Sleeper',     tier: 4, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Dream Talker'], asiAtSubTiers: [3] },
      { rankName: 'Dream Talker',tier: 5, maxSubTier: 1, trigger: '', abilities: [], equipment: [] },
      // Lover branch
      { rankName: 'Lover',     tier: 3, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Serenader'], asiAtSubTiers: [2] },
      { rankName: 'Serenader', tier: 4, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Succubus'], asiAtSubTiers: [3] },
      { rankName: 'Succubus',  tier: 5, maxSubTier: 1, trigger: '', abilities: [], equipment: [] },
      // Story Teller branch
      { rankName: 'Story Teller', tier: 3, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Mind Reader'], asiAtSubTiers: [2] },
      { rankName: 'Mind Reader',  tier: 4, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Envisionist'], asiAtSubTiers: [3] },
      { rankName: 'Envisionist',  tier: 5, maxSubTier: 1, trigger: '', abilities: [], equipment: [] },
    ],
  },

  {
    name: 'Tinkerer',
    description:
      'Inventors and engineers who build, modify, and repurpose technology to gain the edge in any situation.',
    hitPointsBase: 8,
    hitDie: '1d8',
    proficiencies: ['Pistol Blaster', 'Rifle Blaster', 'Melee Weapons'],
    armorProficiencies: ['Light Armor', 'Medium Armor'],
    savingThrows: ['dexterity', 'intelligence'],
    skillAccess: [],
    skillPicks: 3,
    startingRank: 'Scavenger',
    evolutionTree: [
      { rankName: 'Scavenger', tier: 1, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Tinkerer'] },
      { rankName: 'Tinkerer',  tier: 2, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Fixer', 'Blacksmith', 'Scrapper', 'Scrambler', 'Dark'], asiAtSubTiers: [3] },
      // Fixer branch
      { rankName: 'Fixer',        tier: 3, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Engineer'], asiAtSubTiers: [2] },
      { rankName: 'Engineer',     tier: 4, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Ship Builder'], asiAtSubTiers: [3] },
      { rankName: 'Ship Builder', tier: 5, maxSubTier: 1, trigger: '', abilities: [], equipment: [] },
      // Blacksmith branch
      { rankName: 'Blacksmith',  tier: 3, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Assembler'], asiAtSubTiers: [2] },
      { rankName: 'Assembler',   tier: 4, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Forgemaster'], asiAtSubTiers: [3] },
      { rankName: 'Forgemaster', tier: 5, maxSubTier: 1, trigger: '', abilities: [], equipment: [] },
      // Scrapper branch
      { rankName: 'Scrapper',    tier: 3, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Droidsmith'], asiAtSubTiers: [2] },
      { rankName: 'Droidsmith',  tier: 4, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Lifewright'], asiAtSubTiers: [3] },
      { rankName: 'Lifewright',  tier: 5, maxSubTier: 1, trigger: '', abilities: [], equipment: [] },
      // Scrambler branch
      { rankName: 'Scrambler', tier: 3, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Slicer'], asiAtSubTiers: [2] },
      { rankName: 'Slicer',    tier: 4, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Cypher'], asiAtSubTiers: [3] },
      { rankName: 'Cypher',    tier: 5, maxSubTier: 1, trigger: '', abilities: [], equipment: [] },
      // Dark branch
      { rankName: 'Dark',            tier: 3, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Shadow Engineer'], asiAtSubTiers: [2] },
      { rankName: 'Shadow Engineer', tier: 4, maxSubTier: 3, trigger: '', abilities: [], equipment: [], branches: ['Sith Alchemist'], asiAtSubTiers: [3] },
      { rankName: 'Sith Alchemist',  tier: 5, maxSubTier: 1, trigger: '', abilities: [], equipment: [] },
    ],
  },
]
