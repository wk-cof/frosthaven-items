import React, { useState } from 'react';
import { Character } from '../types/character';
import { ElementIcon } from '../components/ElementIcon';
import { renderTextWithTooltips } from '../components/RuleTooltip';
import glossaryData from '../data/glossary.json';

const LEVEL_LABELS: Record<string, string> = {
  'x': 'X', '1': '1', '2': '2', '3': '3', '4': '4',
  '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
};

interface CharacterPageProps {
  character: Character;
}

export const CharacterPage: React.FC<CharacterPageProps> = ({ character }) => {
  const [charLevel, setCharLevel] = useState<number>(1);
  const [lightboxCard, setLightboxCard] = useState<string | null>(null);
  const [matSide, setMatSide] = useState<'front' | 'back'>('front');
  const [expandedBuild, setExpandedBuild] = useState<string | null>(character.builds?.[0]?.id || null);
  
  const basePath = `${import.meta.env.BASE_URL}assets/characters/${character.id}`;

  const filteredCards = character.cards.filter(c => {
    if (c.level === 'x' || c.level === '1') return true;
    return parseInt(c.level) <= charLevel;
  }).sort((a, b) => {
    if (a.level === 'x' && b.level !== 'x') return -1;
    if (a.level !== 'x' && b.level === 'x') return 1;
    return parseInt(a.level) - parseInt(b.level);
  });

  const currentHP = character.hp[charLevel.toString()] || character.hp["1"];

  const renderComplexityDots = (val: number) => (
    <div className="char-complexity-dots">
      {[1, 2, 3, 4, 5].map(i => (
        <div key={i} className={`complexity-dot ${i <= val ? 'filled' : ''}`} />
      ))}
    </div>
  );

  const renderBarChart = (label: string, val: number) => (
    <div className="role-chart-item" key={label}>
      <span className="role-chart-label">{label}</span>
      <div className="role-bar-container">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className={`role-bar-segment ${i <= val ? 'filled' : ''}`} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="character-page">
      {/* Hero Section */}
      <section className="char-hero">
        <div className="char-hero-inner">
          <div className="char-hero-portrait">
            <img src={`${basePath}/${character.portrait}`} alt={character.name} />
          </div>
          <div className="char-hero-content">
            <div className="char-hero-info">
              <div className="char-hero-title-row">
                <div className="char-class-icon">
                  <img src={`${basePath}/${character.icon}`} alt="Class Icon" />
                </div>
                <h1 className="char-hero-name">{character.name}</h1>
              </div>
              <div className="char-hero-badges">
                <div className="char-badge">
                  Difficulty: {renderComplexityDots(character.complexity)}
                </div>
                <div className="char-elements-container">
                  <span className="elements-label">Elemental Affinities:</span>
                  <div className="char-elements">
                    {character.elements?.map(el => (
                      <ElementIcon key={el} element={el} size={32} className="element-badge" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="char-hero-aka">Class: {character.spoilerName} • {character.race}</p>

              <div className="char-hero-traits">
                {character.traits?.map(trait => (
                  <span key={trait} className="char-trait-tag">{trait}</span>
                ))}
              </div>

              <div className="char-hero-stats">
                <div className="char-stat-box">
                  <span className="char-stat-value">{character.handSize}</span>
                  <span className="char-stat-label">Hand Size</span>
                </div>
                <div className="char-stat-box">
                  <span className="char-stat-value">{currentHP}</span>
                  <span className="char-stat-label">HP (level {charLevel})</span>
                </div>
                <div className="char-stat-box">
                  <span className="char-stat-value">{filteredCards.length}</span>
                  <span className="char-stat-label">Available Cards</span>
                </div>
              </div>

              <div className="char-role-charts">
                {Object.entries(character.roleStats).map(([label, val]) => (
                  renderBarChart(label, val)
                ))}
              </div>

              <p className="char-lore-text">{renderTextWithTooltips(character.lore, glossaryData)}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Class Mechanics Section */}
      <section className="char-section mechanics-section">
        <h2 className="char-section-title">Class Mechanics</h2>
        <div className="mechanics-grid">
          {character.classNotes?.map((note, i) => (
            <div key={i} className="mechanics-card">
              <p>{renderTextWithTooltips(note, glossaryData)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Character Progression Slider */}
      <section className="char-section level-slider-section">
        <div className="level-slider-container">
          <div className="level-slider-header">
            <h2 className="char-section-title">Character Level</h2>
            <div className="level-indicator">
              <span>Level</span>
              <span className="level-number">{charLevel}</span>
            </div>
          </div>
          <input
            type="range"
            min="1"
            max="9"
            value={charLevel}
            onChange={(e) => setCharLevel(parseInt(e.target.value))}
            className="level-range-input"
          />
          <div className="level-slider-ticks">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(lvl => (
              <span key={lvl} className={lvl <= charLevel ? 'active' : ''}>{lvl}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Ability Cards Gallery */}
      <section className="char-section">
        <h2 className="char-section-title">Ability Cards</h2>
        <div className="ability-card-grid-header">
          <p className="card-count-note">Showing {filteredCards.length} cards available at Level {charLevel}</p>
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
              src={`${basePath}/${matSide === 'front' ? character.matFront : character.matBack}`}
              alt={`Character mat ${matSide}`}
              className="mat-image"
              onClick={() => setLightboxCard(matSide === 'front' ? character.matFront : character.matBack)}
            />
          </div>
          <div className="perks-panel">
            <img
              src={`${basePath}/${character.perks}`}
              alt="Perk sheet"
              className="perks-image"
              onClick={() => setLightboxCard(character.perks)}
            />
          </div>
        </div>
      </section>

      {/* Perk Priority */}
      {character.perkPriority && (
        <section className="char-section">
          <h2 className="char-section-title">Perk Priority Guide</h2>
          <div className="perk-priority-list">
            {character.perkPriority.map((p, i) => (
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
      )}

      {/* Build Archetypes */}
      {character.builds && (
        <section className="char-section">
          <h2 className="char-section-title">Build Archetypes</h2>
          <div className="builds-list">
            {character.builds.map(build => (
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
      )}

      {/* Tips */}
      {character.tips && (
        <section className="char-section">
          <h2 className="char-section-title">Key Tips</h2>
          <div className="tips-grid">
            {character.tips.map((tip, i) => (
              <div key={i} className="tip-card">
                <span className="tip-icon">{tip.icon}</span>
                <h3 className="tip-title">{tip.title}</h3>
                <p className="tip-text">{tip.text}</p>
              </div>
            ))}
          </div>
        </section>
      )}

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
};
