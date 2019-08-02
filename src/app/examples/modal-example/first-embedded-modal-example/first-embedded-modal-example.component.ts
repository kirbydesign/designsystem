import { Component, Inject, ViewContainerRef } from '@angular/core';

import { ModalController } from '@kirbydesign/designsystem/modal';
import { ModalConfig } from '@kirbydesign/designsystem/modal';
import { SecondEmbeddedModalExampleComponent } from '../second-embedded-modal-example/second-embedded-modal-example.component';
import { COMPONENT_PROPS } from '@kirbydesign/designsystem/modal';

@Component({
  templateUrl: './first-embedded-modal-example.component.html',
})
export class FirstEmbeddedModalExampleComponent {
  props: { [key: string]: any };

  constructor(
    @Inject(COMPONENT_PROPS) private componentProps,
    private modalController: ModalController,
    private vcRef: ViewContainerRef
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
    this.modalController.showModal(config, this.vcRef);
  }

  async showNestedDrawer() {
    const config: ModalConfig = {
      title: 'Embedded Drawer Title',
      flavor: 'drawer',
      drawerSupplementaryAction: {
        iconName: 'qr',
        action: this.onSupplementaryActionSelect,
      },
      component: SecondEmbeddedModalExampleComponent,
    };

    // supposing no callback needed for the second component
    this.modalController.showModal(config, this.vcRef);
  }

  onHideFirst() {
    let someTestData: number = Math.PI;
    this.modalController.hideTopmost(someTestData);
  }

  onSupplementaryActionSelect(args: any) {
    console.log('Supplementary action selected');
  }
}
