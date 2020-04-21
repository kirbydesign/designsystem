import { KirbyAnimation } from '../../../animation/kirby-animation';

export interface Overlay {
  dismiss: (data?: any) => Promise<boolean>;
  onDidDismiss: Promise<any>;
}

export abstract class Modal {
  close: (data?: any) => void;
  scrollToTop: (scrollDuration?: KirbyAnimation.Duration) => void;
  scrollToBottom: (scrollDuration?: KirbyAnimation.Duration) => void;
}
