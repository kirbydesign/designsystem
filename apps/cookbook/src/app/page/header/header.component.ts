import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

interface HeaderLink {
  text: string;
  route?: string;
  externalUrl?: string;
  showAsActive?: boolean;
}

export const navigationItems: HeaderLink[] = [
  { text: 'Introduction', route: '/home/intro' },
  { text: 'Ressources', route: '' },
  { text: 'Changelog', route: '/home/changelog' },
  { text: 'Component Status', route: '/home/component-status' },
  { text: 'Design', externalUrl: 'https://kirby.design/' },
  { text: 'GitHub', externalUrl: 'https://github.com/kirbydesign/designsystem' },
];

@Component({
  selector: 'cookbook-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() isMenuOpen = false;
  @Output() menuToggle = new EventEmitter<boolean>();

  navigationItems = navigationItems;

  get menuIcon(): string {
    return this.isMenuOpen ? 'close' : 'more';
  }

  onToggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.menuToggle.emit(this.isMenuOpen);
  }
}
