import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { NgxsModule, provideStore } from '@ngxs/store';

import { routes } from './app.routes';
import { CommuneState } from './store/states/commune.state';
import { DepartementState } from './store/states/departement.state';
import { RegionState } from './store/states/region.state';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideServiceWorker } from '@angular/service-worker';
import { environment } from '../environments/environment.development';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsStoragePluginModule, StorageOption } from '@ngxs/storage-plugin';

const LOCAL_STORAGE: 'localStorage' = 'localStorage';
export function migrate(state: any) {
  return {
    ...state,
  };
}
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore([CommuneState, RegionState, DepartementState]),
    provideAnimationsAsync(),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
    // NgxsDevtoolsPluginModule.forRoot()
    importProvidersFrom(
      // NgxsModule.forRoot([CommuneState, RegionState, DepartementState], {
      //   developmentMode: !environment.production, // Active le mode développement
      // }),
      NgxsReduxDevtoolsPluginModule.forRoot({
        disabled: environment.production, // Désactiver en production
      }),
      NgxsLoggerPluginModule.forRoot({
        disabled: environment.production, // Désactiver en production
      }),
      NgxsStoragePluginModule.forRoot({
        keys: ['myState'], // Nom(s) de l’état(s) que vous voulez persister
        storage: 1, // Utilisez LocalStorage (par défaut) ou SessionStorage
        migrations: [
          {
            version: 1,
            versionKey: 'version',
            migrate: migrate,
          },
        ],
      })
    ),
  ],
};
