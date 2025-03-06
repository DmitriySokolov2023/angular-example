import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProfileService } from '../../data/services/profile.service';
import { SvgComponent } from '../svg/svg.component';
import { SubscriberCardComponent } from './subscriber-card/subscriber-card.component';

@Component({
  selector: 'app-sidebar',
  imports: [
    SvgComponent,
    SubscriberCardComponent,
    RouterLink,
    JsonPipe,
    AsyncPipe,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  profileService = inject(ProfileService);
  subscribers$ = this.profileService.getSubscribers();

  menuItems = [
    {
      label: 'Моя страница',
      icon: 'home',
      link: 'profile/me',
    },
    {
      label: 'Чаты',
      icon: 'chats',
      link: 'chats',
    },
    {
      label: 'Поиск',
      icon: 'search',
      link: 'search',
    },
  ];
  // ngOnInit(): void {
  //   this.profileService.getSubscribers().subscribe((val) => {
  //     this.profile = val.items;
  //     console.log(this.profile);
  //   });
  // }
}
