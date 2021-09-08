import { Injectable } from '@angular/core';

import { PlatformService } from '../../helpers/platform.service';
import { ModalController } from '../modal';

import { ActionSheetConfig } from './config/action-sheet-config';

@Injectable()
export class ActionSheetController {
  constructor(private platform: PlatformService, private modalController: ModalController) {}

  public async showActionSheet(
    config: ActionSheetConfig,
    onClose?: (data?: any) => void
  ): Promise<void> {
    const usePopOver = !this.platform.isTouch() && this.platform.isPhabletOrBigger();

    /**
     * TODO: Make it opt-in to use pop-over
     *
     * - Should opt-in take precedence over touch capabilities and device size?
     * - Should it be possible to use pop-over on small/touch devices?
     * - Should it only be an option on non-touch + phablet-or-bigger devices?
     */

    if (usePopOver) {
      // TODO: Use ActionSheet with popover
      console.log('Use PopOver');
    } else {
      await this.modalController.showActionSheet(config, onClose);
    }
  }
}
