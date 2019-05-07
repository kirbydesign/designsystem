import { Component, ViewContainerRef } from '@angular/core';

import { ModalController } from '~/kirby/components/modal/services/modal.controller';
import { ModalWindowConfig } from '~/kirby/components/modal/modal-window/config/modal-window-config';
import { SecondEmbeddedModalExampleComponent } from '../second-embedded-modal-example/second-embedded-modal-example.component';

@Component({
  templateUrl: './first-embedded-modal-example.component.html',
})
export class FirstEmbeddedModalExampleComponent {
  constructor(private modalController: ModalController, private vcRef: ViewContainerRef) {}

  async openSecondModal() {
    const config: ModalWindowConfig = {
      title: 'Second Embedded Modal',
      titleHorizontalAlignment: 'left',
      closeIconName: 'arrow-back',
      component: SecondEmbeddedModalExampleComponent,
    };

    // supposing no callback needed for the second component
    this.modalController.showModalWindow(config, this.vcRef);
  }

  onHideFirst() {
    let someTestData: number = Math.PI;
    this.modalController.hideWindow(someTestData);
  }
}
