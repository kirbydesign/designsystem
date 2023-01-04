import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'kirby-tab-navigation-item',
  templateUrl: './tab-navigation-item.component.html',
  styleUrls: ['./tab-navigation-item.component.scss'],
})
export class TabNavigationItemComponent {
  @HostBinding('attr.tabindex')
  tabIndex = 0;

  constructor() {
    /* */
  }
}
