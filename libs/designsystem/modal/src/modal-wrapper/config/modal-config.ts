import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { DrawerSupplementaryAction } from './drawer-supplementary-action';

export type ModalFlavor = 'modal' | 'drawer' | 'compact';
export type ModalSize = 'small' | 'medium' | 'large' | 'full-height';

export interface ModalConfig {
  collapseTitle?: boolean;
  component: any;
  size?: ModalSize;
  customHeight?: string;
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

export type RouteModalConfig = Omit<ModalConfig, 'component'>;
