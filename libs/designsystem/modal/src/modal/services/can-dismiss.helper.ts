import { Injectable } from '@angular/core';
import { CanDismissConfig } from '../../modal-wrapper/config';
import { AlertConfig } from '../alert';
import { AlertHelper } from './alert.helper';

@Injectable()
export class CanDismissHelper {
  constructor(private alertHelper: AlertHelper) {}

  public getCanDismissCallback(
    canDismissConfig: CanDismissConfig
  ): boolean | (() => Promise<boolean>) {
    const { canDismiss, alertConfig } = canDismissConfig;

    return async () => {
      const conditionIsMet = await canDismiss();

      if (!conditionIsMet) {
        const result = await this.showAlert(alertConfig);
        return result;
      }

      return true;
    };
  }

  private async showAlert(config: AlertConfig): Promise<boolean> {
    const alert = await this.alertHelper.showAlert(config);
    const result = await alert.onWillDismiss;
    return result.data;
  }
}
