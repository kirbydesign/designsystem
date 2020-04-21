import { DrawerSupplementaryAction } from './drawer-supplementary-action';
import { Modal } from '../../services/modal.model';

export interface ModalConfig {
  title: string;
  component: any;
  modal?: Modal;
  flavor?: 'modal' | 'drawer' | 'compact';
  /**
   * @deprecated Will be removed in next major version.
   */
  dim?: number;
  componentProps?: { [key: string]: any };
  // the supplementary action is only available in the drawer
  drawerSupplementaryAction?: DrawerSupplementaryAction;
}
