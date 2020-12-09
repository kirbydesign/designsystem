import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { DrawerSupplementaryAction } from './drawer-supplementary-action';

export type ModalFlavor = 'modal' | 'drawer' | 'compact';
export type ModalSize = 'small' | 'medium' | 'large' | 'full-height';

export interface ModalConfig {
  /**
   * @deprecated Will be removed in next major version. Embed a `<kirby-page-title>` element inside the component instead.
   */
  title?: string;
  component: any;
  size?: ModalSize;
  modalRoute?: ActivatedRoute;
  siblingModalRouteActivated$?: Observable<ActivatedRoute>;
  flavor?: ModalFlavor;
  /**
   * @deprecated Will be removed in next major version.
   */
  dim?: number;
  componentProps?: { [key: string]: any };
  // the supplementary action is only available in the drawer
  drawerSupplementaryAction?: DrawerSupplementaryAction;
}
