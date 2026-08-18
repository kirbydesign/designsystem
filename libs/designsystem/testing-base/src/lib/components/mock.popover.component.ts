import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';

import { HorizontalDirection, PopoverComponent } from '@kirbydesign/designsystem/popover';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-popover',
  template: '<ng-content></ng-content>',
  host: { mock: 'mock' },
  changeDetection: ChangeDetectionStrategy.Eager,
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

  hide() {
    // NOOP
  }

  show() {
    // NOOP
  }
}

// #endregion
