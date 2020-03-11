import { Component, Input, Output, EventEmitter } from '@angular/core';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-toolbar',
  template: '<ng-content></ng-content>',
})
export class MockToolbarComponent {
  @Input() title: string;
  @Input() hideBackButton: boolean;
  @Output() back = new EventEmitter();
  @Output() primarySelect = new EventEmitter();
  @Output() secondarySelect = new EventEmitter();
}

// #endregion
