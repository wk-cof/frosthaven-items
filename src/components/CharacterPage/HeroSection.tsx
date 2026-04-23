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

const ElementsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(0, 0, 0, 0.2);
  padding: 0.3rem 1rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.1);
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

const RoleChart = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 1rem;
  background: rgba(0,0,0,0.2);
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.05);
`;

const RoleBar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const BarSegments = styled.div`
  display: flex;
  gap: 2px;
  height: 6px;
`;

const Segment = styled.div<{ filled: boolean }>`
  flex: 1;
  background: ${props => props.filled ? '#38bdf8' : 'rgba(255,255,255,0.05)'};
  border-radius: 1px;
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

const LoreText = styled.p`
  font-size: 1rem;
  color: #e2e8f0;
  line-height: 1.6;
  font-style: italic;
  opacity: 0.9;
`;

interface HeroSectionProps {
  character: Character;
  level: number;
  availableCards: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ character, level, availableCards }) => {
  const currentHP = character.hp[level.toString()] || character.hp["1"];
  const basePath = `${import.meta.env.BASE_URL}assets/characters/${character.id}`;

  return (
    <HeroContainer>
      <HeroInner>
        <Portrait>
          <img src={`${basePath}/${character.portrait}`} alt={character.name} />
        </Portrait>
        <HeroContent>
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
            <ElementsContainer>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>Affinities:</span>
              <div style={{ display: 'flex', gap: '4px' }}>
                {character.elements.map(el => (
                  <ElementIcon key={el} element={el} size={24} className="element-badge" />
                ))}
              </div>
            </ElementsContainer>
          </BadgeRow>

          <p style={{ color: '#94a3b8' }}>Class: {character.spoilerName} • {character.race}</p>

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

          <RoleChart>
            {Object.entries(character.roleStats).map(([label, val]) => (
              <RoleBar key={label}>
                <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: '#94a3b8' }}>{label}</span>
                <BarSegments>
                  {[1, 2, 3, 4, 5].map(i => <Segment key={i} filled={i <= val} />)}
                </BarSegments>
              </RoleBar>
            ))}
          </RoleChart>

          <LoreText>{renderTextWithTooltips(character.lore, glossaryData)}</LoreText>
        </HeroContent>
      </HeroInner>
    </HeroContainer>
  );
};
