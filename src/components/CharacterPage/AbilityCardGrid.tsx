import styled from '@emotion/styled';
import { CharacterCard } from '../../types/character';

const Section = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
  width: 100%;
`;

const Title = styled.h2`
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #f8fafc;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(to right, rgba(255, 255, 255, 0.1), transparent);
    margin-left: 1rem;
  }
`;

const GridHeader = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: flex-end;
`;

const CardCount = styled.p`
  font-size: 0.9rem;
  color: #94a3b8;
  font-style: italic;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;

  @media (max-width: 600px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
`;

const Card = styled.div`
  background: rgba(30, 41, 59, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;

  &:hover {
    transform: translateY(-8px) scale(1.02);
    border-color: #38bdf8;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 0 15px rgba(56, 189, 248, 0.2);
  }

  img {
    width: 100%;
    aspect-ratio: 2/3;
    object-fit: cover;
    display: block;
  }
`;

const CardInfo = styled.div`
  padding: 1rem;
  background: rgba(0, 0, 0, 0.3);
`;

const CardName = styled.span`
  display: block;
  font-weight: 700;
  color: #f8fafc;
  margin-bottom: 0.5rem;
  text-transform: capitalize;
  font-size: 0.9rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CardMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LevelBadge = styled.span<{ level: string }>`
  font-size: 0.7rem;
  font-weight: 800;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  text-transform: uppercase;
  background: ${props => {
    switch(props.level.toLowerCase()) {
      case 'x': return 'rgba(139, 92, 246, 0.2)';
      case '1': return 'rgba(56, 189, 248, 0.15)';
      case '9': return 'rgba(220, 38, 38, 0.2)';
      default: return 'rgba(34, 197, 94, 0.15)';
    }
  }};
  color: ${props => {
    switch(props.level.toLowerCase()) {
      case 'x': return '#c4b5fd';
      case '1': return '#7dd3fc';
      case '9': return '#fca5a5';
      default: return '#86efac';
    }
  }};
  border: 1px solid rgba(255,255,255,0.1);
`;

const InitiativeBadge = styled.span`
  font-size: 0.7rem;
  font-weight: 700;
  color: #94a3b8;
  font-family: monospace;
`;

interface AbilityCardGridProps {
  cards: CharacterCard[];
  characterId: string;
  level: number;
  onCardClick: (img: string) => void;
}

export const AbilityCardGrid: React.FC<AbilityCardGridProps> = ({ cards, characterId, level, onCardClick }) => {
  const basePath = `${import.meta.env.BASE_URL}assets/characters/${characterId}`;
  
  return (
    <Section>
      <Title>Ability Cards</Title>
      <GridHeader>
        <CardCount>Showing {cards.length} cards available at Level {level}</CardCount>
      </GridHeader>
      <Grid>
        {cards.map(card => (
          <Card key={card.name} onClick={() => onCardClick(card.image)}>
            <img 
              src={`${basePath}/ability-cards/${card.image}`} 
              alt={card.name} 
              loading="lazy" 
            />
            <CardInfo>
              <CardName>{card.name}</CardName>
              <CardMeta>
                <LevelBadge level={card.level}>Lvl {card.level.toUpperCase()}</LevelBadge>
                <InitiativeBadge>Init {card.initiative}</InitiativeBadge>
              </CardMeta>
            </CardInfo>
          </Card>
        ))}
      </Grid>
    </Section>
  );
};
