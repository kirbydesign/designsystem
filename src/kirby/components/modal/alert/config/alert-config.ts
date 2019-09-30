import { deprecate } from 'util';
import { DeprecatedCurrencyPipe } from '@angular/common';

export interface AlertConfig {
  title: string;
  message?: string;

  /**
   * @deprecated Will be deprecated in version x.x. Use okBtn instead.
   */
  okBtnText?: string;

  cancelBtnText?: string;

  icon?: {
    iconName: string;
    themeColor?: string;
  };

  okBtn?: {
    text: string;
    isDestructive?: boolean;
  };
  iconName?: string;
}
