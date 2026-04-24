import React, { useState } from 'react';
import { Box } from '@mui/material';
import { Character } from '../types/character';

// Sub-components
import { HeroSection } from '../components/CharacterPage/HeroSection';
import { LoreSection } from '../components/CharacterPage/LoreSection';
import { MechanicsSection } from '../components/CharacterPage/MechanicsSection';
import { AbilityCardGrid } from '../components/CharacterPage/AbilityCardGrid';
import { MatPerksSection } from '../components/CharacterPage/MatPerksSection';
import { BuildsSection } from '../components/CharacterPage/BuildsSection';
import { TipsSection } from '../components/CharacterPage/TipsSection';
import { PerkPriorityList } from '../components/CharacterPage/PerkPriorityList';
import { Lightbox } from '../components/Lightbox';
import { Container, Grid } from '@mui/material';

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
        onLevelChange={setCharLevel}
      />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={6}>

          <Grid {...({ size: { xs: 12, md: 6 } } as any)}>
            <MechanicsSection notes={character.classNotes} theme={character.theme} />
          </Grid>
          <Grid {...({ size: { xs: 12, md: 6 } } as any)}>
            <LoreSection
              lore={character.lore}
              race={character.race}
              matBack={character.matBack}
              basePath={basePath}
              theme={character.theme}
            />
          </Grid>
        </Grid>
      </Container>

      <AbilityCardGrid
        cards={filteredCards}
        characterId={character.id}
        level={charLevel}
        onCardClick={(img) => setLightboxImage(`${basePath}/ability-cards/${img}`)}
        theme={character.theme}
      />

      <MatPerksSection
        matFront={character.matFront}
        matBack={character.matBack}
        perks={character.perks}
        characterId={character.id}
        matSide={matSide}
        onSideChange={setMatSide}
        onImageClick={(img) => setLightboxImage(`${basePath}/${img}`)}
        theme={character.theme}
      />

      {character.perkPriority && (
        <PerkPriorityList perks={character.perkPriority} theme={character.theme} />
      )}

      {character.builds && (
        <BuildsSection builds={character.builds} theme={character.theme} />
      )}

      {character.tips && (
        <TipsSection tips={character.tips} theme={character.theme} />
      )}

      {lightboxImage && (
        <Lightbox
          imageSrc={lightboxImage}
          onClose={() => setLightboxImage(null)}
        />
      )}
    </Box>
  );
};
