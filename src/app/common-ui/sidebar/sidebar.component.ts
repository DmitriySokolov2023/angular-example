import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SvgComponent } from '../svg/svg.component';
import { SubscriberCardComponent } from './subscriber-card/subscriber-card.component';

@Component({
  selector: 'app-sidebar',
  imports: [
    SvgComponent,
    SubscriberCardComponent,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
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
}
