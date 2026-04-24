export interface CharacterCard {
  name: string;
  level: string;
  initiative: number;
  image: string;
}

export interface RoleStats {
  melee: number;
  ranged: number;
  mobility: number;
  support: number;
  defense: number;
  control: number;
}

export interface BuildArchetype {
  id: string;
  icon: string;
  name: string;
  summary: string;
  keyCards: string[];
  strategy: string;
  levelPicks: Record<string, string>;
}

export interface PerkPriority {
  perk: string;
  note: string;
}

export interface CharacterTip {
  icon: string;
  title: string;
  text: string;
}

export interface CharacterTheme {
  primary: string;
  secondary: string;
  accent: string;
  glow: string;
  headerGradient: string;
}

export interface Character {
  id: string;
  name: string;
  spoilerName: string;
  race: string;
  handSize: number;
  complexity: number;
  elements: string[];
  lore: string;
  roleStats: RoleStats;
  summary: string;
  classNotes: string[];
  hp: Record<string, number>;
  traits: string[];
  cards: CharacterCard[];
  matFront: string;
  matBack: string;
  portrait: string;
  icon: string;
  perks: string;
  builds?: BuildArchetype[];
  perkPriority?: PerkPriority[];
  tips?: CharacterTip[];
  theme: CharacterTheme;
}
