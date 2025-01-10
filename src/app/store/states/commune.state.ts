import { Injectable, inject } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';

export interface Commune {
  code: string;
  nom: string;
}

export class LoadCommune {
  static readonly type = '[Commune] Load Communes';
  constructor(public departementCode: string) {}
}

@State<Commune[]>({
  name: 'communes',
  defaults: [],
})
@Injectable()
export class CommuneState {
  private readonly http = inject(HttpClient);
  //private baseUrlBackend = environment.BASE_URL_BACKEND;
  private baseUrlBackend = 'http://localhost:3000/api';
  constructor() {}

  @Selector()
  static getCommunes(state: Commune[]) {
    return state;
  }

  @Action(LoadCommune)
  loadCommunes(ctx: StateContext<Commune[]>, action: LoadCommune) {
    const departementCode = action.departementCode;
    return this.http.get<Commune[]>(`${this.baseUrlBackend}/communes/departement/${departementCode}`).pipe(
      tap((communes) => {
        ctx.setState(communes);
      })
    );
  }
}
