import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'kirby-local-navigation-item-poc',
  templateUrl: './local-navigation-item-poc.component.html',
  styleUrls: ['./local-navigation-item-poc.component.scss'],
})
export class LocalNavigationItemPocComponent {
  @HostBinding('attr.tabindex')
  tabIndex = 0;

  constructor() {
    /* */
  }
}
