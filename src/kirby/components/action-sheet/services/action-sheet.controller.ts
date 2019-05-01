import { Injectable, ViewContainerRef } from '@angular/core';

import { ActionSheetHelper } from './action-sheet.helper';
import { ActionSheetConfig } from '../config/action-sheet-config';

@Injectable()
export class ActionSheetController {
  constructor(private actionSheetHelper: ActionSheetHelper) {}

  public showActionSheet(
    config: ActionSheetConfig,
    vcRef: ViewContainerRef,
    callback: (selection: string) => void
  ): void {
    this.actionSheetHelper.showActionSheet(config, vcRef).then(callback);
  }
}
