import { Injectable, ViewContainerRef } from '@angular/core';

import { ActionSheetConfig } from '../config/action-sheet-config';

@Injectable()
export class ActionSheetHelper {
  public showActionSheet(config: ActionSheetConfig, vcRef: ViewContainerRef): Promise<any> {
    return Promise.resolve('hello from action sheet helper on web..');
  }
}
