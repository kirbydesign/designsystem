import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';

import { ActionSheetComponent, ActionSheetItem } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-action-sheet',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: ActionSheetComponent,
      useExisting: forwardRef(() => MockActionSheetComponent),
    },
  ],
})
export class MockActionSheetComponent {
  @Input() cancelButtonText: string;
  @Input() disabled: boolean;
  @Input() header: string;
  @Input() subheader: string;
  @Input() items: Array<ActionSheetItem>;
  @Input() iconName: string;
  @Input() buttonText: string;
  @Output() itemSelect = new EventEmitter<ActionSheetItem>();
  @Input() tabindex: number;
  @Input() hideButton: boolean;
  @Input() hideCancel;
}

// #endregion
