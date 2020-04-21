import { KirbyAnimation } from '../../../animation/kirby-animation';

export interface IModal {
  close: (data?: any) => Promise<boolean>;
  onClose: Promise<any>;
}

export abstract class Modal {
  close: (data?: any) => void;
  scrollToTop: (scrollDuration?: KirbyAnimation.Duration) => void;
  scrollToBottom: (scrollDuration?: KirbyAnimation.Duration) => void;
}
