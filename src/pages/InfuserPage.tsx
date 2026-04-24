import React from 'react';
import { CharacterPage } from './CharacterPage';
import infuserData from '../data/infuser.json';
import { Character } from '../types/character';

const InfuserPage: React.FC = () => {
  return <CharacterPage character={infuserData as unknown as Character} />;
};

export default InfuserPage;
