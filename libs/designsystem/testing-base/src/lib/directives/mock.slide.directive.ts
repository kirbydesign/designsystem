import { Directive, forwardRef } from '@angular/core';

import { SlideDirective, SlideStretchHeightDirective } from '@kirbydesign/designsystem/slide';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Directive({
  selector: '[kirbySlide]',
  providers: [
    {
      provide: SlideDirective,
      useExisting: forwardRef(() => MockSlideDirective),
    },
  ],
})
export class MockSlideDirective {}

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[slideStretchHeight]',
  providers: [
    {
      provide: SlideStretchHeightDirective,
      useExisting: forwardRef(() => MockSlideStretchHeightDirective),
    },
  ],
})
export class MockSlideStretchHeightDirective {}

// #endregion
