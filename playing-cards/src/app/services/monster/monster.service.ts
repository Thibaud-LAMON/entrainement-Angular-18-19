import { inject, Injectable } from '@angular/core';
import { Monster } from '../../models/monster.model';
import { HttpClient } from '@angular/common/http';
import { IMonster } from '../../interfaces/monster.interface';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // indique la portée du service
})
export class MonsterService {
  private BASE_URL = 'http://localhost:8000/monsters/';
  private http = inject(HttpClient);

  getAll(): Observable<Monster[]> {
    return this.http.get<IMonster[]>(this.BASE_URL).pipe(
      map((monsterDictArray) => {
        return monsterDictArray.map<Monster>((monsterDict) =>
          Monster.fromJson(monsterDict)
        );
      })
    );
  }

  get(id: number): Observable<Monster> {
    return this.http
      .get<IMonster>(this.BASE_URL + id + '/')
      .pipe(map((monsterDict) => Monster.fromJson(monsterDict)));
  }

  add(monster: Monster): Observable<Monster> {
    return this.http
      .post<IMonster>(this.BASE_URL, monster.toJson())
      .pipe(map((monsterDict) => Monster.fromJson(monsterDict)));
  }

  update(monster: Monster): Observable<Monster> {
    return this.http
      .put<IMonster>(this.BASE_URL + monster.id + '/', monster.toJson())
      .pipe(map((monsterDict) => Monster.fromJson(monsterDict)));
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.BASE_URL + id + '/');
  }
}
