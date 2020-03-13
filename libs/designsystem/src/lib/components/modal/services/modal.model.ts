import { KirbyAnimation } from '../../../animation/kirby-animation';

export interface Modal {
  close: (data?: any) => void;
  scrollToTop: (scrollDuration?: KirbyAnimation.Duration) => void;
  scrollToBottom: (scrollDuration?: KirbyAnimation.Duration) => void;
}
