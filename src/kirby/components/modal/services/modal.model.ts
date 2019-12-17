import { ModalConfig } from '@kirbydesign/designsystem/modal';

export interface Modal {
  close: (data?: any) => {};
  config?: ModalConfig;
}
