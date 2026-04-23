import styled from '@emotion/styled';
import { ElementIcon } from '../ElementIcon';
import { renderTextWithTooltips } from '../RuleTooltip';
import glossaryData from '../../data/glossary.json';
import { Character } from '../../types/character';

const HeroContainer = styled.section`
  background: linear-gradient(135deg, rgba(220, 38, 38, 0.15), rgba(15, 23, 42, 0.9)),
    radial-gradient(circle at 20% 80%, rgba(220, 38, 38, 0.1), transparent 50%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 3rem 2rem;
`;

const HeroInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 3rem;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 2rem;
  }
`;

const Portrait = styled.div`
  width: 280px;
  height: 280px;
  flex-shrink: 0;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 30px rgba(220, 38, 38, 0.4), inset 0 0 20px rgba(0, 0, 0, 0.5);
  background: rgba(30, 41, 59, 0.7);
  position: relative;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    box-shadow: inset 0 0 40px rgba(0, 0, 0, 0.4);
    pointer-events: none;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 20%;
    transition: transform 0.5s ease;
  }

  &:hover img {
    transform: scale(1.1);
  }
`;

const HeroContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const ClassIcon = styled.div`
  width: 50px;
  height: 50px;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 0.5rem;
    filter: drop-shadow(0 0 5px #38bdf8);
  }
`;

const HeroName = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(to right, #f87171, #fb923c);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.1;
`;

const BadgeRow = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const Badge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.3rem 0.75rem;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;
`;

const ComplexityDots = styled.div`
  display: flex;
  gap: 3px;
`;

const Dot = styled.div<{ filled: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.filled ? '#38bdf8' : 'rgba(255,255,255,0.1)'};
  box-shadow: ${props => props.filled ? '0 0 8px rgba(56, 189, 248, 0.6)' : 'none'};
`;



const StatGrid = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const StatBox = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 0.75rem 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  min-width: 80px;
`;

const StatValue = styled.span`
  font-size: 1.8rem;
  font-weight: 800;
  color: #38bdf8;
`;

const StatLabel = styled.span`
  font-size: 0.75rem;
  color: #94a3b8;
  text-transform: uppercase;
`;

const GlassPanel = styled.div`
  background-color: rgba(30, 41, 59, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 12px;
  padding: 1.5rem;
`;

const RoleSection = styled(GlassPanel)`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const RoleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.25rem;
`;

const RoleLabel = styled.span`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #94a3b8;
`;

const RoleValue = styled.span`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  color: #38bdf8;
`;

const BarSegments = styled.div`
  display: flex;
  gap: 4px;
  height: 12px;
`;

const Segment = styled.div<{ filled: boolean; partial?: boolean }>`
  flex: 1;
  background: ${props => 
    props.filled ? '#38bdf8' : 
    props.partial ? 'rgba(56, 189, 248, 0.2)' : 'rgba(15, 23, 42, 0.5)'};
  border-radius: 2px;
  box-shadow: ${props => props.filled ? '0 0 8px rgba(56, 189, 248, 0.4)' : 'none'};
  transition: all 0.3s ease;
`;

const LoreCard = styled(GlassPanel)`
  position: relative;
  overflow: hidden;
  margin-top: 1rem;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url(${props => props.about});
    background-size: cover;
    background-position: center;
    opacity: 0.15;
    mix-blend-mode: overlay;
    pointer-events: none;
  }
`;

const LoreTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #f8fafc;
  margin-bottom: 0.5rem;
  position: relative;
  z-index: 1;
`;

const LoreSubTitle = styled.div`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #94a3b8;
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;
`;

const LoreText = styled.p`
  font-size: 1rem;
  color: #94a3b8;
  line-height: 1.7;
  position: relative;
  z-index: 1;
  margin: 0;
`;

const TraitRow = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const TraitTag = styled.span`
  padding: 0.35rem 0.75rem;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 500;
  background: rgba(56, 189, 248, 0.1);
  border: 1px solid rgba(56, 189, 248, 0.2);
  color: #38bdf8;
`;

