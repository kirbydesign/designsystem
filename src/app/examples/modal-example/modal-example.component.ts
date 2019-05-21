import { Component, ViewContainerRef } from '@angular/core';

import { ModalConfig } from '~/kirby/components/modal/modal-wrapper/config/modal-config';
import { ModalController } from '~/kirby/components/modal/services/modal.controller';
import { FirstEmbeddedModalExampleComponent } from './first-embedded-modal-example/first-embedded-modal-example.component';

@Component({
  selector: 'kirby-modal-example',
  templateUrl: './modal-example.component.html',
})
export class ModalExampleComponent {
  constructor(private modalController: ModalController, private vcRef: ViewContainerRef) {}

  showModal() {
    const config: ModalConfig = {
      title: 'First Embedded Modal',
      closeBtnPlacement: 'hidden',
      component: FirstEmbeddedModalExampleComponent,
      componentProps: {
        prop1: 'value1',
        prop2: 'value2',
      },
    };

    this.modalController.showModal(config, this.vcRef, this.onModalClose);
  }

  onModalClose(modalData: any): void {
    console.log('Callback from FirstEmbeddedModalExampleComponent:');
    console.log(`Data received: ${JSON.stringify(modalData)}`);
  }
}
