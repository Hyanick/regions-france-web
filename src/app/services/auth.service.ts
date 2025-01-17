import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { UserRegister } from '../models/user-register.model';
import { BehaviorSubject, Observable, map } from 'rxjs';
import * as jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);
  private baseUrlBackend = 'http://localhost:3000/api';
  private currentUserSubject!: BehaviorSubject<any>;
  public currentUser!: Observable<any>;

  constructor() {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(sessionStorage.getItem('currentUser') || 'null')
    );
    this.currentUser = this.currentUserSubject.asObservable();
   
  }
  regsiter(user: UserRegister) {
    return this.httpClient.post<UserRegister>(
      `${this.baseUrlBackend}/auth/register`,
      user
    );
  }

  // Login method
  login(email: string, password: string): Observable<any> {
    return this.httpClient
      .post<any>(`${this.baseUrlBackend}/auth/login`, { email, password })
      .pipe(
        map((response: any) => {
          // Store the user and JWT token in local storage
          console.log('response', response);
          if (response && response.accessToken) {
            sessionStorage.setItem('currentUser', JSON.stringify(response));
            this.currentUserSubject.next(response);
          }
          return response;
        })
      );
  }

  // Logout method
  logout(): void {
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  // Check if the user is logged in
  public get isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  // Get current user token
  public get accessToken(): string | null {
    return this.currentUserSubject.value?.accessToken || null;
  }



  getUserId(): number | null {
    const accessToken = this.accessToken; // Assurez-vous que le token est stocké ici
    console.log('token userID', accessToken);
    

    if (!accessToken) return null;

    const decodedToken = jwtDecode.jwtDecode<
      jwtDecode.JwtPayload & { userId: number }
    >(accessToken);

    console.log('decodedToken', decodedToken);
     
    return decodedToken?.userId || null; // Supposons que 'userId' est stocké dans le token
  }
}
