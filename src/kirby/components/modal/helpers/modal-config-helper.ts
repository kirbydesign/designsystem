import { ModalConfig } from '../modal-config';

export class ModalConfigHelper {
  static processOptionalValues(config: ModalConfig): ModalConfig {
    if (!config.titleHorizontalAlignment) {
      config.titleHorizontalAlignment = 'center';
    }

    if (!config.closeIcon) {
      config.closeIcon = 'close';
    }

    if (!config.dim) {
      config.dim = 0.5;
    }
    return config;
  }
}
