import { Component, computed, signal, inject, Signal } from '@angular/core';
import { RegionService } from '../../services/region.service';
import { DepartementService } from '../../services/departement.service';
import { CommuneService } from '../../services/commune.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-form-select-search',
  templateUrl: './form-select-search.component.html',
  styleUrls: ['./form-select-search.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class FormSelectSearchComponent {
  private regionService = inject(RegionService);
  private departementService = inject(DepartementService);
  private communeService = inject(CommuneService);

  // Signals for data
  regions = signal<{ code: string; nom: string }[]>([]);
  departements = signal<{ code: string; nom: string }[]>([]);
  communes = signal<{ code: string; nom: string }[]>([]);

  // Signals for search queries
  regionSearchQuery = signal<string>('');
  departementSearchQuery = signal<string>('');
  communeSearchQuery = signal<string>('');

  // Selected values
  selectedRegion = signal<string | null>(null);
  selectedDepartement = signal<string | null>(null);

  constructor() {
    this.loadRegions();
  }

  private getInputValue(event: Event): string {
    return (event.target as HTMLInputElement)?.value || '';
  }

  // Load all regions
  private loadRegions() {
    this.regionService.getRegions().subscribe((regions) => this.regions.set(regions));
  }

  // Load departments when a region is selected
  loadDepartements(regionCode: string) {
    this.departementService.getDepartementsByRegion(regionCode).subscribe((departements) =>
      this.departements.set(departements)
    );
  }

  // Load communes when a department is selected
  loadCommunes(departementCode: string) {
    this.communeService.getCommunesByDepartement(departementCode).subscribe((communes) =>
      this.communes.set(communes)
    );
  }

  // Filtered lists for dynamic searching
  filteredRegions = computed(() =>
    this.regions().filter((region) =>
      region.nom.toLowerCase().includes(this.regionSearchQuery().toLowerCase())
    )
  );

  filteredDepartements = computed(() =>
    this.departements().filter((departement) =>
      departement.nom.toLowerCase().includes(this.departementSearchQuery().toLowerCase())
    )
  );

  filteredCommunes = computed(() =>
    this.communes().filter((commune) =>
      commune.nom.toLowerCase().includes(this.communeSearchQuery().toLowerCase())
    )
  );

  // Handlers for selections and searches
  onRegionSelect(event: Event) {
    const regionCode = this.getInputValue(event);
    this.selectedRegion.set(regionCode);
    this.loadDepartements(regionCode);
  }

  onDepartementSelect(event: Event) {
    const departementCode = this.getInputValue(event);
    this.selectedDepartement.set(departementCode);
    this.loadCommunes(departementCode);
  }

  onSearch(event: Event, type: 'region' | 'departement' | 'commune') {
    const query = this.getInputValue(event);
    if (type === 'region') this.regionSearchQuery.set(query);
    if (type === 'departement') this.departementSearchQuery.set(query);
    if (type === 'commune') this.communeSearchQuery.set(query);
  }
}
