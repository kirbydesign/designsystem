import { Injectable } from '@angular/core';
import { Color } from 'tns-core-modules/color';
import {
  FeedbackType,
  FeedbackPosition,
  Feedback,
  FeedbackShowOptions,
} from 'nativescript-feedback';

import { ColorHelper } from '../../../helpers/color-helper';
import { ToastConfig, MessageType } from '../config/toast-config';

@Injectable()
export class ToastHelper {
  static DURATION_IN_MS = 4000;
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
        messageColor: this.getTextColor(config.messageType),
        backgroundColor: this.getBackgroundColor(config.messageType),
        onHide: () => {
          resolve();
        },
      };
      this.feedback.show(options);
    });
  }

  private getTextColor(messageType: MessageType): Color {
    const color = ColorHelper.getContrastColor(messageType);
    return new Color(color);
  }

  private getBackgroundColor(messageType: MessageType): Color {
    const color = ColorHelper.getThemeColor(messageType);
    return new Color(color.hex);
  }
}
