import { ModalConfigHelper } from './modal-config.helper';

import { DrawerSupplementaryAction } from './drawer-supplementary-action';

export class ModalConfig {
  title: string;
  component: any;
  flavor: 'modal' | 'drawer' = 'modal'; // TODO: also add 'alert' in the future
  dim?: number = ModalConfigHelper.defaultDim;
  componentProps?: { [key: string]: any };
  // the supplementary action is only available in the drawer
  drawerSupplementaryAction?: DrawerSupplementaryAction;
}
