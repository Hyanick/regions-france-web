import { Injectable, inject } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';

export interface Departement {
  code: string;
  nom: string;
}

export class LoadDepartement {
  static readonly type = '[Departement] Load Departements';
  constructor(public regionCode: string) {}
}

@State<Departement[]>({
  name: 'departements',
  defaults: [],
})
@Injectable()
export class DepartementState {
  private readonly http = inject(HttpClient);
  //private baseUrlBackend = environment.BASE_URL_BACKEND;
  private baseUrlBackend = 'http://localhost:3000/api';
  constructor() {}

  @Selector()
  static getDepartements(state: Departement[]) {
    return state;
  }

  @Action(LoadDepartement)
  loadDepartements(ctx: StateContext<Departement[]>, action: LoadDepartement) {
    const regionCode = action.regionCode;
    console.log('regionCode', regionCode);

    return this.http
      .get<Departement[]>(
        `${this.baseUrlBackend}/departements/region/${regionCode}`
      )
      .pipe(
        tap((departements) => {
          ctx.setState(departements);
        })
      );
  }
}
