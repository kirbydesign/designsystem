import { Component, forwardRef, Input } from '@angular/core';
import { NotificationColor } from '@kirbydesign/core';

import { AttentionLevel, ButtonComponent, ButtonSize } from '@kirbydesign/designsystem/button';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'button[kirby-button],Button[kirby-button]',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: ButtonComponent,
      useExisting: forwardRef(() => MockButtonComponent),
    },
  ],
})
export class MockButtonComponent {
  @Input() attentionLevel: AttentionLevel;
  @Input() noDecoration: boolean;
  @Input() themeColor: NotificationColor;
  @Input() expand: 'full' | 'block';
  @Input() isFloating: boolean;
  @Input() size: ButtonSize | `${ButtonSize}`;
  @Input() showIconOnly: boolean;
}

// #endregion
