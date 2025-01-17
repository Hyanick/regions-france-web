import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly httpClient = inject(HttpClient);
  private baseUrlBackend = 'http://localhost:3000/api';

  constructor() {}

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.baseUrlBackend}/users`);
  }

  updateProfile(userId: number | null, data: FormData): Observable<any> {
    return this.httpClient.patch(`${this.baseUrlBackend}/users/update-profile/${userId}`, data);
  }

  getUserProfile(): Observable<any> {
    return this.httpClient.get(`${this.baseUrlBackend}/auth/profile`);
  }

  getProfilePicture(userId: number) {
    return this.httpClient.get<any>(
      `${this.baseUrlBackend}/users/profile-picture/${userId}`
    );
  }

  addUser(userData: any) {
    console.log('payload', userData);
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.httpClient.post(`${this.baseUrlBackend}/users`, userData, {

    });
  }
}
