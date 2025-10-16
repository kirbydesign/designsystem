import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

import { CardFlagLevel } from '../card-flag-level';

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
  @Input()
  flagged: CardFlagLevel = null;
  @HostBinding('class.has-padding')
  @Input()
  hasPadding: boolean = true;

  @HostBinding('class')
  get _cssClass() {
    return [this.flagged, this.flagged ? 'flagged' : null];
  }
}
