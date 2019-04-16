import { Component, ViewContainerRef } from '@angular/core';

import { ModalConfig } from '~/kirby/components/modal/config/modal-config';
import { ModalController } from '~/kirby/components/modal/services/modal.controller';
import { FirstEmbeddedModalExampleComponent } from './first-embedded-modal-example/first-embedded-modal-example.component';

@Component({
  selector: 'kirby-modal-example',
  templateUrl: './modal-example.component.html',
})
export class ModalExampleComponent {
  constructor(private modalController: ModalController, private vcRef: ViewContainerRef) {}

  openModal() {
    const config: ModalConfig = {
      title: 'First Embedded Modal',
      titleHorizontalAlignment: 'center',
      component: FirstEmbeddedModalExampleComponent,
    };

    this.modalController.showModal(config, this.vcRef, this.testCallback);
  }

  testCallback(modalData: any) {
    console.log('Callback from FirstEmbeddedModalExampleComponent:');
    console.log(`Data received: ${JSON.stringify(modalData)}`);
  }
}
