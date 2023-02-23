import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';

import { MockActionSheetComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-action-sheet',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: MockActionSheetComponent,
      useExisting: forwardRef(() => MockMockActionSheetComponent),
    },
  ],
})
export class MockMockActionSheetComponent {
  @Input() cancelButtonText: string;
  @Input() hideCancel: boolean;
  @Input() disabled: boolean;
  @Input() header: string;
  @Input() subheader: string;
  @Input() items: Array<ActionSheetItem>;
  @Output() cancel = new EventEmitter();
  @Output() itemSelect = new EventEmitter<ActionSheetItem>();
}

// #endregion
