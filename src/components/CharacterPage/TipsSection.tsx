import styled from '@emotion/styled';
import { CharacterTip } from '../../types/character';

const Section = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
  width: 100%;
`;

const Title = styled.h2`
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 2rem;
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
`;

const TipCard = styled.div`
  background: rgba(30, 41, 59, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(30, 41, 59, 0.6);
    transform: scale(1.02);
    border-color: rgba(56, 189, 248, 0.3);
  }
`;

const TipIcon = styled.span`
  font-size: 2rem;
`;

const TipTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  color: #f8fafc;
  margin: 0;
`;

const TipText = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: #94a3b8;
  margin: 0;
`;

interface TipsSectionProps {
  tips: CharacterTip[];
}

export const TipsSection: React.FC<TipsSectionProps> = ({ tips }) => {
  return (
    <Section>
      <Title>Expert Advice</Title>
      <Grid>
        {tips.map((tip, i) => (
          <TipCard key={i}>
            <TipIcon>{tip.icon}</TipIcon>
            <TipTitle>{tip.title}</TipTitle>
            <TipText>{tip.text}</TipText>
          </TipCard>
        ))}
      </Grid>
    </Section>
  );
};
