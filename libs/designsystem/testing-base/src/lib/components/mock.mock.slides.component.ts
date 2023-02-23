import { Component, Directive, forwardRef, Input } from '@angular/core';

import { MockSlideDirective, MockSlidesComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Directive({
  selector: '[kirbySlide]',
  providers: [
    {
      provide: MockSlideDirective,
      useExisting: forwardRef(() => MockMockSlideDirective),
    },
  ],
})
export class MockMockSlideDirective {}

@Component({
  selector: 'kirby-slides',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: MockSlidesComponent,
      useExisting: forwardRef(() => MockMockSlidesComponent),
    },
  ],
})
export class MockMockSlidesComponent {
  @Input() slidesOptions: any;
  @Input() slides: any[];
}

// #endregion
