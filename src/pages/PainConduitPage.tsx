import { useState } from 'react';
import characterData from '../data/pain_conduit.json';

const LEVELS = ['x', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const LEVEL_LABELS: Record<string, string> = {
  'x': 'X', '1': '1', '2': '2', '3': '3', '4': '4',
  '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
};

const BUILDS = [
  {
    id: 'melee-retaliate',
    icon: '⚔️',
    name: 'Melee Retaliate',
    summary: 'Focuses on reflecting and retaliating damage. Plays at the front line, turning enemy aggression into true damage.',
    keyCards: ['reprisal', 'reversal of fate', 'penance', 'redemption'],
    strategy: 'The primary "thorns" build. Your goal is to be targeted by enemies and reflect that damage back. Use Reprisal and Redemption to stack retaliate effects. Remember that damage reflected through the bottom of Redemption or Reversal of Fate is true damage, bypassing shields.',
    levelPicks: {
      '2': 'Reversal of Fate',
      '3': 'Reprisal',
      '4': 'Down to the Dirt',
      '5': 'Chained by Spite',
      '6': 'Hopelessness',
      '7': 'Penance',
      '8': 'Wracked with Pain',
      '9': 'Redemption'
    }
  },
  {
    id: 'ranged-condition',
    icon: '🎯',
    name: 'Ranged Condition',
    summary: 'Stacks negative conditions to supercharge attacks or transfer them to enemies from a safe distance.',
    keyCards: ['delayed malady', 'shared affliction', 'wave of anguish', 'the end of everything'],
    strategy: 'Standard ranged dealer. Focus on generating Fire and Air to power up your attacks. Use Chained by Despair to load up on conditions, then dump them on high-priority targets. Wave of Anguish is your late-game AoE transfer powerhouse.',
    levelPicks: {
      '2': 'Infection Purge',
      '3': 'Burned at Both Ends',
      '4': 'Down to the Dirt',
      '5': 'Chained by Despair',
      '6': 'Hopelessness',
      '7': 'Reject the Gift',
      '8': 'Wave of Anguish',
      '9': 'The End of Everything'
    }
  },
  {
    id: 'tank-control',
    icon: '🛡️',
    name: 'Tank / Control',
    summary: 'Utilizes high self-healing and crowd control (Disarm/Stun) to manipulate the battlefield and protect allies.',
    keyCards: ['infection purge', 'chained by despair', 'wracked with pain', 'redemption'],
    strategy: 'A defensive variant that prioritizes Disarm and Stun. Use Chained by Despair to give yourself Disarm, then move it to an enemy to neutralize them. Your high self-healing from Wracked with Pain and Redemption keeps you in the fight.',
    levelPicks: {
      '2': 'Infection Purge',
      '3': 'Burned at Both Ends',
      '4': 'Mirrored Misery',
      '5': 'Chained by Despair',
      '6': 'Hopelessness',
      '7': 'Reject the Gift',
      '8': 'Wracked with Pain',
      '9': 'Redemption'
    }
  },
  {
    id: 'support',
    icon: '🤝',
    name: 'Support',
    summary: 'Specializes in siphoning negative conditions and damage from allies to weaken and debuff foes.',
    keyCards: ['blood ritual', 'mirrored misery', 'phantom limb', 'the end of everything'],
    strategy: 'The ultimate utility build. Stay close to allies to pull their Poisons and Wounds with Blood Ritual. Classes with self-inflicted debuffs (like Geminate) love having you around. You can essentially make your team immune to conditions.',
    levelPicks: {
      '2': 'Infection Purge',
      '3': 'Burned at Both Ends',
      '4': 'Mirrored Misery',
      '5': 'Chained by Despair',
      '6': 'Phantom Limb',
      '7': 'Reject the Gift',
      '8': 'Wracked with Pain',
      '9': 'The End of Everything'
    }
  }
];

const PERK_PRIORITY = [
  { perk: 'Increase your maximum health by 1', note: 'Essential for Self-Damage and Retaliate builds to survive reflections.' },
  { perk: 'When long resting, you may keep any negative conditions', note: 'Critical for stacking Bane, Brittle, or Poison for future turns.' },
  { perk: 'Add "Heal 2, Self" modifiers', note: 'Standard survivability for all front-line variants.' },
  { perk: 'Add "+1 if you have a negative condition" modifiers', note: 'The core damage boost for Ranged/Condition builds.' },
  { perk: 'Add "Curse" modifiers', note: 'High value for Support and Summoning (Flesh Fiend) builds.' }
];

const TIPS = [
  {
    icon: '🛡️',
    title: 'Negating Damage',
    text: 'If you lose a card to negate damage, you "suffer no damage." This means reflection effects will NOT trigger. Plan your health pool carefully.'
  },
  {
    icon: '🧪',
    title: 'Condition Timing',
    text: 'Healing removes Wound, Poison, Brittle, and Bane. Always transfer these to an enemy before you use a healing ability or a long rest.'
  },
  {
    icon: '🔄',
    title: 'Refreshing Conditions',
    text: 'Reapplying a condition to yourself refreshes its duration. Use this to stack Disarm or Immobilize across multiple turns.'
  },
  {
    icon: '💀',
    title: 'Curse is a Condition',
    text: 'Curse is technically a negative condition when applied. Once it becomes a modifier card, it is no longer a condition.'
  }
];

function PainConduitPage() {
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [lightboxCard, setLightboxCard] = useState<string | null>(null);
  const [matSide, setMatSide] = useState<'front' | 'back'>('front');
  const [expandedBuild, setExpandedBuild] = useState<string | null>('condition-striker');
  const basePath = `${import.meta.env.BASE_URL}assets/characters/pain-conduit`;

  const filteredCards = selectedLevel === 'all'
    ? characterData.cards
    : characterData.cards.filter(c => c.level === selectedLevel);

  return (
    <div className="character-page">
      {/* Hero Section */}
      <section className="char-hero">
        <div className="char-hero-inner">
          <div className="char-hero-portrait">
            <img src={`${basePath}/${characterData.portrait}`} alt={characterData.name} />
          </div>
          <div className="char-hero-content">
            <div className="char-hero-info">
              <div className="char-hero-badges">
                <span className="char-badge complexity-high">{characterData.complexity}</span>
                <span className="char-badge">{characterData.role}</span>
              </div>
              <div className="char-hero-title-row">
                <h1 className="char-hero-name">{characterData.name}</h1>
                <div className="char-class-icon">
                  <img src={`${basePath}/${characterData.icon}`} alt="Class Icon" />
                </div>
              </div>
              <p className="char-hero-aka">Class: {characterData.spoilerName} • {characterData.race}</p>
              <p className="char-hero-summary">{characterData.summary}</p>
              <div className="char-hero-stats">
                <div className="char-stat-box">
                  <span className="char-stat-value">{characterData.handSize}</span>
                  <span className="char-stat-label">Hand Size</span>
                </div>
                <div className="char-stat-box">
                  <span className="char-stat-value">{characterData.hp['1']}</span>
                  <span className="char-stat-label">Base HP</span>
                </div>
                <div className="char-stat-box">
                  <span className="char-stat-value">{characterData.hp['9']}</span>
                  <span className="char-stat-label">Lvl 9 HP</span>
                </div>
                <div className="char-stat-box">
                  <span className="char-stat-value">{characterData.cards.length}</span>
                  <span className="char-stat-label">Cards</span>
                </div>
              </div>
            </div>
            <div className="char-hero-traits">
              {characterData.traits.map(t => (
                <span key={t} className="char-trait-tag">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HP Progression Table */}
      <section className="char-section">
        <h2 className="char-section-title">HP Progression</h2>
        <div className="hp-table">
          {Object.entries(characterData.hp).map(([lvl, hp]) => (
            <div key={lvl} className="hp-cell">
              <span className="hp-level">Lvl {lvl}</span>
              <span className="hp-value">{hp}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Ability Cards Gallery */}
      <section className="char-section">
        <h2 className="char-section-title">Ability Cards</h2>
        <div className="level-filter-bar">
          <button
            className={`level-btn ${selectedLevel === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedLevel('all')}
          >
            All
          </button>
          {LEVELS.map(lvl => {
            const count = characterData.cards.filter(c => c.level === lvl).length;
            if (count === 0) return null;
            return (
              <button
                key={lvl}
                className={`level-btn ${selectedLevel === lvl ? 'active' : ''}`}
                onClick={() => setSelectedLevel(lvl)}
              >
                {LEVEL_LABELS[lvl]}
                <span className="level-count">{count}</span>
              </button>
            );
          })}
        </div>
        <div className="ability-card-grid">
          {filteredCards.map(card => (
            <div
              key={card.name}
              className="ability-card"
              onClick={() => setLightboxCard(card.image)}
            >
              <img
                src={`${basePath}/ability-cards/${card.image}`}
                alt={card.name}
                loading="lazy"
              />
              <div className="ability-card-info">
                <span className="ability-card-name">{card.name}</span>
                <div className="ability-card-meta">
                  <span className={`level-badge level-${card.level}`}>
                    Lvl {LEVEL_LABELS[card.level]}
                  </span>
                  <span className="initiative-badge">Init {card.initiative}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Character Mat & Perks */}
      <section className="char-section">
        <h2 className="char-section-title">Character Mat & Perks</h2>
        <div className="mat-perks-grid">
          <div className="mat-panel">
            <div className="mat-toggle">
              <button
                className={`mat-btn ${matSide === 'front' ? 'active' : ''}`}
                onClick={() => setMatSide('front')}
              >
                Front
              </button>
              <button
                className={`mat-btn ${matSide === 'back' ? 'active' : ''}`}
                onClick={() => setMatSide('back')}
              >
                Back
              </button>
            </div>
            <img
              src={`${basePath}/${matSide === 'front' ? characterData.matFront : characterData.matBack}`}
              alt={`Character mat ${matSide}`}
              className="mat-image"
              onClick={() => setLightboxCard(matSide === 'front' ? characterData.matFront : characterData.matBack)}
            />
          </div>
          <div className="perks-panel">
            <img
              src={`${basePath}/${characterData.perks}`}
              alt="Perk sheet"
              className="perks-image"
              onClick={() => setLightboxCard(characterData.perks)}
            />
          </div>
        </div>
      </section>

      {/* Perk Priority */}
      <section className="char-section">
        <h2 className="char-section-title">Perk Priority Guide</h2>
        <div className="perk-priority-list">
          {PERK_PRIORITY.map((p, i) => (
            <div key={i} className="perk-row">
              <span className="perk-rank">#{i + 1}</span>
              <div className="perk-info">
                <span className="perk-name">{p.perk}</span>
                <span className="perk-note">{p.note}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Build Archetypes */}
      <section className="char-section">
        <h2 className="char-section-title">Build Archetypes</h2>
        <div className="builds-list">
          {BUILDS.map(build => (
            <div
              key={build.id}
              className={`build-card ${expandedBuild === build.id ? 'expanded' : ''}`}
            >
              <button
                className="build-header"
                onClick={() => setExpandedBuild(expandedBuild === build.id ? null : build.id)}
              >
                <div className="build-header-left">
                  <span className="build-icon">{build.icon}</span>
                  <div>
                    <h3 className="build-name">{build.name}</h3>
                    <p className="build-summary">{build.summary}</p>
                  </div>
                </div>
                <span className="build-chevron">{expandedBuild === build.id ? '▲' : '▼'}</span>
              </button>
              {expandedBuild === build.id && (
                <div className="build-body">
                  <div className="build-strategy">
                    <h4>Strategy</h4>
                    <p>{build.strategy}</p>
                  </div>
                  <div className="build-key-cards">
                    <h4>Key Cards</h4>
                    <div className="key-card-chips">
                      {build.keyCards.map(name => (
                        <span key={name} className="key-card-chip">{name}</span>
                      ))}
                    </div>
                  </div>
                  <div className="build-level-picks">
                    <h4>Leveling Guide</h4>
                    <div className="level-pick-list">
                      {Object.entries(build.levelPicks).map(([lvl, pick]) => (
                        <div key={lvl} className="level-pick-row">
                          <span className={`level-badge level-${lvl}`}>Lvl {lvl}</span>
                          <span className="level-pick-text">{pick}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Tips */}
      <section className="char-section">
        <h2 className="char-section-title">Key Tips</h2>
        <div className="tips-grid">
          {TIPS.map((tip, i) => (
            <div key={i} className="tip-card">
              <span className="tip-icon">{tip.icon}</span>
              <h3 className="tip-title">{tip.title}</h3>
              <p className="tip-text">{tip.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxCard && (
        <div className="lightbox-overlay" onClick={() => setLightboxCard(null)}>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setLightboxCard(null)}>✕</button>
            <img
              src={lightboxCard.includes('ability-cards') || lightboxCard.startsWith('fh-')
                ? `${basePath}/ability-cards/${lightboxCard}`
                : `${basePath}/${lightboxCard}`}
              alt="Enlarged card"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default PainConduitPage;
