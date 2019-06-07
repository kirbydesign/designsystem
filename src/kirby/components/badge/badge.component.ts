import { Component, Input } from '@angular/core';

import { ThemeColor } from '../../helpers/theme-color.type';

@Component({
  selector: 'kirby-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
})
export class BadgeComponent {
  @Input() themeColor: ThemeColor;
  @Input() text: string;
}
