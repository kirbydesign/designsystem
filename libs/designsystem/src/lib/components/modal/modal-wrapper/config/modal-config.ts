import { DrawerSupplementaryAction } from './drawer-supplementary-action';
import { KirbyAnimation } from '../../../../animation/kirby-animation';
import { Modal } from '../../services/modal.model';

export interface ModalConfig {
  title: string;
  component: any;
  modal?: Modal;
  flavor?: 'modal' | 'drawer' | 'compact';
  componentProps?: { [key: string]: any };
  // the supplementary action is only available in the drawer
  drawerSupplementaryAction?: DrawerSupplementaryAction;
}
