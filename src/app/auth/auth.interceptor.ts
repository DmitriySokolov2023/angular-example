import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.token;

  if (!token) return next(req);
  else {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(req).pipe(
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
) => {};
