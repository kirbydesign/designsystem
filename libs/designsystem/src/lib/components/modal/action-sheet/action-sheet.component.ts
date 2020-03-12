import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';

import { ActionSheetItem } from './config/action-sheet-item';

@Component({
  selector: 'kirby-action-sheet',
  templateUrl: './action-sheet.component.html',
  styleUrls: ['./action-sheet.component.scss'],
})
export class ActionSheetComponent {
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
