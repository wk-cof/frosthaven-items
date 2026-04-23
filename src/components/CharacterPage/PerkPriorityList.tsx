import styled from '@emotion/styled';
import { PerkPriority } from '../../types/character';

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

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  background: rgba(30, 41, 59, 0.4);
  padding: 1rem 1.5rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.2s ease;

  &:hover {
    background: rgba(30, 41, 59, 0.6);
    border-color: rgba(56, 189, 248, 0.2);
    transform: translateX(4px);
  }
`;

const Rank = styled.span`
  font-size: 1.25rem;
  font-weight: 900;
  color: #38bdf8;
  opacity: 0.5;
  min-width: 40px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const Name = styled.span`
  font-weight: 700;
  color: #f8fafc;
  font-size: 1rem;
`;

const Note = styled.span`
  font-size: 0.85rem;
  color: #94a3b8;
`;

interface PerkPriorityListProps {
  perks: PerkPriority[];
}

export const PerkPriorityList: React.FC<PerkPriorityListProps> = ({ perks }) => {
  return (
    <Section>
      <Title>Perk Investment Priority</Title>
      <List>
        {perks.map((p, i) => (
          <Row key={i}>
            <Rank>#{i + 1}</Rank>
            <Info>
              <Name>{p.perk}</Name>
              <Note>{p.note}</Note>
            </Info>
          </Row>
        ))}
      </List>
    </Section>
  );
};
