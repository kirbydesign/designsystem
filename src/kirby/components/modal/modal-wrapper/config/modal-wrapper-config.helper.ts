import { ModalWrapperConfig } from './modal-wrapper-config';

export class ModalWrapperConfigHelper {
  static readonly defaultTitleHorizontalAlignment = 'center';
  static readonly defaultCloseIconName = 'close';
  static readonly defaultDim = 0.5;

  static processOptionalValues(config: ModalWrapperConfig): ModalWrapperConfig {
    if (!config.titleHorizontalAlignment) {
      config.titleHorizontalAlignment = ModalWrapperConfigHelper.defaultTitleHorizontalAlignment;
    }

    if (!config.closeIconName) {
      config.closeIconName = ModalWrapperConfigHelper.defaultCloseIconName;
    }

    if (!config.dim) {
      config.dim = ModalWrapperConfigHelper.defaultDim;
    }
    return config;
  }
}
