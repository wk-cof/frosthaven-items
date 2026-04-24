import React from 'react';
import { CharacterPage } from './CharacterPage';
import crashingTideData from '../data/crashing_tide.json';
import { Character } from '../types/character';

const CrashingTidePage: React.FC = () => {
  return <CharacterPage character={crashingTideData as unknown as Character} />;
};

export default CrashingTidePage;
