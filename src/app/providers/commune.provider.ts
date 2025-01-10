import { Injectable, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  Commune,
  CommuneState,
  LoadCommune,
} from '../store/states/commune.state';

@Injectable({
  providedIn: 'root',
})
export class CommuneProvider {
  private readonly store = inject(Store);
  constructor() {}

  // Charger les communes liées à un département
  loadCommunes(departementCode: string): void {
    this.store.dispatch(new LoadCommune(departementCode));
  }

  // Obtenir les communes depuis le store
  getCommunes(): Observable<Commune[]> {
    return this.store.select(CommuneState.getCommunes);
  }
}
