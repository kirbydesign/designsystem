import { Injectable } from '@angular/core';
import { SnackBar, SnackBarOptions } from 'nativescript-snackbar';

import { ColorHelper } from './../../../helpers/color-helper';
import { ToastConfig } from '../config/toast-config';
import { ThemeColor } from './../../../helpers/theme-color.type';

@Injectable()
export class ToastHelper {
  static DEFAULT_DURATION = 3000;
  static DEFAULT_COLOR = 'light';
  static DEFAULT_CONTRAST_COLOR = 'contrast-light';
  public async showToast(config: ToastConfig): Promise<any> {
    const options: SnackBarOptions = {
      actionText: config.cancelBtnText ? config.cancelBtnText : '',
      actionTextColor: this.themeColor(ToastHelper.DEFAULT_CONTRAST_COLOR), // Optional, Android only
      snackText: config.message,
      textColor: this.themeColor(ToastHelper.DEFAULT_CONTRAST_COLOR), // Optional, Android only
      hideDelay: this.duration(config),
      backgroundColor: this.backgroundColor(config.themeColor), // Optional, Android only
      maxLines: 3, // Optional, Android Only
      isRTL: false, // Optional, Android Only
    };

    const snackbar = new SnackBar();
    return snackbar.action(options);
  }

  private duration(config: ToastConfig): number {
    const duration = config.duration ? config.duration : ToastHelper.DEFAULT_DURATION;
    return config.cancelBtnText ? 0 : duration;
  }

  private backgroundColor(themeColor: ThemeColor): string {
    const name = themeColor ? themeColor : ToastHelper.DEFAULT_COLOR;
    return this.themeColor(name);
  }

  private themeColor(name: string): string {
    const color = ColorHelper.getThemeColor(name);
    return color ? color.hex : undefined;
  }
}
