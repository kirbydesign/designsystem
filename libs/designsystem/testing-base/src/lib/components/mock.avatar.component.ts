import { Component, forwardRef, Input } from '@angular/core';

import {
  AvatarComponent,
  AvatarSizes,
  BrandColor,
  NotificationColor,
} from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-avatar',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: AvatarComponent,
      useExisting: forwardRef(() => MockAvatarComponent),
    },
  ],
})
export class MockAvatarComponent {
  @Input() imageSrc: string;
  @Input() altText: string;
  @Input() shadow: boolean;
  @Input() text: string;
  @Input() overlay: boolean;
  @Input() size: AvatarSizes;
  @Input() themeColor:
    | NotificationColor
    | BrandColor
    | 'medium'
    | 'white'
    | 'dark'
    | 'light'
    | 'semi-light';
}

// #endregion
