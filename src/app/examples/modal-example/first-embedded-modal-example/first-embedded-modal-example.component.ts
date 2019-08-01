import { Component, Inject, ViewContainerRef } from '@angular/core';

import { ModalController } from '@kirbydesign/designsystem/modal';
import { ModalConfig } from '@kirbydesign/designsystem/modal';
import { SecondEmbeddedModalExampleComponent } from '../second-embedded-modal-example/second-embedded-modal-example.component';
import { COMPONENT_PROPS } from '@kirbydesign/designsystem/modal';
import { ToastController } from '@kirbydesign/designsystem/components/toast/services/toast.controller';
import { ToastConfig } from '@kirbydesign/designsystem/components/toast/config/toast-config';

@Component({
  templateUrl: './first-embedded-modal-example.component.html',
})
export class FirstEmbeddedModalExampleComponent {
  props: { [key: string]: any };

  constructor(
    @Inject(COMPONENT_PROPS) private componentProps,
    private modalController: ModalController,
    private toastController: ToastController,
    private vcRef: ViewContainerRef
  ) {
    this.props = componentProps;
  }

  async showSecondModal() {
    const config: ModalConfig = {
      title: 'Second Embedded Modal',
      titleHorizontalAlignment: 'center',
      closeIconName: 'arrow-back',
      component: SecondEmbeddedModalExampleComponent,
    };

    // supposing no callback needed for the second component
    this.modalController.showModal(config, this.vcRef);
  }

  showToast() {
    const config: ToastConfig = {
      message: 'Your toast message',
      messageType: 'success',
      durationInMs: 5000,
    };
    this.toastController.showToast(config);
  }

  onHideFirst() {
    let someTestData: number = Math.PI;
    this.modalController.hideTopmost(someTestData);
  }
}
