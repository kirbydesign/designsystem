import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { SlidesComponent } from '@kirbydesign/designsystem/slide';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
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
  @Output() selectedSlide = new EventEmitter<any>();

  slideTo() {
    // NOOP
  }
}

// #endregion
