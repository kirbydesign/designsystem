import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';
import { ThemeColorDirective } from '@kirbydesign/designsystem/shared';
import { IonBadge } from '@ionic/angular/standalone';

export type BadgeSize = 'sm' | 'md';

const KIRBY_BADGE_TEXT_PROPERTY_DEPRECATION_WARNING =
  '[Kirby Badge] The `text` property has been deprecated. Please set the text of the Badge between the opening and closing tag.';

@Component({
  selector: 'kirby-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
  standalone: true,
  imports: [CommonModule, IonBadge],
  hostDirectives: [{ directive: ThemeColorDirective, inputs: ['themeColor'] }],
})
export class BadgeComponent {
  private _text: string;
  get text(): string {
    return this._text;
  }
  /**
   * @deprecated The 'text' property has been deprecated.
   * Please set the text of the Badge between the opening and closing tag.
   */
  @Input() set text(value: string) {
    console.warn(KIRBY_BADGE_TEXT_PROPERTY_DEPRECATION_WARNING);
    this._text = value;
  }

  @HostBinding('class')
  @Input()
  size: BadgeSize = 'md';
}
