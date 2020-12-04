import { Component, Inject, OnInit, Optional, SkipSelf } from '@angular/core';

import { AlertConfig, ActionSheetConfig, Modal, ModalController } from '@kirbydesign/designsystem';
import { ModalConfig, COMPONENT_PROPS } from '@kirbydesign/designsystem';
import { ToastConfig, ToastController } from '@kirbydesign/designsystem';
import { KirbyAnimation } from '@kirbydesign/designsystem';

import { SecondEmbeddedModalExampleComponent } from '../second-embedded-modal-example/second-embedded-modal-example.component';

@Component({
  selector: 'cookbook-first-embedded-modal-example',
  templateUrl: './first-embedded-modal-example.component.html',
  styleUrls: ['./first-embedded-modal-example.component.scss'],
})
export class FirstEmbeddedModalExampleComponent implements OnInit {
  showFooter = true;
  showCustomHeader = false;
  isLoading = true;
  snapFooterToKeyboard = false;

  constructor(
    @Inject(COMPONENT_PROPS) public componentProps,
    private modalController: ModalController,
    private toastController: ToastController,
    @Optional() @SkipSelf() private modal: Modal
  ) {
    this.showFooter = componentProps.showFooter;
    this.showCustomHeader = componentProps.showCustomHeader;
  }

  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  showNestedModal() {
    const config: ModalConfig = {
      flavor: 'modal',
      component: SecondEmbeddedModalExampleComponent,
    };

    // supposing no callback needed for the second component
    this.modalController.showModal(config);
  }

  showNestedDrawer() {
    const config: ModalConfig = {
      flavor: 'drawer',
      drawerSupplementaryAction: {
        iconName: 'edit',
        action: this.onSupplementaryActionSelect.bind(this),
      },
      component: SecondEmbeddedModalExampleComponent,
      componentProps: {
        flavor: 'drawer',
      },
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

  toggleFooter() {
    this.showFooter = !this.showFooter;
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

  onSnapFooterToKeyboardCheckbox(checked: boolean) {
    this.snapFooterToKeyboard = checked;
  }

  onAlertClose(result?: boolean): void {
    console.log(`Alert closed: ${result}`);
  }
}
