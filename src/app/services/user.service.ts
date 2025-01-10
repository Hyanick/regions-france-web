import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly httpClient = inject(HttpClient);
  private baseUrlBackend = 'http://localhost:3000/api';

  constructor() {}

  getUsers() {
    return this.httpClient.get<any>(`${this.baseUrlBackend}/users`);
  }

  getProfilePicture(userId: number) {
    return this.httpClient.get<any>(
      `${this.baseUrlBackend}/users/${userId}/profile-picture`
    );
  }
}
