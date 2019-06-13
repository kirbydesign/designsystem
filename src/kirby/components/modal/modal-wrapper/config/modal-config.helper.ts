import { InjectionToken } from '@angular/core';

import { ModalConfig } from './modal-config';

export class ModalConfigHelper {
  static readonly defaultCloseBtnPosition = 'inside';
  static readonly defaultTitleHorizontalAlignment = 'left';
  static readonly defaultCloseIconName = 'close';
  static readonly defaultDim = 0.5;

  static processOptionalValues(config: ModalConfig): ModalConfig {
    if (!config.closeBtnPosition) {
      config.closeBtnPosition = ModalConfigHelper.defaultCloseBtnPosition;
    }

    if (!config.titleHorizontalAlignment) {
      config.titleHorizontalAlignment = ModalConfigHelper.defaultTitleHorizontalAlignment;
    }

    if (!config.closeIconName) {
      config.closeIconName = ModalConfigHelper.defaultCloseIconName;
    }

    if (!config.dim) {
      config.dim = ModalConfigHelper.defaultDim;
    }
    return config;
  }
}

export const COMPONENT_PROPS = new InjectionToken<string>('componentProps');
