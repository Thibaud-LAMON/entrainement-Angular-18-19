import { Component, computed, effect, model, signal } from '@angular/core';
import { PlayingCardComponent } from './components/playing-card/playing-card.component';
import { Monster } from './models/monster.model';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { MonsterType } from './utils/monster.utils';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [CommonModule, PlayingCardComponent, SearchBarComponent],
})
export class AppComponent {
  monsters!: Monster[];
  search = model('');

  filteredMonsters = computed(() => {
    return this.monsters.filter((monster) =>
      monster.name.includes(this.search())
    );
  });

  constructor() {
    this.monsters = [];

    const monster1 = new Monster();
    monster1.name = 'Pik';
    monster1.hp = 40;
    monster1.figureCaption = '002 Pik';
    this.monsters.push(monster1);

    const monster2 = new Monster();
    monster2.name = 'Car';
    monster2.image = 'img/placeholder_2.jpg';
    monster2.type = MonsterType.WATER;
    monster2.hp = 60;
    monster2.figureCaption = '003 Car';
    this.monsters.push(monster2);

    const monster3 = new Monster();
    monster3.name = 'Bulb';
    monster3.image = 'img/placeholder_3.jpg';
    monster3.type = MonsterType.PLANT;
    monster3.hp = 60;
    monster3.figureCaption = '004 Bulb';
    this.monsters.push(monster3);

    const monster4 = new Monster();
    monster4.name = 'Sala';
    monster4.image = 'img/placeholder_4.jpg';
    monster4.type = MonsterType.FIRE;
    monster4.hp = 60;
    monster4.figureCaption = '005 Sala';
    this.monsters.push(monster4);
  }
}
