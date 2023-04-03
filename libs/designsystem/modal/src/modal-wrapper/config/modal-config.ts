import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { DrawerSupplementaryAction } from './drawer-supplementary-action';

export type ModalFlavor = 'modal' | 'drawer' | 'compact';
export type ModalSize = 'small' | 'medium' | 'large' | 'full-height';

type ModalSizeLargeScreen = 'sm' | 'md' | 'lg';

export interface ModalConfig {
  collapseTitle?: boolean;
  component: any;
  size?: ModalSize;
  largeScreenSize?: ModalSizeLargeScreen;
  modalRoute?: ActivatedRoute;
  siblingModalRouteActivated$?: Observable<ActivatedRoute>;
  flavor?: ModalFlavor;
  componentProps?: { [key: string]: any };
  // the supplementary action is only available in the drawer
  drawerSupplementaryAction?: DrawerSupplementaryAction;
  // drawer properties
  interactWithBackground?: boolean;
  cssClass?: string | string[];
}
