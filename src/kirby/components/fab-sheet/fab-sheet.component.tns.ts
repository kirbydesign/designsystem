import { Component, Input, OnChanges, EventEmitter, Output, ViewContainerRef } from '@angular/core';

import { ModalController } from './../modal/services/modal.controller';
import { FabSheetConfig } from './config/fab-sheet-config';
import { ActionSheetConfig, FabSheet } from '../modal/action-sheet/config/action-sheet-config';

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

  public get iconName(): string {
    if (!this.config) {
      return 'cog';
    }
    return !this.config.openIconName ? 'cog' : this.config.openIconName;
  }

  public openFabSheet() {
    if (!this.config.disabled) {
      const config: ActionSheetConfig = {
        header: this.config.header,
        subheader: this.config.subheader,
        actions: this.config.actions,
        fabSheet: {
          horizontalAlignment: this.config.horizontalAlignment,
        },
      };
      this.modalController.showActionSheetWindow(config, this.vcRef, this.myCallback);
    }
  }

  private myCallback = (selection: string) => {
    this.actionSelected.emit(selection);
  };
}
