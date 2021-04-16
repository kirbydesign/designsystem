import { Component, forwardRef, Input } from '@angular/core';

import { ButtonComponent, ButtonSize, NotificationColor } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  // tslint:disable-next-line: component-selector
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
  @Input() attentionLevel: '1' | '2' | '3' | '4';
  @Input() isDestructive: boolean;
  @Input() themeColor: NotificationColor;
  @Input() expand: 'full' | 'block';
  @Input() text: string;
  @Input() isFloating: boolean;
  @Input() size: ButtonSize;
}

// #endregion
