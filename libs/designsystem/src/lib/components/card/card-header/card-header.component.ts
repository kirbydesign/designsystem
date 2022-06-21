import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

import { NotificationColor } from '@kirbydesign/core';

export type CardFlagLevel = NotificationColor | 'info' | null;

@Component({
  selector: 'kirby-card-header',
  templateUrl: './card-header.component.html',
  styleUrls: ['./card-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardHeaderComponent {
  @Input() title: string;
  @Input() subtitle: string;
  @Input() isTitleBold: boolean;
  @HostBinding('class')
  @Input()
  flagged: CardFlagLevel = null;
}
