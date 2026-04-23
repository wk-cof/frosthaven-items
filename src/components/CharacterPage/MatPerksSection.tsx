import styled from '@emotion/styled';

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
  grid-template-columns: 3fr 2fr;
  gap: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ToggleContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  background: rgba(0, 0, 0, 0.3);
  padding: 0.35rem;
  border-radius: 10px;
  width: min-content;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const ToggleBtn = styled.button<{ active: boolean }>`
  padding: 0.5rem 1.5rem;
  border-radius: 7px;
  border: none;
  background: ${props => props.active ? '#38bdf8' : 'transparent'};
  color: ${props => props.active ? '#0f172a' : '#94a3b8'};
  font-weight: 700;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: ${props => props.active ? '#0f172a' : '#f8fafc'};
  }
`;

const ImageWrapper = styled.div`
  background: rgba(30, 41, 59, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 1.5rem;
  cursor: zoom-in;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(56, 189, 248, 0.4);
    box-shadow: 0 0 20px rgba(56, 189, 248, 0.1);
  }

  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.4);
  }
`;

interface MatPerksSectionProps {
  matFront: string;
  matBack: string;
  perks: string;
  characterId: string;
  onImageClick: (img: string) => void;
  matSide: 'front' | 'back';
  onSideChange: (side: 'front' | 'back') => void;
}

export const MatPerksSection: React.FC<MatPerksSectionProps> = ({ 
  matFront, matBack, perks, characterId, onImageClick, matSide, onSideChange 
}) => {
  const basePath = `${import.meta.env.BASE_URL}assets/characters/${characterId}`;
  const currentMat = matSide === 'front' ? matFront : matBack;

  return (
    <Section>
      <Title>Character Mat & Perks</Title>
      <Grid>
        <Panel>
          <ToggleContainer>
            <ToggleBtn active={matSide === 'front'} onClick={() => onSideChange('front')}>Front</ToggleBtn>
            <ToggleBtn active={matSide === 'back'} onClick={() => onSideChange('back')}>Back</ToggleBtn>
          </ToggleContainer>
          <ImageWrapper onClick={() => onImageClick(currentMat)}>
            <img src={`${basePath}/${currentMat}`} alt={`Mat ${matSide}`} />
          </ImageWrapper>
        </Panel>
        <Panel>
          <div style={{ height: '48px' }} /> {/* Spacer to align with toggle */}
          <ImageWrapper onClick={() => onImageClick(perks)}>
            <img src={`${basePath}/${perks}`} alt="Perk Sheet" />
          </ImageWrapper>
        </Panel>
      </Grid>
    </Section>
  );
};
