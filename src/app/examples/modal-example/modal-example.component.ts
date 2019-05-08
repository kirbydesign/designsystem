import { Component, ViewContainerRef } from '@angular/core';

import { ModalWindowConfig } from '~/kirby/components/modal/modal-window/config/modal-window-config';
import { ModalController } from '~/kirby/components/modal/services/modal.controller';
import { FirstEmbeddedModalExampleComponent } from './first-embedded-modal-example/first-embedded-modal-example.component';

@Component({
  selector: 'kirby-modal-example',
  templateUrl: './modal-example.component.html',
})
export class ModalExampleComponent {
  constructor(private modalController: ModalController, private vcRef: ViewContainerRef) {}

  openModal() {
    const config: ModalWindowConfig = {
      title: 'First Embedded Modal',
      titleHorizontalAlignment: 'center',
      component: FirstEmbeddedModalExampleComponent,
    };

    this.modalController.showModalWindow(config, this.vcRef, this.onModalClose);
  }

  onModalClose(modalData: any): void {
    console.log('Callback from FirstEmbeddedModalExampleComponent:');
    console.log(`Data received: ${JSON.stringify(modalData)}`);
  }
}
