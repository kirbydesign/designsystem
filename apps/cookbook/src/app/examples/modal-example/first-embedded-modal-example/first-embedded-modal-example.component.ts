import { Component, Inject } from '@angular/core';

import { ModalController } from '@kirbydesign/designsystem/modal';
import { ModalConfig, COMPONENT_PROPS } from '@kirbydesign/designsystem/modal';
import { ToastConfig, ToastController } from '@kirbydesign/designsystem';
import { SecondEmbeddedModalExampleComponent } from '../second-embedded-modal-example/second-embedded-modal-example.component';
import { KirbyAnimation } from '@kirbydesign/designsystem/animation/kirby-animation';

@Component({
  templateUrl: './first-embedded-modal-example.component.html',
})
export class FirstEmbeddedModalExampleComponent {
  props: { [key: string]: any };

  constructor(
    @Inject(COMPONENT_PROPS) componentProps,
    private modalController: ModalController,
    private toastController: ToastController
  ) {
    this.props = componentProps;
  }

  async showNestedModal() {
    const config: ModalConfig = {
      title: 'Embedded Modal Title',
      flavor: 'modal',
      component: SecondEmbeddedModalExampleComponent,
    };

    // supposing no callback needed for the second component
    this.modalController.showModal(config);
  }

  async showNestedDrawer() {
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

  scrollToBottom() {
    this.modalController.scrollToBottom();
  }

  scrollToTop() {
    this.modalController.scrollToTop(KirbyAnimation.Duration.LONG);
  }

  onHideFirst() {
    let someTestData: number = Math.PI;
    this.modalController.hideTopmost(someTestData);
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
