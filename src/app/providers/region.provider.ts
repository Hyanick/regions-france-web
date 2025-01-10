import { Injectable, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { LoadRegion, Region, RegionState } from '../store/states/region.state';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegionProvider {

  private readonly store = inject(Store);
  constructor() {}

  // Charger les régions
  loadRegions(): void {
    this.store.dispatch(new LoadRegion());
  }

  // Obtenir les régions depuis le store
  getRegions(): Observable<Region[]> {
    return this.store.select(RegionState.getRegions);
  }
}
