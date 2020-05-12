import { KirbyAnimation } from '../../../animation/kirby-animation';

export interface OverlayEventDetail<T = any> {
  data?: T;
  role?: string;
}

export interface Overlay {
  dismiss: (data?: any) => Promise<boolean>;
  onDidDismiss: Promise<OverlayEventDetail>;
}

export abstract class Modal {
  didPresent: Promise<void>;
  willDismiss: Promise<void>;
  close: (data?: any) => Promise<void>;
  scrollToTop: (scrollDuration?: KirbyAnimation.Duration) => void;
  scrollToBottom: (scrollDuration?: KirbyAnimation.Duration) => void;
}
