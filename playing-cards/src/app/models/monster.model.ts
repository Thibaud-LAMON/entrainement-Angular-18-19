import { IMonster } from '../interfaces/monster.interface';
import { MonsterType } from '../utils/monster.utils';

export class Monster implements IMonster {
  id: number = -1;
  name: string = 'My Monster';
  type: MonsterType = MonsterType.ELECTRIC;
  image: string = 'img/placeholder_1.jpg';
  hp: number = 40;
  figureCaption: string = '001 Monster';

  attackName: string = 'Geo Impact';
  attackStrength: number = 60;
  attackDescription: string =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque volutpat diam ac finibus.';

  copy(): Monster {
    return Object.assign(new Monster(), this); //assign prend un objet (ici Monster) et lui assigne les paramètre d'un autre (ici this qui correspond à l'objet actuel)
  }

  static fromJson(monsterJson: IMonster): Monster {
    return Object.assign(new Monster(), monsterJson);
  }

  toJson(): IMonster {
    const monsterJson: IMonster = Object.assign({}, this);
    delete monsterJson.id;
    return monsterJson;
  }
}
