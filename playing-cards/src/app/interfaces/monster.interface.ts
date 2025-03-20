import { MonsterType } from '../utils/monster.utils';

export interface IMonster {
  id?: number; // optionnel car quand on crée un monstre, l'id est généré automatiquement

  name: string;
  type: MonsterType;
  image: string;
  hp: number;
  figureCaption: string;

  attackName: string;
  attackStrength: number;
  attackDescription: string;
}
