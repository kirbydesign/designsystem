import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';

import { ActionSheetComponent, ActionSheetItem } from '@kirbydesign/designsystem/modal';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-action-sheet',
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: { mock: 'mock' },
  providers: [
    {
      provide: ActionSheetComponent,
      useExisting: forwardRef(() => MockActionSheetComponent),
    },
  ],
})
export class MockActionSheetComponent {
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
