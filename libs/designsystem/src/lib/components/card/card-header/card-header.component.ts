import { Component, HostBinding, Input } from '@angular/core';

import { NotificationAndInfoColor } from '../../../helpers';

export type CardFlagType = NotificationAndInfoColor;

@Component({
  selector: 'kirby-card-header',
  templateUrl: './card-header.component.html',
  styleUrls: ['./card-header.component.scss'],
})
export class CardHeaderComponent {
  @Input() title: string;
  @Input() subtitle: string;
  @Input() isTitleBold: boolean;
  @Input() flagged: CardFlagType = null;

  @HostBinding('class')
  get _cssClass() {
    // TODO: Should we use the 'flagged-' prefix or not?
    return [this.flagged && `flagged-${this.flagged}`];
  }
}
