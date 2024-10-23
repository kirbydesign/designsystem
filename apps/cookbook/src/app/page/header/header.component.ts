import { Component, EventEmitter, Input, Output } from '@angular/core';

interface HeaderLink {
  text: string;
  route?: string;
  externalUrl?: string;
  showAsActive?: boolean;
}

export const navigationItems: HeaderLink[] = [
  { text: 'Introduction', route: '/home/intro' },
  { text: 'Components', route: '/home/component-overview' },
  { text: 'Guides', route: '/home/guides' },
  { text: 'Accessibility', route: '/home/accessibility-in-kirby' },
  { text: 'Extensions', route: '/home/extensions' },
  {
    text: 'Changelog',
    externalUrl: 'https://github.com/kirbydesign/designsystem/releases',
  },

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
