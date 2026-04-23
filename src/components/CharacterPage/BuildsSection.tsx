import React, { useState } from 'react';
import styled from '@emotion/styled';
import { BuildArchetype } from '../../types/character';

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

const BuildsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const BuildCard = styled.div<{ expanded: boolean }>`
  background: rgba(30, 41, 59, 0.4);
  border: 1px solid ${props => props.expanded ? 'rgba(56, 189, 248, 0.4)' : 'rgba(255, 255, 255, 0.1)'};
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: ${props => props.expanded ? '0 10px 30px -10px rgba(0, 0, 0, 0.5)' : 'none'};
`;

const BuildHeader = styled.button`
  width: 100%;
  border: none;
  background: none;
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  text-align: left;
`;

const HeaderLeft = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
`;

const BuildIcon = styled.span`
  font-size: 2.5rem;
  filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.1));
`;

const BuildName = styled.h3`
  font-size: 1.25rem;
  font-weight: 800;
  color: #f8fafc;
  margin: 0 0 0.5rem 0;
`;

const BuildSummary = styled.p`
  font-size: 0.95rem;
  color: #94a3b8;
  margin: 0;
`;

const Chevron = styled.span<{ expanded: boolean }>`
  color: #475569;
  font-size: 1.25rem;
  transition: transform 0.3s ease;
  transform: rotate(${props => props.expanded ? '180deg' : '0deg'});
`;

const BuildBody = styled.div`
  padding: 0 1.5rem 1.5rem 1.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding-top: 1.5rem;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

const SubSection = styled.div`
  h4 {
    font-size: 0.85rem;
    text-transform: uppercase;
    color: #38bdf8;
    margin-bottom: 1rem;
    letter-spacing: 0.1em;
  }

  p {
    line-height: 1.6;
    color: #cbd5e1;
    font-size: 0.95rem;
  }
`;

const KeyCardChips = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const Chip = styled.span`
  background: rgba(56, 189, 248, 0.1);
  color: #7dd3fc;
  padding: 0.35rem 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  border: 1px solid rgba(56, 189, 248, 0.2);
`;

const LevelPickList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const PickRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(0, 0, 0, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 8px;
`;

const PickLevel = styled.span`
  font-size: 0.7rem;
  font-weight: 800;
  color: #38bdf8;
  background: rgba(56, 189, 248, 0.1);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
`;

const PickText = styled.span`
  font-size: 0.9rem;
  color: #e2e8f0;
  font-weight: 500;
`;

interface BuildsSectionProps {
  builds: BuildArchetype[];
}

export const BuildsSection: React.FC<BuildsSectionProps> = ({ builds }) => {
  const [expandedId, setExpandedId] = useState<string | null>(builds[0]?.id || null);

  return (
    <Section>
      <Title>Strategic Builds</Title>
      <BuildsList>
        {builds.map(build => (
          <BuildCard key={build.id} expanded={expandedId === build.id}>
            <BuildHeader onClick={() => setExpandedId(expandedId === build.id ? null : build.id)}>
              <HeaderLeft>
                <BuildIcon>{build.icon}</BuildIcon>
                <div>
                  <BuildName>{build.name}</BuildName>
                  <BuildSummary>{build.summary}</BuildSummary>
                </div>
              </HeaderLeft>
              <Chevron expanded={expandedId === build.id}>▼</Chevron>
            </BuildHeader>
            {expandedId === build.id && (
              <BuildBody>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  <SubSection>
                    <h4>Philosophy</h4>
                    <p>{build.strategy}</p>
                  </SubSection>
                  <SubSection>
                    <h4>Core Cards</h4>
                    <KeyCardChips>
                      {build.keyCards.map(c => <Chip key={c}>{c}</Chip>)}
                    </KeyCardChips>
                  </SubSection>
                </div>
                <SubSection>
                  <h4>Progression Path</h4>
                  <LevelPickList>
                    {Object.entries(build.levelPicks).sort().map(([lvl, pick]) => (
                      <PickRow key={lvl}>
                        <PickLevel>Lvl {lvl}</PickLevel>
                        <PickText>{pick}</PickText>
                      </PickRow>
                    ))}
                  </LevelPickList>
                </SubSection>
              </BuildBody>
            )}
          </BuildCard>
        ))}
      </BuildsList>
    </Section>
  );
};
