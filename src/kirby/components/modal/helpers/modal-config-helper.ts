import { ModalConfig } from '../config/modal-config';

export class ModalConfigHelper {
  static processOptionalValues(config: ModalConfig): ModalConfig {
    if (!config.titleHorizontalAlignment) {
      config.titleHorizontalAlignment = 'center';
    }

    if (!config.closeIconName) {
      config.closeIconName = 'close';
    }

    if (!config.dim) {
      config.dim = 0.5;
    }
    return config;
  }
}
