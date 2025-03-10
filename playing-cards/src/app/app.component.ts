import { Component, computed, effect, signal } from '@angular/core';
import { PlayingCardComponent } from './components/playing-card/playing-card.component';
import { Monster } from './models/monster.model';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { MonsterType } from './utils/monster.utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [PlayingCardComponent, SearchBarComponent],
})
export class AppComponent {
  monsters!: Monster[];
  count: number = 0;
  search = '';

  selectedMonsterIndex = signal(1);
  selectedMonster = computed(() => {
    return this.monsters[this.selectedMonsterIndex()];
  });

  increaseCount() {
    this.count++;
  }

  constructor() {
    effect(() => {
      console.log('Selected monster:', this.selectedMonster());
    });
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
  }

  toggleMonster() {
    this.selectedMonsterIndex.set(
      (this.selectedMonsterIndex() + 1) % this.monsters.length
    );
  }
}
