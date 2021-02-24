import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

interface IHeaderLink {
  text: string;
  routerLink?: string;
  externalUrl?: string;
  showAsActive?: boolean;
}

export const navigationItems: IHeaderLink[] = [
  { text: 'Components', routerLink: '/home/intro' },
  { text: 'Ressources', routerLink: '' },
  { text: 'Changelog', routerLink: '/home/changelog' },
  { text: 'Component Status', routerLink: '/home/component-status' },
  { text: 'Design', externalUrl: 'https://kirby.design/' },
  { text: 'GitHub', externalUrl: 'https://github.com/kirbydesign/designsystem' },
];

@Component({
  selector: 'cookbook-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() isMenuOpen = false;
  @Output() menuToggle = new EventEmitter<boolean>();

  constructor(private router: Router) {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        // we want the component item to appear active when a specific component route is active also
        navigationItems[0].showAsActive = val.url.indexOf('showcase') > -1;
      }
    });
  }

  navigationItems = navigationItems;

  get icon(): string {
    return this.isMenuOpen ? 'close' : 'more';
  }

  ngOnInit(): void {}

  onToggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.menuToggle.emit(this.isMenuOpen);
  }
}
