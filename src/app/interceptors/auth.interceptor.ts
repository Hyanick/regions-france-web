import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, switchMap, throwError } from 'rxjs';


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const jwtHelper = new JwtHelperService();
  const accessToken = authService.accessToken;
  const isTokenExpired = jwtHelper.isTokenExpired(accessToken);

  console.log('accessToken --->', accessToken);

  // Si le token existe et n'est pas expiré, on l'ajoute aux en-têtes
  if (accessToken && !isTokenExpired) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  return next(req).pipe(
    catchError((error) => {
      // Vérifie si l'erreur est une 401 et déclenche un rafraîchissement du token
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return authService.refreshToken()?.pipe(
          switchMap(() => {
            const newAccessToken = authService.accessToken;

            // Si un nouveau token est récupéré, on ajoute le nouvel en-tête Authorization
            if (newAccessToken) {
              req = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newAccessToken}`,
                },
              });
              return next(req);
            } else {
              // Si le refreshToken ne fournit pas de token, on rejette l'erreur
              return throwError(() => error);
            }
          }),
          catchError((refreshError) => {
            // Gestion d'erreur supplémentaire lors du rafraîchissement du token
            console.error('Error during token refresh:', refreshError);
            return throwError(() => refreshError);
          })
        );
      }

      // Propagation de l'erreur initiale si ce n'est pas une 401
      return throwError(() => error);
    })
  );
};

/*
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const jwtHelper = new JwtHelperService();
  const accessToken = authService.accessToken;
  const isTokenExpired = jwtHelper.isTokenExpired(accessToken);
  
  console.log('accessToken --->', accessToken);
  
  if (accessToken && !isTokenExpired) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
  return next(req).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return authService.refreshToken()?.pipe(
          switchMap(() => {
            const newAccessToken =authService.accessToken;
            req = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newAccessToken}`,
              },
            });
            return next(req);
          }),
        );
      }
      return throwError(() => error);
    }),
  );
}
*/
