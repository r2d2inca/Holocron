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
      { rankName: 'Youngling', tier: 1, trigger: '', abilities: [], equipment: [], branches: ['Padawan'] },
      { rankName: 'Padawan',   tier: 2, trigger: '', abilities: [], equipment: [], branches: ['Knight'] },
      { rankName: 'Knight',    tier: 3, trigger: '', abilities: [], equipment: [], branches: ['Master', 'Diplomat', 'Sentinel', 'Hermit', 'Code Breaker'] },
      // Master branch
      { rankName: 'Master',       tier: 4, trigger: '', abilities: [], equipment: [], branches: ['Grandmaster'] },
      { rankName: 'Grandmaster',  tier: 5, trigger: '', abilities: [], equipment: [] },
      // Diplomat branch
      { rankName: 'Diplomat',    tier: 4, trigger: '', abilities: [], equipment: [], branches: ['Negotiator'] },
      { rankName: 'Negotiator',  tier: 5, trigger: '', abilities: [], equipment: [], branches: ['Peacekeeper'] },
      { rankName: 'Peacekeeper', tier: 6, trigger: '', abilities: [], equipment: [] },
      // Sentinel branch
      { rankName: 'Sentinel', tier: 4, trigger: '', abilities: [], equipment: [], branches: ['Vanguard'] },
      { rankName: 'Vanguard', tier: 5, trigger: '', abilities: [], equipment: [], branches: ['Guardian'] },
      { rankName: 'Guardian', tier: 6, trigger: '', abilities: [], equipment: [] },
      // Hermit branch
      { rankName: 'Hermit',              tier: 4, trigger: '', abilities: [], equipment: [], branches: ['Silent Fist'] },
      { rankName: 'Silent Fist',         tier: 5, trigger: '', abilities: [], equipment: [], branches: ['One with the Force'] },
      { rankName: 'One with the Force',  tier: 6, trigger: '', abilities: [], equipment: [] },
      // Code Breaker branch
      { rankName: 'Code Breaker', tier: 4, trigger: '', abilities: [], equipment: [], branches: ['Apostate'] },
      { rankName: 'Apostate',     tier: 5, trigger: '', abilities: [], equipment: [], branches: ['Fallen'] },
      { rankName: 'Fallen',       tier: 6, trigger: '', abilities: [], equipment: [] },
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
      { rankName: 'Acolyte',    tier: 1, trigger: '', abilities: [], equipment: [], branches: ['Apprentice'] },
      { rankName: 'Apprentice', tier: 2, trigger: '', abilities: [], equipment: [], branches: ['Sith', 'Vengeful', 'Duelist', 'Assassin', 'Conflicted'] },
      // Sith branch
      { rankName: 'Sith',  tier: 3, trigger: '', abilities: [], equipment: [], branches: ['Lord'] },
      { rankName: 'Lord',  tier: 4, trigger: '', abilities: [], equipment: [], branches: ['Darth'] },
      { rankName: 'Darth', tier: 5, trigger: '', abilities: [], equipment: [] },
      // Vengeful branch
      { rankName: 'Vengeful', tier: 3, trigger: '', abilities: [], equipment: [], branches: ['Hateful'] },
      { rankName: 'Hateful',  tier: 4, trigger: '', abilities: [], equipment: [], branches: ['Darth'] },
      // Duelist branch
      { rankName: 'Duelist', tier: 3, trigger: '', abilities: [], equipment: [], branches: ['Count'] },
      { rankName: 'Count',   tier: 4, trigger: '', abilities: [], equipment: [], branches: ['Darth'] },
      // Assassin branch
      { rankName: 'Assassin',        tier: 3, trigger: '', abilities: [], equipment: [], branches: ['Inquisitor'] },
      { rankName: 'Inquisitor',      tier: 4, trigger: '', abilities: [], equipment: [], branches: ['Grand Inquisitor'] },
      { rankName: 'Grand Inquisitor',tier: 5, trigger: '', abilities: [], equipment: [] },
      // Conflicted branch
      { rankName: 'Conflicted', tier: 3, trigger: '', abilities: [], equipment: [], branches: ['Gray'] },
      { rankName: 'Gray',       tier: 4, trigger: '', abilities: [], equipment: [], branches: ['Redeemed'] },
      { rankName: 'Redeemed',   tier: 5, trigger: '', abilities: [], equipment: [] },
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
      { rankName: 'Rookie', tier: 1, trigger: '', abilities: [], equipment: [], branches: ['Hunter'] },
      { rankName: 'Hunter', tier: 2, trigger: '', abilities: [], equipment: [], branches: ['Goon', 'Outlaw', 'Mauler', 'Saboteur', 'Wrecker'] },
      // Goon branch
      { rankName: 'Goon',      tier: 3, trigger: '', abilities: [], equipment: [], branches: ['Henchman'] },
      { rankName: 'Henchman',  tier: 4, trigger: '', abilities: [], equipment: [], branches: ['Enforcer'] },
      { rankName: 'Enforcer',  tier: 5, trigger: '', abilities: [], equipment: [] },
      // Outlaw branch
      { rankName: 'Outlaw',     tier: 3, trigger: '', abilities: [], equipment: [], branches: ['Gunslinger'] },
      { rankName: 'Gunslinger', tier: 4, trigger: '', abilities: [], equipment: [], branches: ['Cowboy'] },
      { rankName: 'Cowboy',     tier: 5, trigger: '', abilities: [], equipment: [] },
      // Mauler branch
      { rankName: 'Mauler',      tier: 3, trigger: '', abilities: [], equipment: [], branches: ['Berserker'] },
      { rankName: 'Berserker',   tier: 4, trigger: '', abilities: [], equipment: [], branches: ['Juggernaut'] },
      { rankName: 'Juggernaut',  tier: 5, trigger: '', abilities: [], equipment: [] },
      // Saboteur branch
      { rankName: 'Saboteur',    tier: 3, trigger: '', abilities: [], equipment: [], branches: ['Deadshot'] },
      { rankName: 'Deadshot',    tier: 4, trigger: '', abilities: [], equipment: [], branches: ['Night Stalker'] },
      { rankName: 'Night Stalker',tier: 5, trigger: '', abilities: [], equipment: [] },
      // Wrecker branch
      { rankName: 'Wrecker',           tier: 3, trigger: '', abilities: [], equipment: [], branches: ['Explosives Expert'] },
      { rankName: 'Explosives Expert', tier: 4, trigger: '', abilities: [], equipment: [], branches: ['Demolitionist'] },
      { rankName: 'Demolitionist',     tier: 5, trigger: '', abilities: [], equipment: [] },
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
      { rankName: 'Street Rat', tier: 1, trigger: '', abilities: [], equipment: [], branches: ['Scoundrel'] },
      { rankName: 'Scoundrel',  tier: 2, trigger: '', abilities: [], equipment: [], branches: ['Hustler', 'Player', 'Swindler', 'Scallywag', 'Dealer'] },
      // Hustler branch
      { rankName: 'Hustler',  tier: 3, trigger: '', abilities: [], equipment: [], branches: ['Thief'] },
      { rankName: 'Thief',    tier: 4, trigger: '', abilities: [], equipment: [], branches: ['Smuggler'] },
      { rankName: 'Smuggler', tier: 5, trigger: '', abilities: [], equipment: [] },
      // Player branch
      { rankName: 'Player',            tier: 3, trigger: '', abilities: [], equipment: [], branches: ['Gambler'] },
      { rankName: 'Gambler',           tier: 4, trigger: '', abilities: [], equipment: [], branches: ['Heart of the Cards'] },
      { rankName: 'Heart of the Cards',tier: 5, trigger: '', abilities: [], equipment: [] },
      // Swindler branch
      { rankName: 'Swindler',     tier: 3, trigger: '', abilities: [], equipment: [], branches: ['Trickster'] },
      { rankName: 'Trickster',    tier: 4, trigger: '', abilities: [], equipment: [], branches: ['Silver Tongue'] },
      { rankName: 'Silver Tongue',tier: 5, trigger: '', abilities: [], equipment: [] },
      // Scallywag branch
      { rankName: 'Scallywag', tier: 3, trigger: '', abilities: [], equipment: [], branches: ['Pirate'] },
      { rankName: 'Pirate',    tier: 4, trigger: '', abilities: [], equipment: [], branches: ['Marauder'] },
      { rankName: 'Marauder',  tier: 5, trigger: '', abilities: [], equipment: [] },
      // Dealer branch
      { rankName: 'Dealer',    tier: 3, trigger: '', abilities: [], equipment: [], branches: ['Chemist'] },
      { rankName: 'Chemist',   tier: 4, trigger: '', abilities: [], equipment: [], branches: ['Drug Lord'] },
      { rankName: 'Drug Lord', tier: 5, trigger: '', abilities: [], equipment: [] },
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
      { rankName: 'Delegate', tier: 1, trigger: '', abilities: [], equipment: [], branches: ['Senator'] },
      { rankName: 'Senator',  tier: 2, trigger: '', abilities: [], equipment: [], branches: ['Speaker', 'Voice', 'Noble', 'Puppeteer', 'Analyst'] },
      // Speaker branch
      { rankName: 'Speaker',        tier: 3, trigger: '', abilities: [], equipment: [], branches: ['Chancellor'] },
      { rankName: 'Chancellor',     tier: 4, trigger: '', abilities: [], equipment: [], branches: ['High Chancellor'] },
      { rankName: 'High Chancellor',tier: 5, trigger: '', abilities: [], equipment: [] },
      // Voice branch
      { rankName: 'Voice',    tier: 3, trigger: '', abilities: [], equipment: [], branches: ['Populist'] },
      { rankName: 'Populist', tier: 4, trigger: '', abilities: [], equipment: [], branches: ['Savior'] },
      { rankName: 'Savior',   tier: 5, trigger: '', abilities: [], equipment: [] },
      // Noble branch
      { rankName: 'Noble',    tier: 3, trigger: '', abilities: [], equipment: [], branches: ['Sovereign'] },
      { rankName: 'Sovereign',tier: 4, trigger: '', abilities: [], equipment: [], branches: ['Royalty'] },
      { rankName: 'Royalty',  tier: 5, trigger: '', abilities: [], equipment: [] },
      // Puppeteer branch
      { rankName: 'Puppeteer',    tier: 3, trigger: '', abilities: [], equipment: [], branches: ['Manipulator'] },
      { rankName: 'Manipulator',  tier: 4, trigger: '', abilities: [], equipment: [], branches: ['Shadow Ruler'] },
      { rankName: 'Shadow Ruler', tier: 5, trigger: '', abilities: [], equipment: [] },
      // Analyst branch
      { rankName: 'Analyst',   tier: 3, trigger: '', abilities: [], equipment: [], branches: ['Banker'] },
      { rankName: 'Banker',    tier: 4, trigger: '', abilities: [], equipment: [], branches: ['Economist'] },
      { rankName: 'Economist', tier: 5, trigger: '', abilities: [], equipment: [] },
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
      { rankName: 'Nomad',     tier: 1, trigger: '', abilities: [], equipment: [], branches: ['Tribesman'] },
      { rankName: 'Tribesman', tier: 2, trigger: '', abilities: [], equipment: [], branches: ['Warrior', 'Catcher', 'Healer', 'Tamer', 'Dimwit'] },
      // Warrior branch
      { rankName: 'Warrior',  tier: 3, trigger: '', abilities: [], equipment: [], branches: ['Hero'] },
      { rankName: 'Hero',     tier: 4, trigger: '', abilities: [], equipment: [], branches: ['Champion'] },
      { rankName: 'Champion', tier: 5, trigger: '', abilities: [], equipment: [] },
      // Catcher branch
      { rankName: 'Catcher',  tier: 3, trigger: '', abilities: [], equipment: [], branches: ['Trapper'] },
      { rankName: 'Trapper',  tier: 4, trigger: '', abilities: [], equipment: [], branches: ['Predator'] },
      { rankName: 'Predator', tier: 5, trigger: '', abilities: [], equipment: [] },
      // Healer branch
      { rankName: 'Healer', tier: 3, trigger: '', abilities: [], equipment: [], branches: ['Shaman'] },
      { rankName: 'Shaman', tier: 4, trigger: '', abilities: [], equipment: [], branches: ['Sage'] },
      { rankName: 'Sage',   tier: 5, trigger: '', abilities: [], equipment: [] },
      // Tamer branch
      { rankName: 'Tamer',       tier: 3, trigger: '', abilities: [], equipment: [], branches: ['Beastmaster'] },
      { rankName: 'Beastmaster', tier: 4, trigger: '', abilities: [], equipment: [], branches: ['Alpha'] },
      { rankName: 'Alpha',       tier: 5, trigger: '', abilities: [], equipment: [] },
      // Dimwit branch
      { rankName: 'Dimwit',      tier: 3, trigger: '', abilities: [], equipment: [], branches: ['Idiot'] },
      { rankName: 'Idiot',       tier: 4, trigger: '', abilities: [], equipment: [], branches: ['Serendipity'] },
      { rankName: 'Serendipity', tier: 5, trigger: '', abilities: [], equipment: [] },
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
      { rankName: 'Recruit',      tier: 1, trigger: '', abilities: [], equipment: [], branches: ['Storm Trooper'] },
      { rankName: 'Storm Trooper',tier: 2, trigger: '', abilities: [], equipment: [], branches: ['Shock Trooper', 'Boost Trooper', 'Gunner', 'Scout', 'Officer'] },
      // Shock Trooper branch
      { rankName: 'Shock Trooper', tier: 3, trigger: '', abilities: [], equipment: [], branches: ['Death Trooper'] },
      { rankName: 'Death Trooper', tier: 4, trigger: '', abilities: [], equipment: [], branches: ['Purge Trooper'] },
      { rankName: 'Purge Trooper', tier: 5, trigger: '', abilities: [], equipment: [] },
      // Boost Trooper branch
      { rankName: 'Boost Trooper',tier: 3, trigger: '', abilities: [], equipment: [], branches: ['Jet Trooper'] },
      { rankName: 'Jet Trooper',  tier: 4, trigger: '', abilities: [], equipment: [], branches: ['Stormhawk'] },
      { rankName: 'Stormhawk',    tier: 5, trigger: '', abilities: [], equipment: [] },
      // Gunner branch
      { rankName: 'Gunner',       tier: 3, trigger: '', abilities: [], equipment: [], branches: ['Heavy Trooper'] },
      { rankName: 'Heavy Trooper',tier: 4, trigger: '', abilities: [], equipment: [], branches: ['Armor Trooper'] },
      { rankName: 'Armor Trooper',tier: 5, trigger: '', abilities: [], equipment: [] },
      // Scout branch
      { rankName: 'Scout',   tier: 3, trigger: '', abilities: [], equipment: [], branches: ['Spy'] },
      { rankName: 'Spy',     tier: 4, trigger: '', abilities: [], equipment: [], branches: ['Usurper'] },
      { rankName: 'Usurper', tier: 5, trigger: '', abilities: [], equipment: [] },
      // Officer branch
      { rankName: 'Officer',    tier: 3, trigger: '', abilities: [], equipment: [], branches: ['ISB Agent'] },
      { rankName: 'ISB Agent',  tier: 4, trigger: '', abilities: [], equipment: [], branches: ['Admiral'] },
      { rankName: 'Admiral',    tier: 5, trigger: '', abilities: [], equipment: [] },
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
      { rankName: 'Cadet',  tier: 1, trigger: '', abilities: [], equipment: [], branches: ['Novice'] },
      { rankName: 'Novice', tier: 2, trigger: '', abilities: [], equipment: [], branches: ['Striker', 'Bomber', 'Helmsman', 'Walker', 'Street Racer'] },
      // Striker branch
      { rankName: 'Striker',     tier: 3, trigger: '', abilities: [], equipment: [], branches: ['Ace'] },
      { rankName: 'Ace',         tier: 4, trigger: '', abilities: [], equipment: [], branches: ['Interceptor'] },
      { rankName: 'Interceptor', tier: 5, trigger: '', abilities: [], equipment: [] },
      // Bomber branch
      { rankName: 'Bomber',      tier: 3, trigger: '', abilities: [], equipment: [], branches: ['Devastator'] },
      { rankName: 'Devastator',  tier: 4, trigger: '', abilities: [], equipment: [], branches: ['Hell Dropper'] },
      { rankName: 'Hell Dropper',tier: 5, trigger: '', abilities: [], equipment: [] },
      // Helmsman branch
      { rankName: 'Helmsman',  tier: 3, trigger: '', abilities: [], equipment: [], branches: ['Cruiser'] },
      { rankName: 'Cruiser',   tier: 4, trigger: '', abilities: [], equipment: [], branches: ['Destroyer'] },
      { rankName: 'Destroyer', tier: 5, trigger: '', abilities: [], equipment: [] },
      // Walker branch
      { rankName: 'Walker',      tier: 3, trigger: '', abilities: [], equipment: [], branches: ['Tanker'] },
      { rankName: 'Tanker',      tier: 4, trigger: '', abilities: [], equipment: [], branches: ['Assaultman'] },
      { rankName: 'Assaultman',  tier: 5, trigger: '', abilities: [], equipment: [] },
      // Street Racer branch
      { rankName: 'Street Racer',tier: 3, trigger: '', abilities: [], equipment: [], branches: ['Overdriver'] },
      { rankName: 'Overdriver',  tier: 4, trigger: '', abilities: [], equipment: [], branches: ['Podracer'] },
      { rankName: 'Podracer',    tier: 5, trigger: '', abilities: [], equipment: [] },
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
      { rankName: 'Nurse', tier: 1, trigger: '', abilities: [], equipment: [], branches: ['Medic'] },
      { rankName: 'Medic', tier: 2, trigger: '', abilities: [], equipment: [], branches: ['Pill Maker', 'Doctor', 'Resilient', 'Junkie', 'Sickener'] },
      // Pill Maker branch
      { rankName: 'Pill Maker',    tier: 3, trigger: '', abilities: [], equipment: [], branches: ['Medicine Man'] },
      { rankName: 'Medicine Man',  tier: 4, trigger: '', abilities: [], equipment: [], branches: ['Pharmacist'] },
      { rankName: 'Pharmacist',    tier: 5, trigger: '', abilities: [], equipment: [] },
      // Doctor branch
      { rankName: 'Doctor',   tier: 3, trigger: '', abilities: [], equipment: [], branches: ['Surgeon'] },
      { rankName: 'Surgeon',  tier: 4, trigger: '', abilities: [], equipment: [], branches: ['Upgrader'] },
      { rankName: 'Upgrader', tier: 5, trigger: '', abilities: [], equipment: [] },
      // Resilient branch
      { rankName: 'Resilient',   tier: 3, trigger: '', abilities: [], equipment: [], branches: ['Battle-Med'] },
      { rankName: 'Battle-Med',  tier: 4, trigger: '', abilities: [], equipment: [], branches: ['Gladiator'] },
      { rankName: 'Gladiator',   tier: 5, trigger: '', abilities: [], equipment: [] },
      // Junkie branch
      { rankName: 'Junkie',   tier: 3, trigger: '', abilities: [], equipment: [], branches: ['Mad Man'] },
      { rankName: 'Mad Man',  tier: 4, trigger: '', abilities: [], equipment: [], branches: ['Rage Maker'] },
      { rankName: 'Rage Maker',tier: 5, trigger: '', abilities: [], equipment: [] },
      // Sickener branch
      { rankName: 'Sickener',      tier: 3, trigger: '', abilities: [], equipment: [], branches: ['Blight'] },
      { rankName: 'Blight',        tier: 4, trigger: '', abilities: [], equipment: [], branches: ['Plague Doctor'] },
      { rankName: 'Plague Doctor', tier: 5, trigger: '', abilities: [], equipment: [] },
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
      { rankName: 'Street Performer', tier: 1, trigger: '', abilities: [], equipment: [], branches: ['Cantina Regular'] },
      { rankName: 'Cantina Regular',  tier: 2, trigger: '', abilities: [], equipment: [], branches: ['Traveling Star', 'Screecher', 'Soother', 'Lover', 'Story Teller'] },
      // Traveling Star branch
      { rankName: 'Traveling Star',    tier: 3, trigger: '', abilities: [], equipment: [], branches: ['Celebrity Musician'] },
      { rankName: 'Celebrity Musician',tier: 4, trigger: '', abilities: [], equipment: [], branches: ['Galactic Icon'] },
      { rankName: 'Galactic Icon',     tier: 5, trigger: '', abilities: [], equipment: [] },
      // Screecher branch
      { rankName: 'Screecher',   tier: 3, trigger: '', abilities: [], equipment: [], branches: ['Siren'] },
      { rankName: 'Siren',       tier: 4, trigger: '', abilities: [], equipment: [], branches: ['Punk Rocker'] },
      { rankName: 'Punk Rocker', tier: 5, trigger: '', abilities: [], equipment: [] },
      // Soother branch
      { rankName: 'Soother',     tier: 3, trigger: '', abilities: [], equipment: [], branches: ['Sleeper'] },
      { rankName: 'Sleeper',     tier: 4, trigger: '', abilities: [], equipment: [], branches: ['Dream Talker'] },
      { rankName: 'Dream Talker',tier: 5, trigger: '', abilities: [], equipment: [] },
      // Lover branch
      { rankName: 'Lover',     tier: 3, trigger: '', abilities: [], equipment: [], branches: ['Serenader'] },
      { rankName: 'Serenader', tier: 4, trigger: '', abilities: [], equipment: [], branches: ['Succubus'] },
      { rankName: 'Succubus',  tier: 5, trigger: '', abilities: [], equipment: [] },
      // Story Teller branch
      { rankName: 'Story Teller', tier: 3, trigger: '', abilities: [], equipment: [], branches: ['Mind Reader'] },
      { rankName: 'Mind Reader',  tier: 4, trigger: '', abilities: [], equipment: [], branches: ['Envisionist'] },
      { rankName: 'Envisionist',  tier: 5, trigger: '', abilities: [], equipment: [] },
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
      { rankName: 'Scavenger', tier: 1, trigger: '', abilities: [], equipment: [], branches: ['Tinkerer'] },
      { rankName: 'Tinkerer',  tier: 2, trigger: '', abilities: [], equipment: [], branches: ['Fixer', 'Blacksmith', 'Scrapper', 'Scrambler', 'Dark'] },
      // Fixer branch
      { rankName: 'Fixer',        tier: 3, trigger: '', abilities: [], equipment: [], branches: ['Engineer'] },
      { rankName: 'Engineer',     tier: 4, trigger: '', abilities: [], equipment: [], branches: ['Ship Builder'] },
      { rankName: 'Ship Builder', tier: 5, trigger: '', abilities: [], equipment: [] },
      // Blacksmith branch
      { rankName: 'Blacksmith',  tier: 3, trigger: '', abilities: [], equipment: [], branches: ['Assembler'] },
      { rankName: 'Assembler',   tier: 4, trigger: '', abilities: [], equipment: [], branches: ['Forgemaster'] },
      { rankName: 'Forgemaster', tier: 5, trigger: '', abilities: [], equipment: [] },
      // Scrapper branch
      { rankName: 'Scrapper',    tier: 3, trigger: '', abilities: [], equipment: [], branches: ['Droidsmith'] },
      { rankName: 'Droidsmith',  tier: 4, trigger: '', abilities: [], equipment: [], branches: ['Lifewright'] },
      { rankName: 'Lifewright',  tier: 5, trigger: '', abilities: [], equipment: [] },
      // Scrambler branch
      { rankName: 'Scrambler', tier: 3, trigger: '', abilities: [], equipment: [], branches: ['Slicer'] },
      { rankName: 'Slicer',    tier: 4, trigger: '', abilities: [], equipment: [], branches: ['Cypher'] },
      { rankName: 'Cypher',    tier: 5, trigger: '', abilities: [], equipment: [] },
      // Dark branch
      { rankName: 'Dark',            tier: 3, trigger: '', abilities: [], equipment: [], branches: ['Shadow Engineer'] },
      { rankName: 'Shadow Engineer', tier: 4, trigger: '', abilities: [], equipment: [], branches: ['Sith Alchemist'] },
      { rankName: 'Sith Alchemist',  tier: 5, trigger: '', abilities: [], equipment: [] },
    ],
  },
]
