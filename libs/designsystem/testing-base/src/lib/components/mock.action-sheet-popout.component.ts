import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';

import { ActionSheetItem, ActionSheetPopoutComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-action-sheet-popout',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: ActionSheetPopoutComponent,
      useExisting: forwardRef(() => MockActionSheetPopoutComponent),
    },
  ],
})
export class MockActionSheetPopoutComponent {
  @Input() cancelButtonText: string;
  @Input() hideCancel: boolean;
  @Input() header: string;
  @Input() subheader: string;
  @Input() items: Array<ActionSheetItem>;
  @Input() focusedItemIndex;
  @Output() cancel = new EventEmitter();
  @Output() itemSelect = new EventEmitter<ActionSheetItem>();
}

// #endregion
