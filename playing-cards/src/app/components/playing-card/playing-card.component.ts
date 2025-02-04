import { Component, input, Input, InputSignal } from '@angular/core';
import { Monster } from '../../models/monster.model';

@Component({
  selector: 'app-playing-card',
  imports: [],
  templateUrl: './playing-card.component.html',
  styleUrl: './playing-card.component.css',
})
export class PlayingCardComponent {
  monster: InputSignal<Monster> = input(new Monster());

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
