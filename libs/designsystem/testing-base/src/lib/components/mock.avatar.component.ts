import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { BrandColor, NotificationColor } from '@kirbydesign/core';

import { AvatarComponent, AvatarSize } from '@kirbydesign/designsystem/avatar';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-avatar',
  template: '<ng-content></ng-content>',
  host: { mock: 'mock' },
  providers: [
    {
      provide: AvatarComponent,
      useExisting: forwardRef(() => MockAvatarComponent),
    },
  ],
})
export class MockAvatarComponent {
  @Input() imageSrc: string;
  @Input() imageLoading: 'eager' | 'lazy' | undefined;
  @Input() altText: string;
  @Input() stroke: boolean;
  @Input() text: string;
  @Input() overlay: boolean;
  @Input() size: AvatarSize | `${AvatarSize}`;
  @Input() themeColor:
    | NotificationColor
    | BrandColor
    | 'medium'
    | 'white'
    | 'dark'
    | 'light'
    | 'semi-light';
  @Output() imageError = new EventEmitter();
}

// #endregion
