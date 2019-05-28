import { Injectable } from '@angular/core';
import { Color } from 'tns-core-modules/color';
import {
  FeedbackType,
  FeedbackPosition,
  Feedback,
  FeedbackShowOptions,
} from 'nativescript-feedback';

import { ColorHelper } from './../../../helpers/color-helper';
import { ToastConfig } from '../config/toast-config';
import { ThemeColor } from './../../../helpers/theme-color.type';

@Injectable()
export class ToastHelper {
  static DEFAULT_DURATION = 4000;
  static DEFAULT_COLOR = 'light';
  static DEFAULT_HEX_COLOR = '#edeeee';
  static DEFAULT_CONTRAST_LIGHT = 'contrast-light';
  static DEFAULT_CONTRAST_DARK = 'contrast-dark';
  private feedback: Feedback;

  constructor() {
    this.feedback = new Feedback();
  }

  public async showToast(config: ToastConfig): Promise<any> {
    return new Promise((resolve) => {
      const options: FeedbackShowOptions = {
        message: config.message,
        position: FeedbackPosition.Top,
        duration: config.duration ? config.duration : ToastHelper.DEFAULT_DURATION,
        type: FeedbackType.Custom,
        messageColor: this.messageColor(config.themeColor),
        backgroundColor: this.backgroundColor(config.themeColor),
        onTap: () => {
          resolve();
        },
      };
      this.feedback.show(options);
    });
  }

  private messageColor(themeColor: ThemeColor): Color {
    const name = this.contrastColor(themeColor);
    return this.themeColor(name);
  }

  private backgroundColor(themeColor: ThemeColor): Color {
    const name = themeColor ? themeColor : ToastHelper.DEFAULT_COLOR;
    return this.themeColor(name);
  }

  private themeColor(name: string): Color {
    const color = ColorHelper.getThemeColor(name);
    return color ? new Color(color.hex) : new Color(ToastHelper.DEFAULT_HEX_COLOR);
  }

  private contrastColor(themeColor: ThemeColor): string {
    if (!themeColor) {
      return ToastHelper.DEFAULT_CONTRAST_DARK;
    }
    return themeColor.match(/^(secondary|tertiary|dark)$/)
      ? ToastHelper.DEFAULT_CONTRAST_LIGHT
      : ToastHelper.DEFAULT_CONTRAST_DARK;
  }
}
