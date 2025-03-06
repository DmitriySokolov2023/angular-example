import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Pageble } from '../interfaces/pageble.interface';
import { Profile } from '../interfaces/profile.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  http = inject(HttpClient);
  baseApiUrl = 'https://icherniakov.ru/yt-course/';
  constructor() {}

  getTestAccounts() {
    return this.http.get<Profile[]>(`${this.baseApiUrl}account/test_accounts`);
  }

  getMe() {
    return this.http.get<Profile>(`${this.baseApiUrl}account/me`);
  }

  getSubscribers() {
    return this.http.get<Pageble<Profile>>(
      `${this.baseApiUrl}account/subscribers/?page=1&size=50`
    );
  }
}
