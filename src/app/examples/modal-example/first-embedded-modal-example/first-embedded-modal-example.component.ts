import { Component, ViewContainerRef } from '@angular/core';

import { ModalController } from '~/kirby/components/modal/services/modal.controller';
import { ModalConfig } from '~/kirby/components/modal/config/modal-config';
import { SecondEmbeddedModalExampleComponent } from '../second-embedded-modal-example/second-embedded-modal-example.component';

@Component({
  templateUrl: './first-embedded-modal-example.component.html',
})
export class FirstEmbeddedModalExampleComponent {
  constructor(private modalController: ModalController, private vcRef: ViewContainerRef) {}

  async openSecondModal() {
    const config: ModalConfig = {
      title: 'Second Embedded Modal',
      titleHorizontalAlignment: 'left',
      closeIconName: 'arrow-back',
      component: SecondEmbeddedModalExampleComponent,
    };

    // supposing no callback needed for the second component
    this.modalController.showModal(config, this.vcRef);
  }

  onHideFirst() {
    let someTestData: number = Math.PI;
    this.modalController.hideModal(someTestData);
  }
}
