import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  baseUrl = 'https://icherniakov.ru/yt-course/auth/';
  constructor() {}

  login(payload: { username: string; password: string }) {
    return this.http.post(`${this.baseUrl}token`, payload);
  }
}
