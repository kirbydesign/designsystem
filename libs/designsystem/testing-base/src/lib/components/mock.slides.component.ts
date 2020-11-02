import { forwardRef, Component, Directive, Input } from '@angular/core';

import { SlideDirective, SlidesComponent } from '@kirbydesign/designsystem';

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

@Component({
  selector: 'kirby-slides',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: SlidesComponent,
      useExisting: forwardRef(() => MockSlidesComponent),
    },
  ],
})
export class MockSlidesComponent {
  @Input() slidesOptions: any;
  @Input() slides: any[];
}

// #endregion
