import styled from '@emotion/styled';
import { renderTextWithTooltips } from '../RuleTooltip';
import glossaryData from '../../data/glossary.json';

const Section = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
  width: 100%;
  background: rgba(15, 23, 42, 0.3);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: rgba(30, 41, 59, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  backdrop-filter: blur(8px);
  position: relative;
  overflow: hidden;

  &::before {
    content: '!!';
    position: absolute;
    top: -10px;
    right: -5px;
    font-size: 4rem;
    font-weight: 900;
    color: rgba(56, 189, 248, 0.05);
    pointer-events: none;
  }

  p {
    line-height: 1.6;
    color: #e2e8f0;
    font-size: 1rem;
    position: relative;
    z-index: 1;
  }
`;

interface MechanicsSectionProps {
  notes: string[];
}

export const MechanicsSection: React.FC<MechanicsSectionProps> = ({ notes }) => {
  return (
    <Section>
      <Title>Class Mechanics</Title>
      <Grid>
        {notes.map((note, i) => (
          <Card key={i}>
            <p>{renderTextWithTooltips(note, glossaryData)}</p>
          </Card>
        ))}
      </Grid>
    </Section>
  );
};
