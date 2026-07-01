import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  inject,
  Input,
  Output,
} from '@angular/core';

import { BrandColor, NotificationColor, ThemeColor } from '@kirbydesign/core';
import { ThemeColorDirective } from '@kirbydesign/designsystem/shared';

export enum AvatarSize {
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
}

@Component({
  imports: [CommonModule],
  selector: 'kirby-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [ThemeColorDirective],
})
export class AvatarComponent {
  private themeColorDirective = inject(ThemeColorDirective);

  @Input() imageSrc: string;
  @Input() imageLoading: 'eager' | 'lazy' | undefined;
  @Input() altText: string;
  @Input() stroke: boolean;
  @Input() text: string;
  @Input() overlay: boolean;
  @Input() size: AvatarSize | `${AvatarSize}` = AvatarSize.SM;

  private _themeColor:
    | NotificationColor
    | BrandColor
    | 'medium'
    | 'white'
    | 'dark'
    | 'light'
    | 'semi-light';
  @Input()
  get themeColor():
    | NotificationColor
    | BrandColor
    | 'medium'
    | 'white'
    | 'dark'
    | 'light'
    | 'semi-light' {
    return this._themeColor;
  }
  set themeColor(
    value: NotificationColor | BrandColor | 'medium' | 'white' | 'dark' | 'light' | 'semi-light'
  ) {
    this._themeColor = value;
    this.themeColorDirective.themeColor = value as ThemeColor;
  }

  @Output()
  imageError: EventEmitter<ErrorEvent> = new EventEmitter();

  @HostBinding('class')
  get _cssClass() {
    return [this.themeColor, this.size].filter((cssClass) => !!cssClass);
  }

  onImageError($event: ErrorEvent) {
    this.imageError.emit($event);
  }
}
