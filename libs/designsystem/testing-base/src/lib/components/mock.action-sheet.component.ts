import { Component, Input, Output, EventEmitter } from '@angular/core';

import { ActionSheetItem } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-action-sheet',
  template: '<ng-content></ng-content>',
})
export class MockActionSheetComponent {
  @Input() cancelButtonText;
  @Input() hideCancel: boolean;
  @Input() disabled: boolean;
  @Input() header: string;
  @Input() subheader: string;
  @Input() items: Array<ActionSheetItem>;
  @Output() cancel = new EventEmitter();
  @Output() itemSelect = new EventEmitter<ActionSheetItem>();
}

// #endregion
