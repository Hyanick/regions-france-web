import { Injectable, inject } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';

export interface Region {
  code: string;
  nom: string;
}

export class LoadRegion {
  static readonly type = '[Region] Load Regions';
}

@State<Region[]>({
  name: 'regions',
  defaults: [],
})
@Injectable()
export class RegionState {
  private readonly http = inject(HttpClient);
 //private baseUrlBackend = environment.BASE_URL_BACKEND;
 private baseUrlBackend = 'http://localhost:3000/api';
  constructor() {}

  @Selector()
  static getRegions(state: Region[]) {
    return state;
  }

  @Action(LoadRegion)
  loadRegions(ctx: StateContext<Region[]>) {
    return this.http.get<Region[]>(`${this.baseUrlBackend}/regions`).pipe(
      tap((regions) => {
        ctx.setState(regions);
      })
    );
  }
}
