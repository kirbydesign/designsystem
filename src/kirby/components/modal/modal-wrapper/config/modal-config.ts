// import { ModalOptionalAction } from './modal-optional-action';

export interface ModalConfig {
  title: string;
  flavor: 'modal' | 'drawer'; // TODO: also add 'alert' in the future
  // optionalAction: ModalOptionalAction;
  dim?: number;
  component: any;
  componentProps?: { [key: string]: any };
}
