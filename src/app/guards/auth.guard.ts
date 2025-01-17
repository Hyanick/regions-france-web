import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  console.log('route--->', route);
  if (authService.isLoggedIn) {
 
    
    return true; // Autorise l'accès
  } else {
    // Redirige vers la page de connexion
    //router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    router.navigate(['/login']);
    return false;
  }
};
