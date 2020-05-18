import { Component, Inject, Optional, SkipSelf } from '@angular/core';

import { AlertConfig, ActionSheetConfig, Modal, ModalController } from '@kirbydesign/designsystem';
import { ModalConfig, COMPONENT_PROPS } from '@kirbydesign/designsystem';
import { ToastConfig, ToastController } from '@kirbydesign/designsystem';
import { SecondEmbeddedModalExampleComponent } from '../second-embedded-modal-example/second-embedded-modal-example.component';
import { KirbyAnimation } from '@kirbydesign/designsystem';

@Component({
  selector: 'cookbook-first-embedded-modal-example',
  templateUrl: './first-embedded-modal-example.component.html',
})
export class FirstEmbeddedModalExampleComponent {
  props: { [key: string]: any };
  showFooter: boolean = true;

  constructor(
    @Inject(COMPONENT_PROPS) componentProps,
    private modalController: ModalController,
    private toastController: ToastController,
    @Optional() @SkipSelf() private modal: Modal
  ) {
    this.props = componentProps;
    this.showFooter = this.props.showFooter;
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
    this.modalController.showAlert(config, this.onAlertClose);
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
    this.modal.scrollToBottom();
  }

  scrollToTop() {
    this.modal.scrollToTop(KirbyAnimation.Duration.LONG);
  }

  disableScroll() {
    this.modal.scrollDisabled = true;
  }

  enableScroll() {
    this.modal.scrollDisabled = false;
  }

  close() {
    let someTestData: number = Math.PI;
    this.modal.close(someTestData);
  }

  onSupplementaryActionSelect(args: any) {
    const config: ToastConfig = {
      message: `Supplementary action selected`,
      messageType: 'success',
      durationInMs: 1500,
    };
    this.toastController.showToast(config);
  }

  onAlertClose(result?: boolean): void {
    console.log(`Alert closed: ${result}`);
  }
}
