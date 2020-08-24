import { DrawerSupplementaryAction } from './drawer-supplementary-action';

export interface ModalConfig {
  title: string;
  component: any;
  flavor?: 'modal' | 'drawer' | 'compact';
  /**
   * @deprecated Will be removed in next major version.
   */
  dim?: number;
  componentProps?: { [key: string]: any };
  // the supplementary action is only available in the drawer
  drawerSupplementaryAction?: DrawerSupplementaryAction;
}
