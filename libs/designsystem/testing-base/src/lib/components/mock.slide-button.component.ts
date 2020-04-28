import { forwardRef, Component, Input, Output, EventEmitter } from '@angular/core';

import { SlideButtonComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-slide-button',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: SlideButtonComponent,
      useExisting: forwardRef(() => MockSlideButtonComponent),
    },
  ],
})
export class MockSlideButtonComponent {
  @Input() text: string;
  @Input() expand: 'block';
  @Output() slideDone = new EventEmitter();
  @Output() slidingPercentageChanged = new EventEmitter<number>();
}

// #endregion
