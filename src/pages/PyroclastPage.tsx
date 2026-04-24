import React from 'react';
import { CharacterPage } from './CharacterPage';
import pyroclastData from '../data/pyroclast.json';
import { Character } from '../types/character';

const PyroclastPage: React.FC = () => {
  return <CharacterPage character={pyroclastData as unknown as Character} />;
};

export default PyroclastPage;
