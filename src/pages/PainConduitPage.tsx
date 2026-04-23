import { CharacterPage } from './CharacterPage';
import characterData from '../data/pain_conduit.json';
import { Character } from '../types/character';

export default function PainConduitPage() {
  return <CharacterPage character={characterData as Character} />;
}
