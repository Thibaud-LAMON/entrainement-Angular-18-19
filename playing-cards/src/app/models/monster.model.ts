import { MonsterType } from '../utils/monster.utils';

export class Monster {
  name: string = 'My Monster';
  type: MonsterType = MonsterType.ELECTRIC;
  image: string = 'img/placeholder_1.jpg';
  hp: number = 40;
  figureCaption: string = '001 Monster';
  attackName: string = 'Geo Impact';
  attackStrength: number = 60;
  attackDescription: string =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque volutpat diam ac finibus.';
}
