import { ModalConfig } from '@kirbydesign/designsystem/modal';
import { KirbyAnimation } from '@kirbydesign/designsystem/animation/kirby-animation';

export interface Modal {
  close: (data?: any) => void;
  scrollToTop: (scrollDuration?: KirbyAnimation.Duration) => void;
  scrollToBottom: (scrollDuration?: KirbyAnimation.Duration) => void;
}
