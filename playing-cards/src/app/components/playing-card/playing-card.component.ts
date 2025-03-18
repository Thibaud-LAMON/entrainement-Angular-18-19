import { Component, computed, input } from '@angular/core';
import { Monster } from '../../models/monster.model';
import { MonsterTypeProperties } from '../../utils/monster.utils';

@Component({
  selector: 'app-playing-card',
  imports: [],
  templateUrl: './playing-card.component.html',
  styleUrl: './playing-card.component.css',
})
export class PlayingCardComponent {
  monster = input(new Monster());
  monsterTypeIcon = computed(() => {
    return MonsterTypeProperties[this.monster().type].imageUrl;
  });
  backgroundColor = computed(() => {
    return MonsterTypeProperties[this.monster().type].color;
  });

  /* ngOnChanges n'est ici plus utile grâce à l'utilisation de signals
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['monster']) {
      if (
        changes['monster'].previousValue?.type !=
        changes['monster'].currentValue.type
      ) {
        this.monsterTypeIcon() =
          MonsterTypeProperties[this.monster().type].imageUrl;
        this.backgroundColor() = MonsterTypeProperties[this.monster().type].color;
      }
    }
  }
  */
  /*
  monster: InputSignal<Monster> = input(new Monster(), {
    alias: 'my-monster',
    transform: (value: Monster) => {
      value.hp = value.hp / 2;
      return value;
    },
  });
  */
  /* plus besoin grâce aux signal input

  @Input({
    alias: 'my-monster',
    transform: (value: Monster) => {
      value.hp = value.hp / 2;
      return value;
    },
  })
  monster: Monster = new Monster();
  */
  /* plus besoin de ces attributs, ils sont tous dans le modèle Monster

  @Input() name: string = 'My Monster';
  @Input() hp: number = 40;
  @Input() figureCaption: string = '001';
  @Input() attackName: string = 'Geo Impact';
  @Input() attackStrength: number = 60;
  @Input() attackDescription: string =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque volutpat diam ac finibus.';
  */
}
