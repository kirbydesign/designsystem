import { ActivatedRoute, Data, Route } from '@angular/router';
import { Observable } from 'rxjs';

import { AlertConfig } from '../../public_api';
import { DrawerSupplementaryAction } from './drawer-supplementary-action';

export type ModalFlavor = 'modal' | 'drawer' | 'compact';
export type ModalSize = 'small' | 'medium' | 'large' | 'full-height';

export type ShowAlertCallback = () => boolean | AlertConfig | Promise<boolean | AlertConfig>;

export interface ModalConfig {
  collapseTitle?: boolean;
  component?: any;
  size?: ModalSize;
  customHeight?: string;
  modalRoute?: ActivatedRoute;
  siblingModalRouteActivated$?: Observable<ActivatedRoute>;
  flavor?: ModalFlavor;
  componentProps?: { [key: string]: any };
  canDismiss?: ShowAlertCallback;
  // the supplementary action is only available in the drawer
  drawerSupplementaryAction?: DrawerSupplementaryAction;
  // drawer properties
  interactWithBackground?: boolean;
  cssClass?: string | string[];
}

/**
 * Here we extend Data and Route from Angular to create a covariant type ModalEnabledRoutes.
 * This can be used in place of the Routes type when configuring route-based modals in the array
 * of routes passed to RouterModule in applications.
 */
export type RoutedModalConfig = Omit<ModalConfig, 'component'>;

interface ModalConfigRouteData extends Data {
  modalConfig?: RoutedModalConfig;
}

interface ModalEnabledRoute extends Route {
  data?: ModalConfigRouteData;
  children?: ModalEnabledRoutes;
}

export type ModalEnabledRoutes = ModalEnabledRoute[];
