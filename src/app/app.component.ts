import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileCardComponent } from './common-ui/profile-card/profile-card.component';
import { Profile } from './data/interfaces/profile.interface';
import { ProfileService } from './data/services/profile.service';

@Component({
  selector: 'app-root',
  imports: [ProfileCardComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  profileService = inject(ProfileService);
  profiles: Profile[] = [];

  constructor() {
    this.profileService.getTestAccounts().subscribe((val) => {
      this.profiles = val;
    });
  }
}
