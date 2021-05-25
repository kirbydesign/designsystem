import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ActionSheetItem } from '../config/action-sheet-item';

@Component({
  selector: 'kirby-action-sheet-popout',
  templateUrl: './action-sheet-popout.component.html',
  styleUrls: ['./action-sheet-popout.component.scss'],
})
export class ActionSheetPopoutComponent {
  @Input() cancelButtonText = 'Cancel';
  @Input() hideCancel: boolean = false;
  @Input() header: string;
  @Input() subheader: string;
  @Input() items: Array<ActionSheetItem>;
  @Input() focusedItemIndex = -1;
  @Output() cancel = new EventEmitter();
  @Output() itemSelect: EventEmitter<ActionSheetItem> = new EventEmitter<ActionSheetItem>();

  onItemSelect(selection: ActionSheetItem) {
    this.itemSelect.emit(selection);
  }

  onButtonMouseEvent(event: Event) {
    // avoid button focus
    event.preventDefault();
  }

  onCancel() {
    this.cancel.emit();
  }
}
