import { ModalConfig } from '../modal-wrapper/config/modal-config';
import { ActionSheetConfig } from '../action-sheet/config/action-sheet-config';
import { AlertConfig } from '../alert/config/alert-config';

export abstract class IModalController {
  abstract showModal(config: ModalConfig, onCloseModal?: (data?: any) => any): void;
  abstract showActionSheet(config: ActionSheetConfig, onCloseModal?: (data?: any) => any): void;
  abstract showAlert(config: AlertConfig, onCloseModal?: (result?: boolean) => boolean);
  abstract blurNativeWrapper(nativeElement: HTMLElement): void;
  abstract hideTopmost(data?: any): void;
  abstract register(modal: { close: (data?: any) => {} }): void;
}
