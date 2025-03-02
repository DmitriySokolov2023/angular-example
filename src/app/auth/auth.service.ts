import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { tap } from 'rxjs';
import { TokenResponse } from '../data/interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  baseUrl = 'https://icherniakov.ru/yt-course/auth';
  token: string | null = '';
  refreshToken: string | null = '';
  constructor(private cookieService: CookieService) {}

  get isAuth() {
    if (!this.token) {
      this.token = this.cookieService.get('token');
    }
    return !!this.token;
  }

  login(payload: { username: string; password: string }) {
    const fd = new FormData();
    fd.append('username', payload.username);
    fd.append('password', payload.password);
    return this.http.post<TokenResponse>(`${this.baseUrl}/token`, fd).pipe(
      tap((val) => {
        this.token = val.access_token;
        this.refreshToken = val.refresh_token;

        this.cookieService.set('token', this.token);
        this.cookieService.set('refresh_token', this.refreshToken);
      })
    );
  }

  refreshAuthToken() {
    return this.http.post<TokenResponse>(`${this.baseUrl}/token`, {
      refresh_token: this.refreshToken,
    });
  }
}
