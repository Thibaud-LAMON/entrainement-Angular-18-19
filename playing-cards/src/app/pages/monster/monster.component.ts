import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-monster',
  imports: [],
  templateUrl: './monster.component.html',
  styleUrl: './monster.component.css',
})
export class MonsterComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute); //ActivatedRoute permet de récupérer les paramètres de l'url
  private router = inject(Router); //Router permet de naviguer entre les pages

  monsterId = signal<number | undefined>(undefined);
  routeSubscription: Subscription | null = null;

  //utiliser une subscription permet de récuperer l'id du monstre à chaque fois qu'il change, contrairement à un snapshot
  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe((params) => {
      this.monsterId.set(params['id'] ? parseInt(params['id']) : undefined);
    });
  }

  //permet de naviguer vers le monstre suivant
  next() {
    let nextId = this.monsterId() || 0;
    nextId++;
    this.router.navigate(['/monster/' + nextId]);
  }

  //permet de clore la subscription pour éviter les fuites de mémoire
  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }
}
