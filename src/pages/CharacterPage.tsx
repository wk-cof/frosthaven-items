import React, { useState } from 'react';
import { Box } from '@mui/material';
import { Character } from '../types/character';

// Sub-components
import { HeroSection } from '../components/CharacterPage/HeroSection';
import { MechanicsSection } from '../components/CharacterPage/MechanicsSection';
import { LevelSlider } from '../components/CharacterPage/LevelSlider';
import { AbilityCardGrid } from '../components/CharacterPage/AbilityCardGrid';
import { MatPerksSection } from '../components/CharacterPage/MatPerksSection';
import { BuildsSection } from '../components/CharacterPage/BuildsSection';
import { TipsSection } from '../components/CharacterPage/TipsSection';
import { PerkPriorityList } from '../components/CharacterPage/PerkPriorityList';
import { Lightbox } from '../components/CharacterPage/Lightbox';

interface CharacterPageProps {
  character: Character;
}

export const CharacterPage: React.FC<CharacterPageProps> = ({ character }) => {
  const [charLevel, setCharLevel] = useState<number>(1);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [matSide, setMatSide] = useState<'front' | 'back'>('front');
  
  const basePath = `${import.meta.env.BASE_URL}assets/characters/${character.id}`;

  const filteredCards = character.cards.filter(c => {
    if (c.level === 'x' || c.level === '1') return true;
    return parseInt(c.level) <= charLevel;
  }).sort((a, b) => {
    if (a.level === 'x' && b.level !== 'x') return -1;
    if (a.level !== 'x' && b.level === 'x') return 1;
    return parseInt(a.level) - parseInt(b.level);
  });

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 0, 
        minHeight: '100vh', 
        bgcolor: '#0f172a', 
        color: '#f8fafc' 
      }}
    >
      <HeroSection 
        character={character} 
        level={charLevel} 
        availableCards={filteredCards.length} 
      />

      <MechanicsSection notes={character.classNotes} />

      <LevelSlider level={charLevel} onChange={setCharLevel} />

      <AbilityCardGrid 
        cards={filteredCards} 
        characterId={character.id} 
        level={charLevel} 
        onCardClick={setLightboxImage} 
      />

      <MatPerksSection 
        matFront={character.matFront}
        matBack={character.matBack}
        perks={character.perks}
        characterId={character.id}
        matSide={matSide}
        onSideChange={setMatSide}
        onImageClick={setLightboxImage}
      />

      {character.perkPriority && (
        <PerkPriorityList perks={character.perkPriority} />
      )}

      {character.builds && (
        <BuildsSection builds={character.builds} />
      )}

      {character.tips && (
        <TipsSection tips={character.tips} />
      )}

      {lightboxImage && (
        <Lightbox 
          image={lightboxImage} 
          onClose={() => setLightboxImage(null)} 
          basePath={basePath} 
        />
      )}
    </Box>
  );
};
