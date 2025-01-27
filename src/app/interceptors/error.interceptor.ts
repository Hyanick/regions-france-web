import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Une erreur inconnue est survenue.';
      if (error.error instanceof ErrorEvent) {
        // Erreur côté client
        errorMessage = `Erreur: ${error.error.message}`;
      } else {
        // erreur côté backend
        const erroStatus = error.status;
        if (erroStatus === 400) {
          errorMessage = error.error.message || 'Requête invalide.';
        } else if (erroStatus === 401) {
          errorMessage = ' Accès non autorisé. Veuillez nous contacter.';
        } else if (erroStatus === 404) {
          errorMessage = 'Ressource introuvable';
        } else if (erroStatus === 500) {
          errorMessage = 'Erreur interne du serveur';
        }
      }
      // Vous pouvez aussi notifier l'utilisateur ici
      console.error('Erreur interceptée:', errorMessage);
      return throwError(() => new Error(errorMessage));
    })
  );
};
