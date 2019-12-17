import { DrawerSupplementaryAction } from './drawer-supplementary-action';
import { KirbyAnimation } from '@kirbydesign/designsystem/animation/kirby-animation';
import { Modal } from '../../services/modal.model';

export interface ModalConfig {
  title: string;
  component: any;
  modal?: Modal;
  flavor?: 'modal' | 'drawer';
  dim?: number;
  componentProps?: { [key: string]: any };
  // the supplementary action is only available in the drawer
  drawerSupplementaryAction?: DrawerSupplementaryAction;
  enterDuration?: KirbyAnimation.Duration;
  leaveDuration?: KirbyAnimation.Duration;
  easingIn?: KirbyAnimation.Easing;
  easingOut?: KirbyAnimation.Easing;
}
