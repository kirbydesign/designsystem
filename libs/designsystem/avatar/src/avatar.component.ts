import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';

import { BrandColor, NotificationColor } from '@kirbydesign/core';

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
})
export class AvatarComponent {
  @Input() imageSrc: string;
  @Input() imageLoading: 'eager' | 'lazy' | undefined;
  @Input() altText: string;
  /**
   * @deprecated The avatar now always has an outline, so this input no longer has any effect.
   * This input will be removed in a future major version.
   */
  @Input() set stroke(_value: boolean) {
    console.warn(
      `[Kirby Avatar] The 'stroke' input is deprecated and no longer has any effect.
        The avatar now always has an outline. This input will be removed in a future major version.`
    );
  }
  @Input() text: string;
  @Input() overlay: boolean;
  @Input() size: AvatarSize | `${AvatarSize}` = AvatarSize.SM;
  @Input()
  themeColor: NotificationColor | BrandColor | 'medium' | 'white' | 'dark' | 'light' | 'semi-light';
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
