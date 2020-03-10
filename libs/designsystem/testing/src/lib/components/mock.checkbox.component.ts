import { Component, Input, Output, EventEmitter } from '@angular/core';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-checkbox',
  template: '<ng-content></ng-content>',
})
export class MockCheckboxComponent {
  @Input() checked: boolean;
  @Input() color: string;
  @Input() shape: string;
  @Output() checkedChange = new EventEmitter<boolean>();
}

// #endregion
