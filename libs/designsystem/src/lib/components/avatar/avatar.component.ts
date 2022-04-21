import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

import { BrandColor, NotificationColor } from '@kirbydesign/core';

export enum AvatarSize {
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
}

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
  @Input() size: AvatarSize | `${AvatarSize}` = AvatarSize.SM;
  @Input()
  themeColor: NotificationColor | BrandColor | 'medium' | 'white' | 'dark' | 'light' | 'semi-light';

  @HostBinding('class')
  get _cssClass() {
    return [this.themeColor, this.size].filter((cssClass) => !!cssClass);
  }
}
