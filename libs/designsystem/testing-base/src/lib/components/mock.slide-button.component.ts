import { Component, Input, Output, EventEmitter } from '@angular/core';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-slide-button',
  template: '<ng-content></ng-content>',
})
export class MockSlideButtonComponent {
  @Input() text: string;
  @Input() expand: 'block';
  @Output() slideDone = new EventEmitter();
  @Output() slidingPercentageChanged = new EventEmitter<number>();
}

// #endregion
