import { CommonModule } from '@angular/common';
import {
  Component,
  Signal,
  effect,
  signal
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Observable, debounceTime, of, startWith, switchMap } from 'rxjs';
import { Commune } from '../../models/commune.model';
import { Departement } from '../../models/departement.model';
import { Region } from '../../models/region.model';
import { AppStateService } from '../../services/app.state.service';


@Component({
  selector: 'app-form-select-autocomplete',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
  ],
  templateUrl: './form-select-autocomplete.component.html',
  styleUrls: ['./form-select-autocomplete.component.scss'],
  providers: [AppStateService],
})
export class FormSelectAutocompleteComponent {
  // FormControls
  regionControl = new FormControl('');
  departementControl = new FormControl('');
  communeControl = new FormControl('');

  // Signaux pour gérer les sélections
  selectedRegion = signal<Region | null>(null);
  selectedDepartement = signal<Departement | null>(null);
  selectedCommune = signal<Commune | null>(null);

  // Observables pour les listes
  regions$: Observable<Region[]>;
  departements$!: Observable<Departement[]>;
  communes$!: Observable<Commune[]>;

  constructor(private appState: AppStateService) {
    // Charger les régions au démarrage
    this.regions$ = this.appState.getRegions();

    // Charger les départements en fonction de la région sélectionnée
    effect(() => {
      const regionCode = this.regionControl.value;
      if (regionCode) {
        this.departements$ = this.appState.getDepartementsByRegion(regionCode);
      }
    });

    // Charger les communes en fonction du département sélectionné
    effect(() => {
      const departementCode = this.departementControl.value;
      if (departementCode) {
        this.communes$ = this.appState.getCommunesByDepartement(
          departementCode
        );
      }
    });

    // Mettre à jour les signaux pour refléter les sélections
    effect(() => {
      const regionCode = this.regionControl.value;
      if (regionCode) {
        this.appState.getRegionByCode(regionCode).subscribe((region) => {
          this.selectedRegion.set(region);
        });
      }
    });

    effect(() => {
      const departementCode = this.departementControl.value;
      if (departementCode) {
        this.appState.getDepartementByCode(departementCode).subscribe(
          (departement) => {
            this.selectedDepartement.set(departement);
          }
        );
      }
    });

    effect(() => {
      const communeCode = this.communeControl.value;
      if (communeCode) {
        this.appState.getCommuneByCode(communeCode).subscribe((commune) => {
          this.selectedCommune.set(commune);
        });
      }
    });
  }
}
