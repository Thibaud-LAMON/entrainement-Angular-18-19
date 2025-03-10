export enum MonsterType {
  PLANT = 'plant',
  FIRE = 'fire',
  WATER = 'water',
  ELECTRIC = 'electric',
}

export interface IMonsterProperties {
  imageUrl: string;
  color: string;
}

export const MonsterTypeProperties: { [key: string]: IMonsterProperties } = {
  [MonsterType.PLANT]: {
    imageUrl: 'img/plant.png',
    color: 'rgba(135, 255, 124)',
  },
  [MonsterType.FIRE]: {
    imageUrl: 'img/fire.png',
    color: 'rgba(255, 104, 104)',
  },
  [MonsterType.WATER]: {
    imageUrl: 'img/water.png',
    color: 'rgba(118, 235, 255)',
  },
  [MonsterType.ELECTRIC]: {
    imageUrl: 'img/electric.png',
    color: 'rgba(255, 252, 81)',
  },
};
