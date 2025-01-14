import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RegionProvider } from '../../../providers/region.provider';
import { DepartementProvider } from '../../../providers/departement.provider';
import { CommuneProvider } from '../../../providers/commune.provider';
import { Region } from '../../../models/region.model';
import { Observable } from 'rxjs';
import { Departement } from '../../../models/departement.model';
import { Commune } from '../../../models/commune.model';
import { UserService } from '../../../services/user.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-user-profile-form',
  imports: [
    FormsModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    ReactiveFormsModule,
  ],
  templateUrl: './user-profile-form.component.html',
  styleUrl: './user-profile-form.component.scss',
})
export class UserProfileFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly regionProvider = inject(RegionProvider);
  private readonly departementProvider = inject(DepartementProvider);
  private readonly communeProvider = inject(CommuneProvider);
  private readonly userService = inject(UserService);
  private readonly destroyRef = inject(DestroyRef);

  regions$!: Observable<Region[]>;
  departements$!: Observable<Departement[]>;
  communes$!: Observable<Commune[]>;

  // Selected values
  selectedRegion = signal<string | null>(null);
  selectedDepartement = signal<string | null>(null);
  /*
  // Données des régions, départements et communes (exemple)
  regions: string[] = [
    'Île-de-France',
    "Provence-Alpes-Côte d'Azur",
    'Occitanie',
  ];
  departements: Record<string, string[]> = {
    'Île-de-France': ['75 - Paris', '91 - Essonne', '92 - Hauts-de-Seine'],
    "Provence-Alpes-Côte d'Azur": ['13 - Bouches-du-Rhône', '83 - Var'],
    Occitanie: ['31 - Haute-Garonne', '34 - Hérault'],
  };
  communes: Record<string, string[]> = {
    '75 - Paris': ['Paris 1er', 'Paris 2e', 'Paris 3e'],
    '91 - Essonne': ['Evry', 'Massy', 'Corbeil-Essonnes'],
    '92 - Hauts-de-Seine': ['Nanterre', 'Boulogne-Billancourt'],
    '13 - Bouches-du-Rhône': ['Marseille', 'Aix-en-Provence'],
    '83 - Var': ['Toulon', 'Fréjus'],
    '31 - Haute-Garonne': ['Toulouse', 'Blagnac'],
    '34 - Hérault': ['Montpellier', 'Sète'],
  };*/

  // Champs dépendants
  filteredDepartements: string[] = [];
  filteredCommunes: string[] = [];

  userForm: FormGroup;
  selectedFile: File | null = null;
  previewUrl: string | null = null;

  constructor() {
    // Charger les régions au chargement du composant
    this.regionProvider.loadRegions();
    this.regions$ = this.regionProvider.getRegions();
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      placeOfBirth: [''],
      region: [''],
      departement: [''],
      commune: [''],
      address: [''],
      postalCode: [''],
      country: [''],
      isActive: [true],
    });
  }

  /*onRegionChange(region: string): void {
    this.filteredDepartements = this.departements[region] || [];
    this.filteredCommunes = []; // Réinitialiser les communes
    this.userForm.get('departement')?.reset();
    this.userForm.get('commune')?.reset();
  }*/

  // onDepartementChange(departement: string): void {
  //   this.filteredCommunes = this.communes[departement] || [];
  //   this.userForm.get('commune')?.reset();
  // }

  onRegionChange(regionCode: string) {
    this.selectedRegion.set(regionCode);
    // Charger les départements liés
    this.departementProvider.loadDepartements(regionCode);
    this.departements$ = this.departementProvider.getDepartements();
  }

  onDepartementChange(departementCode: string) {
    // Charger les communes liées
    this.communeProvider.loadCommunes(departementCode);
    this.communes$ = this.communeProvider.getCommunes();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      // Générer l'aperçu
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  // Soumission du formulaire
/*
  onSubmit() {
    if (this.userForm.valid) {
      const formData = new FormData();
      formData.append('firstName', this.userForm.get('firstName')!.value);
      formData.append('lastName', this.userForm.get('lastName')!.value);
      formData.append('gender', this.userForm.get('gender')!.value);
      formData.append('dateOfBirth', this.userForm.get('dateOfBirth')!.value);
      formData.append('placeOfBirth', this.userForm.get('placeOfBirth')!.value);
      formData.append('region', this.userForm.get('region')!.value);
      formData.append('departement', this.userForm.get('departement')!.value);
      formData.append('commune', this.userForm.get('commune')!.value);
      formData.append('address', this.userForm.get('address')!.value);
      formData.append('postalCode', this.userForm.get('postalCode')!.value);
      formData.append('country', this.userForm.get('country')!.value);
      formData.append('isActive', this.userForm.get('isActive')!.value);
      if (this.selectedFile) {
        formData.append('profilePicture', this.selectedFile, this.selectedFile.name);
      }

            // Log the formData to check its contents
            for (let pair of formData.entries()) {
              console.log(pair[0] + ', ' + pair[1]);
            }
      this.userService.addUser(this.userForm.value).subscribe(response => {
        console.log('User created successfully', response);
      });
    }
  }*/
 
  onSubmit(): void {
    if (this.userForm.invalid) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }
  
    const formData = new FormData();
    const formValue = this.userForm.value;
    console.log('Form Value:', formValue);
  
    // Ajoutez les champs textuels
    for (const key in formValue) {
      if (formValue[key] !== null && formValue[key] !== undefined) {
        if (key === 'dateOfBirth' && formValue[key] instanceof Date) {
          formData.append(key, formValue[key].toISOString().split('T')[0]);
        } else {
          formData.append(key, formValue[key]);
        }
      }
    }
  
    // Ajoutez le fichier sélectionné
    if (this.selectedFile) {
      formData.append('profilePicture', this.selectedFile, this.selectedFile.name);
    } else {
      console.warn('No profile picture selected.');
    }
  
    // Debug : Vérifiez les données dans FormData
    formData.forEach((value, key) => {
      console.log(`FormData Key: ${key}, Value: ${value}`);
    });
  
    // Appel au service
    console.log('formData send', Array.from(formData.entries()));
    
    this.userService.addUser(formData).subscribe({
      next: (response) => {
        alert('Utilisateur créé avec succès !');
        console.log(response);
      },
      error: (error) => {
        alert("Erreur lors de la création de l'utilisateur.");
        console.error(error);
      },
    });
  }
  

  /* onSubmit(): void {
    if (this.userForm.valid) {
      const formData = new FormData();
      Object.entries(this.userForm.value).forEach(([key, value]) => {
        formData.append(key, value as string);
      });

      if (this.selectedFile) {
        formData.append(
          'profilePicture',
          this.selectedFile,
          this.selectedFile.name
        );
      }

      console.log('Form data submitted:', formData);
      // Envoyer `formData` au backend via un service
      this.userSerice.addUser(formData).pipe(takeUntilDestroyed(this.destroyRef)).subscribe()
    }
  }*/
}
