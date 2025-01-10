import { Injectable, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { Departement, DepartementState, LoadDepartement } from '../store/states/departement.state';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartementProvider {
  private readonly store = inject(Store);
  constructor() { }
    // Charger les départements liés à une région
    loadDepartements(regionCode: string): void {
      this.store.dispatch(new LoadDepartement(regionCode));
    }
  
    // Obtenir les départements depuis le store
    getDepartements(): Observable<Departement[]> {
      return this.store.select(DepartementState.getDepartements);
    }

}