interface HeroSectionProps {
  character: Character;
  level: number;
  availableCards: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ character, level, availableCards }) => {
  const currentHP = character.hp[level.toString()] || character.hp["1"];
  const basePath = `${import.meta.env.BASE_URL}assets/characters/${character.id}`;

  const getStatDesc = (val: number) => {
    if (val >= 5) return 'Extreme';
    if (val >= 4) return 'High';
    if (val >= 3) return 'Average';
    if (val >= 2) return 'Low';
    return 'Minimal';
  };

  return (
    <HeroContainer>
      <HeroInner>
        <Portrait>
          <img src={`${basePath}/${character.portrait}`} alt={character.name} />
        </Portrait>
        <HeroContent>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '-0.5rem' }}>
            <Badge style={{ background: 'rgba(0,0,0,0.3)', borderColor: 'rgba(255,255,255,0.05)', color: '#94a3b8' }}>THEORYCRAFTING</Badge>
            <Badge style={{ background: 'rgba(56, 189, 248, 0.1)', borderColor: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8' }}>{character.race} CLASS</Badge>
          </div>
          <TitleRow>
            <ClassIcon>
              <img src={`${basePath}/${character.icon}`} alt="Class" />
            </ClassIcon>
            <HeroName>{character.name}</HeroName>
          </TitleRow>

          <BadgeRow>
            <Badge>
              Complexity:
              <ComplexityDots>
                {[1, 2, 3, 4, 5].map(i => <Dot key={i} filled={i <= character.complexity} />)}
              </ComplexityDots>
            </Badge>
            <Badge>
              Affinities:
              <div style={{ display: 'flex', gap: '4px' }}>
                {character.elements.map(el => (
                  <ElementIcon key={el} element={el} size={24} className="element-badge" />
                ))}
              </div>
            </Badge>
          </BadgeRow>

          <p style={{ color: '#94a3b8', fontSize: '0.9rem', opacity: 0.8 }}>
            Class: {character.spoilerName} • {character.race}
          </p>

          <TraitRow>
            {character.traits.map(t => <TraitTag key={t}>{t}</TraitTag>)}
          </TraitRow>

          <StatGrid>
            <StatBox>
              <StatValue>{character.handSize}</StatValue>
              <StatLabel>Hand Size</StatLabel>
            </StatBox>
            <StatBox>
              <StatValue>{currentHP}</StatValue>
              <StatLabel>HP (Lvl {level})</StatLabel>
            </StatBox>
            <StatBox>
              <StatValue>{availableCards}</StatValue>
              <StatLabel>Cards</StatLabel>
            </StatBox>
          </StatGrid>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
            <RoleSection>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#f8fafc', marginBottom: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
                Combat Profile
              </h2>
              {Object.entries(character.roleStats).map(([label, val]) => (
                <div key={label}>
                  <RoleHeader>
                    <RoleLabel>{label}</RoleLabel>
                    <RoleValue>{getStatDesc(val)}</RoleValue>
                  </RoleHeader>
                  <BarSegments>
                    {[1, 2, 3, 4, 5].map(i => (
                      <Segment 
                        key={i} 
                        filled={i <= val} 
                        partial={i === val + 1 && i <= 3} // Subtle hint for near-next levels if we had half stats
                      />
                    ))}
                  </BarSegments>
                </div>
              ))}
            </RoleSection>

            <LoreCard about={`${basePath}/${character.matBack}`}>
              <LoreTitle>Lore</LoreTitle>
              <LoreSubTitle>The {character.race}</LoreSubTitle>
              <LoreText>
                {character.lore.split('\n\n').map((para, i) => (
                  <span key={i} style={{ display: 'block', marginBottom: '1rem' }}>
                    {renderTextWithTooltips(para, glossaryData)}
                  </span>
                ))}
              </LoreText>
            </LoreCard>
          </div>
        </HeroContent>
      </HeroInner>
    </HeroContainer>
  );
};
