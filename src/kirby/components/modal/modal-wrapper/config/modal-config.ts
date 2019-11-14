import { DrawerSupplementaryAction } from './drawer-supplementary-action';
import { KirbyAnimation } from '@kirbydesign/designsystem/animation/kirby-animation';

export interface ModalConfig {
  title: string;
  component: any;
  flavor: 'modal' | 'drawer';
  dim?: number;
  componentProps?: { [key: string]: any };
  // the supplementary action is only available in the drawer
  drawerSupplementaryAction?: DrawerSupplementaryAction;
  durationOn?: KirbyAnimation.Duration;
  durationOff?: KirbyAnimation.Duration;
  easingOn?: KirbyAnimation.Easing;
  easingOut?: KirbyAnimation.Easing;
}
