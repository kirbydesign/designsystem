import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

interface IHeaderLink {
  text: string;
  routerLink?: string;
  externalUrl?: string;
}
@Component({
  selector: 'cookbook-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() isMenuOpen = false;
  @Output() menuToggle = new EventEmitter<boolean>();

  items: IHeaderLink[] = [
    { text: 'Components', routerLink: '/home/intro' },
    { text: 'Ressources', routerLink: '' },
    { text: 'Changelog', routerLink: '/home/changelog' },
    { text: 'Component Status', routerLink: '/home/component-status' },
    { text: 'Design', externalUrl: 'https://kirby.design/' },
    { text: 'GitHub', externalUrl: 'https://github.com/kirbydesign/designsystem' },
  ];

  constructor() {}

  ngOnInit() {}

  onToggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.menuToggle.emit(this.isMenuOpen);
  }
}
