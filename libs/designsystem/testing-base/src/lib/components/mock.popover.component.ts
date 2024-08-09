import { Component, ElementRef, EventEmitter, forwardRef, Input, Output } from '@angular/core';

import { HorizontalDirection, PopoverComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-popover',
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: { mock: 'mock' },
  providers: [
    {
      provide: PopoverComponent,
      useExisting: forwardRef(() => MockPopoverComponent),
    },
  ],
})
export class MockPopoverComponent {
  @Input() popout: HorizontalDirection | `${HorizontalDirection}`;
  @Input() target: HTMLElement | ElementRef<HTMLElement>;
  @Output() willHide = new EventEmitter<void>();
}

// #endregion
