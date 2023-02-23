import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';

import { MockSlideButtonComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-slide-button',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: MockSlideButtonComponent,
      useExisting: forwardRef(() => MockMockSlideButtonComponent),
    },
  ],
})
export class MockMockSlideButtonComponent {
  @Input() text: string;
  @Input() expand: 'block';
  @Output() slideDone = new EventEmitter();
  @Output() slidingPercentageChanged = new EventEmitter<number>();
}

// #endregion
