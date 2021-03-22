import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ActionSheetItem } from '../action-sheet/config/action-sheet-item';

@Component({
  selector: 'kirby-action-sheet-popout',
  templateUrl: './action-sheet-popout.component.html',
  styleUrls: ['./action-sheet-popout.component.scss'],
})
export class ActionSheetPopoutComponent {
  @Input() cancelButtonText = 'Cancel';
  @Input() hideCancel: boolean = false;
  @Input() disabled: boolean = false;
  @Input() header: string;
  @Input() subheader: string;
  @Input() items: Array<ActionSheetItem>;
  @Output() cancel = new EventEmitter();
  @Output() itemSelect: EventEmitter<ActionSheetItem> = new EventEmitter<ActionSheetItem>();

  onItemSelect(selection: ActionSheetItem) {
    this.itemSelect.emit(selection);
  }

  onCancel() {
    this.cancel.emit();
  }
}
