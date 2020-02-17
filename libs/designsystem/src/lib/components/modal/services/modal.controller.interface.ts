import { ModalConfig } from '../modal-wrapper/config/modal-config';
import { ActionSheetConfig } from '../action-sheet/config/action-sheet-config';
import { AlertConfig } from '../alert/config/alert-config';
import { KirbyAnimation } from '../../../animation/kirby-animation';
import { Modal } from './modal.model';

export abstract class IModalController {
  abstract scrollToTop: (duration?: KirbyAnimation.Duration) => void;
  abstract scrollToBottom: (duration?: KirbyAnimation.Duration) => void;
  abstract showModal(config: ModalConfig, onCloseModal?: (data?: any) => any): void;
  abstract showActionSheet(config: ActionSheetConfig, onCloseModal?: (data?: any) => any): void;
  abstract showAlert(config: AlertConfig, onCloseModal?: (result?: boolean) => boolean);
  abstract blurNativeWrapper(nativeElement: HTMLElement): void;
  abstract hideTopmost(data?: any): void;
  abstract register(modal: Modal): void;
}
