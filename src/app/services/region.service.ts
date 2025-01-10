import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class RegionService {
  private baseUrlBackend = environment.BASE_URL_BACKEND;

  constructor(private http: HttpClient) {}

  getRegions(): Observable<{ code: string; nom: string }[]> {
    return this.http.get<{ code: string; nom: string }[]>(`${this.baseUrlBackend}/regions`);
  }
}
