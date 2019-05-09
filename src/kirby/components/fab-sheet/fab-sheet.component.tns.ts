import { Component, Input, OnChanges, EventEmitter, Output, ViewContainerRef } from '@angular/core';

import { ModalController } from './../modal/services/modal.controller';
import { FabSheetConfig } from './config/fab-sheet-config';
import { ActionSheetConfig } from '../modal/action-sheet/config/action-sheet-config';

@Component({
  selector: 'kirby-fab-sheet',
  templateUrl: './fab-sheet.component.html',
  styleUrls: ['./fab-sheet.component.scss'],
})
export class FabSheetComponent implements OnChanges {
  @Input() config: FabSheetConfig;
  @Output() actionSelected = new EventEmitter<string>();

  constructor(private modalController: ModalController, private vcRef: ViewContainerRef) {}

  ngOnChanges() {
    // set default values if not set from component
    this.config.disabled = this.config.disabled === undefined ? false : this.config.disabled;
    this.config.horizontalAlignment =
      this.config.horizontalAlignment === undefined ? 'center' : this.config.horizontalAlignment;
  }

  public openFabSheet(args) {
    if (!this.config.disabled) {
      const config: ActionSheetConfig = {
        header: this.config.actionSheetConfig.header,
        subheader: this.config.actionSheetConfig.subheader,
        actions: this.config.actionSheetConfig.actions,
        hideCancelButton: true,
        horizontalAlignment: this.config.horizontalAlignment,
      };
      this.modalController.showActionSheetWindow(config, this.vcRef, this.myCallback);
    }
  }

  private myCallback = (selection: string) => {
    this.actionSelected.emit(selection);
  };
}
