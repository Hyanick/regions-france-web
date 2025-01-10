import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Departement } from '../../store/states/departement.state';
import { Region } from '../../store/states/region.state';
import { Commune } from '../../store/states/commune.state';
import { RegionProvider } from '../../providers/region.provider';
import { DepartementProvider } from '../../providers/departement.provider';
import { CommuneProvider } from '../../providers/commune.provider';

@Component({
  selector: 'app-form-select',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.scss'],
})
export class FormSelectComponent {
  regions$!: Observable<Region[]>;
  departements$!: Observable<Departement[]>;
  communes$!: Observable<Commune[]>;

  form: FormGroup;
  private readonly fb = inject(FormBuilder);
  private readonly regionProvider = inject(RegionProvider);
  private readonly departementProvider = inject(DepartementProvider);
  private readonly communeProvider = inject(CommuneProvider);

    // Selected values
    selectedRegion = signal<string | null>(null);
    selectedDepartement = signal<string | null>(null);

  constructor() {
    this.form = this.fb.group({
      region: [''],
      departement: [''],
      commune: [''],
    });

    // Charger les régions au chargement du composant
    this.regionProvider.loadRegions();
    this.regions$ = this.regionProvider.getRegions();
  }

  onRegionChange(event: Event) {
    const regionCode = (event.target as HTMLSelectElement).value;

    this.selectedRegion.set(regionCode)
    // Charger les départements liés
    this.departementProvider.loadDepartements(regionCode);
    this.departements$ = this.departementProvider.getDepartements();
  }

  onDepartementChange(event: Event) {
    const departementCode = (event.target as HTMLSelectElement).value;
    // Charger les communes liées
    this.communeProvider.loadCommunes(departementCode);
    this.communes$ = this.communeProvider.getCommunes();
  }
}
