import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';

import {
  KirbySwiperOptions,
  SelectedSlide,
  SlidesComponent,
} from '@kirbydesign/designsystem/slide';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-slides',
  template: '<ng-content></ng-content>',
  host: { mock: 'mock' },
  providers: [
    {
      provide: SlidesComponent,
      useExisting: forwardRef(() => MockSlidesComponent),
    },
  ],
})
export class MockSlidesComponent {
  @Input() slidesOptions?: KirbySwiperOptions;
  @Input() title: string;
  @Input() slides: unknown[];
  @Input() showNavigation: boolean;
  @Output() slideChange = new EventEmitter<SelectedSlide>();

  slideTo() {
    // NOOP
  }
}

// #endregion
