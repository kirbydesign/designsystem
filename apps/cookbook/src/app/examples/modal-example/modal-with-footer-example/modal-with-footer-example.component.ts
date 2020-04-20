import { Component, Inject } from '@angular/core';

import { ModalController, AlertConfig, ActionSheetConfig } from '@kirbydesign/designsystem';
import { ModalConfig, COMPONENT_PROPS } from '@kirbydesign/designsystem';
import { ToastConfig, ToastController } from '@kirbydesign/designsystem';
import { SecondEmbeddedModalExampleComponent } from '../second-embedded-modal-example/second-embedded-modal-example.component';
import { KirbyAnimation } from '@kirbydesign/designsystem';

@Component({
  templateUrl: './modal-with-footer-example.component.html',
  styles: [
    `
      button[kirby-button] {
        flex-grow: 1;
      }
    `,
  ],
})
export class ModalWithFooterExampleComponent {
  props: { [key: string]: any };

  constructor(
    @Inject(COMPONENT_PROPS) componentProps,
    private modalController: ModalController,
    private toastController: ToastController
  ) {
    this.props = componentProps;
  }

  showNestedModal() {
    const config: ModalConfig = {
      title: 'Embedded Modal Title',
      flavor: 'modal',
      component: SecondEmbeddedModalExampleComponent,
    };

    // supposing no callback needed for the second component
    this.modalController.showModal(config);
  }

  showNestedDrawer() {
    const config: ModalConfig = {
      title: 'Embedded Drawer Title',
      flavor: 'drawer',
      drawerSupplementaryAction: {
        iconName: 'edit',
        action: this.onSupplementaryActionSelect.bind(this),
      },
      component: SecondEmbeddedModalExampleComponent,
    };

    // supposing no callback needed for the second component
    this.modalController.showModal(config);
  }

  showNestedAlert() {
    const config: AlertConfig = {
      title: 'Embedded Alert',
      message: 'The default alert is just a title, a message, an OK and (optional) cancel button',
      okBtn: 'I agree',
      cancelBtn: 'Take me back',
    };
    this.modalController.showAlert(config);
  }

  showNestedActionSheet() {
    const config: ActionSheetConfig = {
      header: 'Nested action sheet',
      subheader: 'Action sheet subheader',
      items: [
        { id: '1', text: 'Option 1' },
        { id: '2', text: 'Option 2' },
        { id: '3', text: 'Option 3' },
      ],
      cancelButtonText: 'Custom cancel',
    };
    this.modalController.showActionSheet(config);
  }

  scrollToBottom() {
    this.modalController.scrollToBottom(KirbyAnimation.Duration.LONG);
  }

  scrollToTop() {
    this.modalController.scrollToTop(KirbyAnimation.Duration.LONG);
  }

  onClose() {
    this.modalController.hideTopmost();
  }

  onSupplementaryActionSelect(args: any) {
    const config: ToastConfig = {
      message: `Supplementary action selected`,
      messageType: 'success',
      durationInMs: 1500,
    };
    this.toastController.showToast(config);
  }
}
