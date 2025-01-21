import { Directive, EventEmitter, forwardRef, Input, Output } from '@angular/core';

import { InfiniteScrollDirective } from '@kirbydesign/designsystem/list';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Directive({
  selector: '[kirbyInfiniteScroll]',
  providers: [
    {
      provide: InfiniteScrollDirective,
      useExisting: forwardRef(() => MockInfiniteScrollDirective),
    },
  ],
})
export class MockInfiniteScrollDirective {
  @Output() scrollEnd = new EventEmitter<void>();
  @Input() disabled: boolean;
}

// #endregion
