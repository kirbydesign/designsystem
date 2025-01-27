import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { CardModule } from '@kirbydesign/designsystem/card';

import { ActionSheetItem } from './config/action-sheet-item';

@Component({
  imports: [CardModule, ButtonComponent, CommonModule],
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
