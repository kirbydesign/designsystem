import { ModalConfigHelper } from './modal-config.helper';

// import { ModalOptionalAction } from './modal-optional-action';

export class ModalConfig {
  title: string;
  component: any;
  flavor?: 'modal' | 'drawer' = 'modal'; // TODO: also add 'alert' in the future
  // optionalAction?: ModalOptionalAction;
  dim?: number = ModalConfigHelper.defaultDim;
  componentProps?: { [key: string]: any };
}
