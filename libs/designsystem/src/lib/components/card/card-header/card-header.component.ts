import { Component, HostBinding, Input } from '@angular/core';

import { NotificationColor } from '../../../helpers';

export type CardFlagType = NotificationColor | 'info' | null;

@Component({
  selector: 'kirby-card-header',
  templateUrl: './card-header.component.html',
  styleUrls: ['./card-header.component.scss'],
})
export class CardHeaderComponent {
  @Input() title: string;
  @Input() subtitle: string;
  @Input() isTitleBold: boolean;
  @HostBinding('class')
  @Input()
  flagged: CardFlagType = null;
}
