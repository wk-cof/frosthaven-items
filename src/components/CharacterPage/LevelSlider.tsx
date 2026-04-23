import styled from '@emotion/styled';

const Section = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
  width: 100%;
`;

const Container = styled.div`
  background: rgba(30, 41, 59, 0.4);
  padding: 2rem;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  font-size: 1.6rem;
  font-weight: 700;
  margin: 0;
  color: #f8fafc;
`;

const Indicator = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  
  span:first-of-type {
    font-size: 0.75rem;
    text-transform: uppercase;
    color: #94a3b8;
    letter-spacing: 0.1em;
  }
`;

const LevelNumber = styled.span`
  font-size: 2.5rem;
  font-weight: 900;
  color: #38bdf8;
  line-height: 1;
`;

const Slider = styled.input`
  width: 100%;
  appearance: none;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  outline: none;
  cursor: pointer;
  margin-bottom: 1rem;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 24px;
    height: 24px;
    background: #38bdf8;
    border: 4px solid #0f172a;
    border-radius: 50%;
    box-shadow: 0 0 15px rgba(56, 189, 248, 0.4);
    transition: all 0.2s ease;
  }

  &::-webkit-slider-thumb:hover {
    transform: scale(1.1);
    box-shadow: 0 0 20px rgba(56, 189, 248, 0.6);
  }
`;

const Ticks = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 10px;

  span {
    color: #475569;
    font-size: 0.85rem;
    font-weight: 700;
    transition: color 0.2s ease;
  }

  span.active {
    color: #38bdf8;
  }
`;

interface LevelSliderProps {
  level: number;
  onChange: (val: number) => void;
}

export const LevelSlider: React.FC<LevelSliderProps> = ({ level, onChange }) => {
  return (
    <Section>
      <Container>
        <Header>
          <Title>Character Progression</Title>
          <Indicator>
            <span>Current Level</span>
            <LevelNumber>{level}</LevelNumber> indicator
          </Indicator>
        </Header>
        <Slider
          type="range"
          min="1"
          max="9"
          value={level}
          onChange={(e) => onChange(parseInt(e.target.value))}
        />
        <Ticks>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(lvl => (
            <span key={lvl} className={lvl <= level ? 'active' : ''}>{lvl}</span>
          ))}
        </Ticks>
      </Container>
    </Section>
  );
};
