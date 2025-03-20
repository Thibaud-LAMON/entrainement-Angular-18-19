import { MonsterService } from './../../services/monster/monster.service';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, of, Subscription, switchMap } from 'rxjs';
import { MonsterType } from '../../utils/monster.utils';
import { Monster } from '../../models/monster.model';
import { PlayingCardComponent } from '../../components/playing-card/playing-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { DeleteMonsterConfirmationDialogComponent } from '../../components/delete-monster-confirmation-dialog/delete-monster-confirmation-dialog.component';

@Component({
  selector: 'app-monster',
  imports: [
    ReactiveFormsModule,
    PlayingCardComponent,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './monster.component.html',
  styleUrl: './monster.component.css',
})
export class MonsterComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute); //ActivatedRoute permet de récupérer les paramètres de l'url
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private monsterService = inject(MonsterService);
  private readonly dialog = inject(MatDialog);

  private subscriptions: Subscription = new Subscription();

  monsterId = -1;
  formGroup = this.fb.group({
    name: ['', [Validators.required]],
    image: ['', [Validators.required]],
    type: [MonsterType.ELECTRIC, [Validators.required]],
    hp: [0, [Validators.required, Validators.min(1), Validators.max(200)]],
    figureCaption: ['', [Validators.required]],
    attackName: ['', [Validators.required]],
    attackStrength: [
      0,
      [Validators.required, Validators.min(1), Validators.max(200)],
    ],
    attackDescription: ['', [Validators.required]],
  });
  monsterTypes = Object.values(MonsterType);
  monster: Monster = Object.assign(new Monster(), this.formGroup.value);

  //utiliser une subscription permet de récuperer l'id du monstre à chaque fois qu'il change, contrairement à un snapshot
  ngOnInit(): void {
    const formValuesSubscription = this.formGroup.valueChanges.subscribe(
      (data) => {
        this.monster = Object.assign(new Monster(), data);
      }
    );
    this.subscriptions.add(formValuesSubscription);

    //pour éviter d'avoir des subscriptions imbriquées, on peut utiliser switchMap dans un pipe
    const routeSubscription = this.route.params
      .pipe(
        switchMap((params) => {
          //switchMap permet de transformer un observable en un autre
          if (params['monster']) {
            this.monsterId = parseInt(params['monster']);
            return this.monsterService.get(this.monsterId);
          }
          return of(null);
        })
      )
      .subscribe((monster) => {
        if (monster) {
          this.monster = monster;
          this.formGroup.patchValue(this.monster);
        }
      });
    this.subscriptions.add(routeSubscription);
  }

  //permet de clore la subscription pour éviter les fuites de mémoire
  ngOnDestroy(): void {
    this.subscriptions?.unsubscribe();
  }

  submit(event: Event) {
    event.preventDefault();
    let saveObservable = null;
    if (this.monsterId === -1) {
      saveObservable = this.monsterService.add(this.monster);
    } else {
      this.monster.id = this.monsterId;
      saveObservable = this.monsterService.update(this.monster);
    }
    const saveSubscription = saveObservable.subscribe(() => {
      this.navigateBack();
    });

    this.subscriptions.add(saveSubscription);
  }

  isFieldValid(name: string) {
    const FormControl = this.formGroup.get(name);
    return FormControl?.invalid && (FormControl?.dirty || FormControl?.touched);
  }

  deleteMonster() {
    const dialogRef = this.dialog.open(
      DeleteMonsterConfirmationDialogComponent
    );
    dialogRef
      .afterClosed()
      .pipe(
        filter((confirmation) => confirmation),
        switchMap(() => this.monsterService.delete(this.monsterId))
      )
      .subscribe(() => {
        this.navigateBack();
      });
  }

  //permet de changer l'image en l'encodant en base64
  onFileChange(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.formGroup.patchValue({
          image: reader.result as string,
        });
      };
    }
  }

  navigateBack() {
    this.router.navigate(['/home']);
  }
}

//private router = inject(Router); //Router permet de naviguer entre les pages
//monsterId = signal<number | undefined>(undefined);
////permet de naviguer vers le monstre suivant
//next() {
//  let nextId = this.monsterId() || 0;
//  nextId++;
//  this.router.navigate(['/monster/' + nextId]);
//}
//
////utiliser une subscription permet de récuperer l'id du monstre à chaque fois qu'il change, contrairement à un snapshot
//ngOnInit(): void {
//  this.routeSubscription = this.route.params.subscribe((params) => {
//    this.monsterId.set(params['id'] ? parseInt(params['id']) : undefined);
//  });
//}

//Il y a un meilleur moyen de gérer les subscriptions
//private routeSubscription: Subscription | null = null;
//private formValuesSubscription: Subscription | null = null;
//private saveSubscription: Subscription | null = null;
//private deleteSubscription: Subscription | null = null;
//
//ngOnInit(): void {
//this.formValuesSubscription = this.formGroup.valueChanges.subscribe(
//  (data) => {
//    this.monster = Object.assign(new Monster(), data);
//  }
//);
////pour éviter d'avoir des subscriptions imbriquées, on peut utiliser switchMap dans un pipe
//this.routeSubscription = this.route.params
//  .pipe(
//    switchMap((params) => {
//      //switchMap permet de transformer un observable en un autre
//      if (params['monster']) {
//        this.monsterId = parseInt(params['monster']);
//        return this.monsterService.get(this.monsterId);
//      }
//      return of(null);
//    })
//  )
//  .subscribe((monster) => {
//    if (monster) {
//      this.monster = monster;
//      this.formGroup.patchValue(this.monster);
//    }
//  });
//}
