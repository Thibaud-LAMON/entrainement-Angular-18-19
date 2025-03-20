import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Component, computed, inject, model, signal } from '@angular/core';
import { PlayingCardComponent } from '../../components/playing-card/playing-card.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { Monster } from '../../models/monster.model';
import { MonsterService } from '../../services/monster/monster.service';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-monster-list',
  imports: [
    CommonModule,
    PlayingCardComponent,
    SearchBarComponent,
    MatButtonModule,
  ],
  templateUrl: './monster-list.component.html',
  styleUrl: './monster-list.component.css',
})
export class MonsterListComponent {
  private monsterService = inject(MonsterService);
  private router = inject(Router);

  monsters = toSignal(this.monsterService.getAll()); // Quand l'observable emmet une nouvelle valeur, un set sera effectué sur le signal
  search = model('');

  //Monster peut maintenant être undefined, il faut donc ajouter un '?' pour éviter les erreurs ainsi qu'une valeur par défaut
  filteredMonsters = computed(() => {
    return (
      this.monsters()?.filter((monster) =>
        monster.name.includes(this.search())
      ) ?? []
    );
  });

  //le constructeur n'est plus nécessaire, on peut donc le supprimer

  addMonster() {
    this.router.navigate(['monster']);
  }

  openMonster(monster: Monster) {
    this.router.navigate(['monster', monster.id]);
  }
}
