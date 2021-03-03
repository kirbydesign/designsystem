import { ActivatedRoute } from '@angular/router';

import { KirbyAnimation } from '../../../animation/kirby-animation';

export interface OverlayEventDetail<T = any> {
  data?: T;
  role?: string;
}

export interface Overlay {
  dismiss: (data?: any) => Promise<boolean>;
  onWillDismiss: Promise<OverlayEventDetail>;
  onDidDismiss: Promise<OverlayEventDetail>;
}

export interface ModalRouteActivation {
  route: ActivatedRoute;
  isNewModal: boolean;
}

export abstract class Modal {
  didPresent: Promise<void>;
  willClose?: (close: (data?: any) => void, preventClose?: boolean) => void;
  close: (data?: any) => Promise<void>;
  scrollToTop: (scrollDuration?: KirbyAnimation.Duration) => void;
  scrollToBottom: (scrollDuration?: KirbyAnimation.Duration) => void;
  scrollDisabled: boolean;
}
