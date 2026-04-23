import styled from '@emotion/styled';
import { renderTextWithTooltips } from '../RuleTooltip';
import glossaryData from '../../data/glossary.json';

const Section = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
  width: 100%;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 2rem;
  color: #f8fafc;
  display: flex;
  align-items: center;
  gap: 1rem;
  font-family: 'Inter', sans-serif;

  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(to right, rgba(255, 255, 255, 0.1), transparent);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div<{ color?: string }>`
  background: rgba(22, 28, 45, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${props => props.color || '#38bdf8'}80;
    transform: translateY(-2px);
    background: rgba(30, 41, 59, 0.8);
  }
`;

const Glow = styled.div<{ color?: string }>`
  position: absolute;
  top: -20px;
  right: -20px;
  width: 100px;
  height: 100px;
  background: ${props => props.color || '#38bdf8'};
  opacity: 0.05;
  filter: blur(40px);
  border-radius: 50%;
  transition: opacity 0.3s ease;

  .mechanics-card:hover & {
    opacity: 0.15;
  }
`;

const IconBox = styled.div<{ color?: string }>`
  width: 48px;
  height: 48px;
  background: ${props => props.color || '#38bdf8'}15;
  border: 1px solid ${props => props.color || '#38bdf8'}30;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: ${props => props.color || '#38bdf8'};
`;

const CardContent = styled.div`
  display: flex;
  gap: 1.25rem;
  position: relative;
  z-index: 1;
`;

const MechanicTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  color: #f8fafc;
  margin-bottom: 0.5rem;
  font-family: 'Inter', sans-serif;
`;

const MechanicText = styled.div`
  font-size: 0.95rem;
  line-height: 1.6;
  color: #94a3b8;
`;

interface MechanicsSectionProps {
  notes: string[];
}

export const MechanicsSection: React.FC<MechanicsSectionProps> = ({ notes }) => {
  const getIcon = (index: number) => {
    const icons = ['coronavirus', 'bolt', 'bloodtype', 'shield'];
    return icons[index % icons.length];
  };

  const getColor = (index: number) => {
    const colors = ['#dc2626', '#38bdf8', '#fbbf24', '#a855f7'];
    return colors[index % colors.length];
  };

  const parseNote = (note: string) => {
    // Try to find a good title
    const sentences = note.split('. ');
    if (sentences.length > 1 && sentences[0].length < 60) {
      return { title: sentences[0], body: sentences.slice(1).join('. ') };
    }
    return { title: 'Class Mechanic', body: note };
  };

  return (
    <Section>
      <Title>Core Mechanics</Title>
      <Grid>
        {notes.map((note, i) => {
          const { title, body } = parseNote(note);
          const color = getColor(i);
          return (
            <Card key={i} color={color} className="mechanics-card">
              <Glow color={color} />
              <CardContent>
                <IconBox color={color}>
                  <span className="material-symbols-outlined">{getIcon(i)}</span>
                </IconBox>
                <div style={{ flex: 1 }}>
                  <MechanicTitle>{title}</MechanicTitle>
                  <MechanicText>{renderTextWithTooltips(body, glossaryData)}</MechanicText>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </Grid>
    </Section>
  );
};
