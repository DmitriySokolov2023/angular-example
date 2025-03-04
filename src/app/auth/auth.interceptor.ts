import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from './auth.service';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.token;

  if (!token) return next(req);
  else {
    return next(addToken(req, token)).pipe(
      catchError((error) => {
        if (error.status === 403) {
          return refreshAndProceed(authService, req, next);
        }

        return throwError(error);
      })
    );
  }
};
const refreshAndProceed = (
  authService: AuthService,
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  return authService.refreshAuthToken().pipe(
    switchMap(() => {
      return next(req);
    })
  );
};

const addToken = (req: HttpRequest<any>, token: string) => {
  return (req = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  }));
};
