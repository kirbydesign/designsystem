import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';

import { HorizontalDirection, PopoverComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-popover',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: PopoverComponent,
      useExisting: forwardRef(() => MockPopoverComponent),
    },
  ],
})
export class MockPopoverComponent {
  @Input() target: HTMLElement | ElementRef<HTMLElement>;
  @Output() willHide = new EventEmitter<void>();
  @Input() direction: HorizontalDirection;
}

// #endregion
