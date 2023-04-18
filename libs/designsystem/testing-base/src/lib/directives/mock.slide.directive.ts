import { Directive, forwardRef } from '@angular/core';

import { SlideDirective } from '@kirbydesign/designsystem/slide';

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

// #endregion
