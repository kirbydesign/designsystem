import { Component, forwardRef, Input } from '@angular/core';

import { TextLinkComponent, TextLinkSize } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-text-link',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: TextLinkComponent,
      useExisting: forwardRef(() => MockTextLinkComponent),
    },
  ],
})
export class MockTextLinkComponent {
  @Input() route: string;
  @Input() text: string;
  @Input() size: TextLinkSize;
}

// #endregion
