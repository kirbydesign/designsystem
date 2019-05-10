import { Component, Input, EventEmitter, Output, ViewContainerRef } from '@angular/core';

import { ModalController } from './../modal/services/modal.controller';
import { ActionSheetConfig } from '../modal/action-sheet/config/action-sheet-config';
import { ActionSheetItem } from '../modal/action-sheet/config/action-sheet-item';

@Component({
  selector: 'kirby-fab-sheet',
  templateUrl: './fab-sheet.component.html',
  styleUrls: ['./fab-sheet.component.scss'],
})
export class FabSheetComponent {
  @Input() disabled?: boolean = false;
  @Input() horizontalAlignment?: 'left' | 'center' | 'right' = 'right';
  @Input() header?: string;
  @Input() subheader?: string;
  @Input() items: Array<ActionSheetItem>;
  @Output() actionSelected = new EventEmitter<ActionSheetItem>();

  constructor(private modalController: ModalController, private vcRef: ViewContainerRef) {}

  public openFabSheet() {
    if (!this.disabled) {
      const config: ActionSheetConfig = {
        header: this.header,
        subheader: this.subheader,
        items: this.items,
        position: this.horizontalAlignment,
      };
      this.modalController.showActionSheet(config, this.vcRef, this.myCallback);
    }
  }

  private myCallback = (selection: ActionSheetItem) => {
    this.actionSelected.emit(selection);
  };
}
