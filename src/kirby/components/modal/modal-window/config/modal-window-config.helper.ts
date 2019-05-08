import { ModalWindowConfig } from './modal-window-config';

export class ModalConfigHelper {
  static readonly defaultTitleHorizontalAlignment = 'center';
  static readonly defaultCloseIconName = 'close';
  static readonly defaultDim = 0.5;

  static processOptionalValues(config: ModalWindowConfig): ModalWindowConfig {
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
