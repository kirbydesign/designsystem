import { DrawerSupplementaryAction } from './drawer-supplementary-action';
import { KirbyAnimation } from '@kirbydesign/designsystem/animation/kirby-animation';

export interface ModalConfig {
  title: string;
  component: any;
  flavor?: 'modal' | 'drawer';
  dim?: number;
  setModalScrollableCB?: () => void;
  componentProps?: { [key: string]: any };
  // the supplementary action is only available in the drawer
  drawerSupplementaryAction?: DrawerSupplementaryAction;
  enterDuration?: KirbyAnimation.Duration;
  leaveDuration?: KirbyAnimation.Duration;
  easingIn?: KirbyAnimation.Easing;
  easingOut?: KirbyAnimation.Easing;
}
