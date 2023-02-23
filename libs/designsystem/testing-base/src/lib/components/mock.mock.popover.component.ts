import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';

import { MockPopoverComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-popover',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: MockPopoverComponent,
      useExisting: forwardRef(() => MockMockPopoverComponent),
    },
  ],
})
export class MockMockPopoverComponent {
  @Input() popout: HorizontalDirection | `${HorizontalDirection}`;
  @Input() target: HTMLElement | ElementRef<HTMLElement>;
  @Output() willHide = new EventEmitter<void>();
}

// #endregion
