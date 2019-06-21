import { Injectable } from '@angular/core';
import { Color } from 'tns-core-modules/color';
import {
  FeedbackType,
  FeedbackPosition,
  Feedback,
  FeedbackShowOptions,
} from 'nativescript-feedback';

import { ColorHelper } from '../../../helpers/color-helper';
import { ToastConfig } from '../config/toast-config';
import { ThemeColor } from '../../../helpers/theme-color.type';

@Injectable()
export class ToastHelper {
  static DURATION_IN_MS = 4000;
  static COLOR = 'light';
  static HEX_COLOR = '#edeeee';
  private feedback: Feedback;

  constructor() {
    this.feedback = new Feedback();
  }

  public async showToast(config: ToastConfig): Promise<any> {
    return new Promise((resolve) => {
      const options: FeedbackShowOptions = {
        message: config.message,
        position: FeedbackPosition.Top,
        duration: config.durationInMs ? config.durationInMs : ToastHelper.DURATION_IN_MS,
        type: FeedbackType.Custom,
        messageColor: this.getTextColor(config.themeColor),
        backgroundColor: this.getBackgroundColor(config.themeColor),
        onHide: () => {
          resolve();
        },
      };
      this.feedback.show(options);
    });
  }

  private getTextColor(themeColor: ThemeColor): Color {
    if (themeColor) {
      let color = ColorHelper.getContrastColor(themeColor);
      return color ? new Color(color) : new Color(ToastHelper.HEX_COLOR);
    }
    return new Color(ToastHelper.HEX_COLOR);
  }

  private getBackgroundColor(themeColor: ThemeColor): Color {
    if (themeColor) {
      let color = ColorHelper.getThemeColor(themeColor);
      return color ? new Color(color.hex) : new Color(ToastHelper.HEX_COLOR);
    }
    return new Color(ToastHelper.HEX_COLOR);
  }
}
