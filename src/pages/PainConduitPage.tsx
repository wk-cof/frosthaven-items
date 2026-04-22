import { useState } from 'react';
import characterData from '../data/pain_conduit.json';

const LEVELS = ['x', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const LEVEL_LABELS: Record<string, string> = {
  'x': 'X', '1': '1', '2': '2', '3': '3', '4': '4',
  '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
};

const BUILDS = [
  {
    id: 'condition-striker',
    icon: '🩸',
    name: 'Condition Striker',
    summary: 'Stack conditions on yourself, then transfer them to enemies for massive burst damage.',
    keyCards: ['delayed malady', 'shared affliction', 'transferred injury', 'the agony of others'],
    strategy: `The heart of the Pain Conduit. Your loop is: use cards that inflict negative conditions on yourself (Wound, Poison, Immobilize), then play cards that transfer ALL your conditions to an enemy — often dealing bonus damage per condition transferred. Delayed Malady is the crown jewel: it lets you set up a devastating delayed explosion of conditions. Pair with Shared Affliction for AoE condition spreading.`,
    levelPicks: {
      '2': 'Infection Purge — mass condition clear + damage',
      '3': 'Burned at Both Ends — self-wound for massive output',
      '4': 'Mirrored Misery — condition multiplication',
      '5': 'Chained by Spite — more self-harm options',
      '6': 'Hopelessness — late-round finisher',
      '7': 'Reject the Gift — conditional tanking',
      '8': 'Wave of Anguish — AoE pain',
      '9': 'The End of Everything — ultimate nuke',
    },
  },
  {
    id: 'defender-tank',
    icon: '🛡️',
    name: 'Defender / Tank',
    summary: 'Use your massive HP pool and damage redirection to protect allies and absorb punishment.',
    keyCards: ['scarred effigy', 'blood ritual', 'cleansing fire', 'swift vengeance'],
    strategy: `With the +5 HP perk and natural high health, you can stand at the front and take hits that would destroy squishier allies. Cards like Scarred Effigy and Blood Ritual let you heal through self-harm, and Cleansing Fire gives you condition removal. Your goal is to be a wall that the enemies waste attacks on while your team deals damage behind you. Use Swift Vengeance to retaliate.`,
    levelPicks: {
      '2': 'Reversal of Fate — damage redirection',
      '3': 'Reprisal — retaliate synergy',
      '4': 'Down to the Dirt — emergency heal + tank',
      '5': 'Chained by Despair — immobilize for control',
      '6': 'Phantom Limb — sustain and recovery',
      '7': 'Penance — shield and counter',
      '8': 'Wracked with Pain — massive self-heal burst',
      '9': 'Redemption — resurrection-like recovery',
    },
  },
  {
    id: 'controller',
    icon: '🎯',
    name: 'Controller',
    summary: 'Spread debilitating conditions across multiple enemies to dictate the flow of battle.',
    keyCards: ['line of transference', 'explosive wounds', 'unending torment', 'the agony of others'],
    strategy: `Instead of maximizing single-target burst, focus on spreading conditions to as many enemies as possible. Line of Transference lets you hit a line of enemies, Explosive Wounds creates AoE condition application, and Unending Torment provides persistent pressure. This build excels in scenarios with many weaker enemies.`,
    levelPicks: {
      '2': 'Infection Purge — AoE condition clear/spread',
      '3': 'Burned at Both Ends — AoE self-wound combo',
      '4': 'Mirrored Misery — reflect conditions outward',
      '5': 'Chained by Despair — immobilize groups',
      '6': 'Hopelessness — condition-based AoE',
      '7': 'Reject the Gift — conditional denial',
      '8': 'Wave of Anguish — huge AoE',
      '9': 'The End of Everything — all or nothing nuke',
    },
  },
];

const PERK_PRIORITY = [
  { perk: 'Gain +5 maximum HP', priority: '★★★', note: 'Mandatory. Enables your entire playstyle.' },
  { perk: 'Remove two -1 cards', priority: '★★★', note: 'Always good. Cleanses your modifier deck.' },
  { perk: 'Replace one -1 with one +1', priority: '★★☆', note: 'Solid upgrade to deck consistency.' },
  { perk: 'Add one +2 (Wound)', priority: '★★☆', note: 'Free Wound on a strong hit.' },
  { perk: 'Add one +1 (Poison)', priority: '★★☆', note: 'Extra Poison application.' },
  { perk: 'Add one +1 (Immobilize)', priority: '★★☆', note: 'Crowd control on hit.' },
  { perk: 'Add two rolling +1', priority: '★☆☆', note: 'More consistent damage.' },
  { perk: 'Add one rolling (Heal 1, self)', priority: '★☆☆', note: 'Sustain, but small.' },
];

const TIPS = [
  {
    icon: '❤️',
    title: 'HP Is Your Primary Resource',
    text: 'Don\'t be afraid to spend health. With 10-card hand size and high HP, your longevity comes from careful card management, not staying at full health. Calculate how much damage you can afford each round.',
  },
  {
    icon: '🔄',
    title: 'Master the Condition Loop',
    text: 'The core pattern: (1) inflict conditions on yourself, (2) transfer them to enemies. Always plan two rounds ahead — setting up conditions in round N to transfer them in round N+1.',
  },
  {
    icon: '⚡',
    title: 'Initiative Management',
    text: 'Your cards range from 12 to 99 initiative. Go early when you need to set up conditions before allies act, go late when you want enemies to attack you first (for retaliate/tank builds).',
  },
  {
    icon: '🧪',
    title: 'Item Synergies',
    text: 'Prioritize healing items (Healing Potion, Major Healing Potion), damage mitigation (Hide Armor, Shield items), and condition-enhancing gear. Stamina Potions are critical for recovering key burn cards.',
  },
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
          <div className="char-hero-info">
            <div className="char-hero-badges">
              <span className="char-badge complexity-high">{characterData.complexity}</span>
              <span className="char-badge">{characterData.role}</span>
            </div>
            <h1 className="char-hero-name">{characterData.name}</h1>
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
              <span className="perk-stars">{p.priority}</span>
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
