import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

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
  return next(req);
};
