import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ProfileCardComponent } from './common-ui/profile-card/profile-card.component';
import { ProfileService } from './data/services/profile.service';

@Component({
  selector: 'app-root',
  imports: [ProfileCardComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  profileService = inject(ProfileService);
  profiles = [];

  constructor() {
    this.profileService.getTestAccounts().subscribe((val) => {
      console.log(val);
    });
  }
}
