import { ChangeDetectionStrategy, Component, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'kirby-tab-navigation-item',
  templateUrl: './tab-navigation-item.component.html',
  styleUrls: ['./tab-navigation-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabNavigationItemComponent {
  @Input()
  label = '';

  constructor() {
    /* */
  }
}
