import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';

import { BrandColor, NotificationColor } from '../../helpers/color-helper';

@Component({
  selector: 'kirby-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent {
  @Input() imageSrc: string;
  @Input() altText: string;
  @Input() shadow: boolean;
  @Input() text: string;
  @Input() overlay: boolean;
  @Input() size: 'xs' | 'sm' | 'md' | 'lg' = 'sm';
  @Input()
  themeColor:
    | NotificationColor
    | BrandColor
    | 'medium'
    | 'white'
    | 'dark'
    | 'light'
    | 'semi-light' = 'white';

  @HostBinding('class')
  get _cssClass() {
    return [this.themeColor, this.size];
  }
}
