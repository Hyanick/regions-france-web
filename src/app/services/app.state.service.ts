import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Region } from '../models/region.model';
import { Departement } from '../models/departement.model';
import { Commune } from '../models/commune.model';
import { environment } from '../../environments/environment.development';


@Injectable({ providedIn: 'root' })
export class AppStateService {

  private baseUrlBackend = environment.BASE_URL_BACKEND; // Adresse de l'API

  constructor(private http: HttpClient) {}

  // Récupérer toutes les régions depuis le backend
  getRegions(): Observable<Region[]> {
    return this.http.get<Region[]>(`${this.baseUrlBackend}/regions`);
  }

  // Récupérer les départements d'une région donnée
  getDepartementsByRegion(codeRegion: string): Observable<Departement[]> {
    return this.http.get<Departement[]>(
      `${this.baseUrlBackend}/departements/region/${codeRegion}`
    );
  }

  // Récupérer les communes d'un département donné
  getCommunesByDepartement(codeDepartement: string): Observable<Commune[]> {
    return this.http.get<Commune[]>(
      `${this.baseUrlBackend}/communes/departement/${codeDepartement}`
    );
  }

  // Trouver une région spécifique par son code
  getRegionByCode(code: string): Observable<Region> {
    return this.http.get<Region>(`${this.baseUrlBackend}/regions/${code}`);
  }

  // Trouver un département spécifique par son code
  getDepartementByCode(code: string): Observable<Departement> {
    return this.http.get<Departement>(
      `${this.baseUrlBackend}/departements/${code}`
    );
  }

  // Trouver une commune spécifique par son code
  getCommuneByCode(code: string): Observable<Commune> {
    return this.http.get<Commune>(
      `${this.baseUrlBackend}/communes/${code}`
    );
  }
}





/*
@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  private baseUrl = environment.BASE_URL_BACKEND; // Adresse de l'API

  constructor(private http: HttpClient) {}

  // Recherche des régions
  searchRegions(query: string): Observable<Region[]> {
    return this.http.get<Region[]>(`${this.baseUrl}/regions?search=${query}`);
  }

  // Départements par région
  getDepartementsByRegion(codeRegion: string): Observable<Departement[]> {
    return this.http.get<Departement[]>(
      `${this.baseUrl}/departements?codeRegion=${codeRegion}`
    );
  }

  // Communes par département
  getCommunesByDepartement(codeDepartement: string): Observable<Commune[]> {
    return this.http.get<Commune[]>(
      `${this.baseUrl}/communes?codeDepartement=${codeDepartement}`
    );
  }
}
*/