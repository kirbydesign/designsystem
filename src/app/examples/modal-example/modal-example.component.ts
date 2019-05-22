import { Component, ViewContainerRef } from '@angular/core';

import { ModalConfig } from '@kirbydesign/designsystem/modal';
import { ModalController } from '@kirbydesign/designsystem/modal';
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
      closeBtnPosition: 'inside',
      titleHorizontalAlignment: 'center',
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
