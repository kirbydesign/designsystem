import { Component, ViewContainerRef } from '@angular/core';

import { ModalWrapperConfig } from '~/kirby/components/modal/modal-wrapper/config/modal-wrapper-config';
import { ModalController } from '~/kirby/components/modal/services/modal.controller';
import { FirstEmbeddedModalExampleComponent } from './first-embedded-modal-example/first-embedded-modal-example.component';

@Component({
  selector: 'kirby-modal-example',
  templateUrl: './modal-example.component.html',
})
export class ModalExampleComponent {
  constructor(private modalController: ModalController, private vcRef: ViewContainerRef) {}

  showModal() {
    const config: ModalWrapperConfig = {
      title: 'First Embedded Modal',
      titleHorizontalAlignment: 'center',
      component: FirstEmbeddedModalExampleComponent,
    };

    this.modalController.showModal(config, this.vcRef, this.onModalClose);
  }

  onModalClose(modalData: any): void {
    console.log('Callback from FirstEmbeddedModalExampleComponent:');
    console.log(`Data received: ${JSON.stringify(modalData)}`);
  }
}
