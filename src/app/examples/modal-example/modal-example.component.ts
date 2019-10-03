import { Component } from '@angular/core';

import { ModalConfig } from '@kirbydesign/designsystem/modal';
import { ModalController } from '@kirbydesign/designsystem/modal';
import { FirstEmbeddedModalExampleComponent } from './first-embedded-modal-example/first-embedded-modal-example.component';

@Component({
  selector: 'kirby-modal-example',
  templateUrl: './modal-example.component.html',
  styleUrls: ['./modal-example.component.scss'],
})
export class ModalExampleComponent {
  constructor(private modalController: ModalController) {}

  showModal() {
    const config: ModalConfig = {
      title: 'My Modal Title',
      flavor: 'modal',
      component: FirstEmbeddedModalExampleComponent,
      componentProps: {
        prop1: 'value1',
        prop2: 'value2',
      },
    };

    this.modalController.showModal(config, this.onModalClose);
  }

  showModalAnimateIn() {
    const config: ModalConfig = {
      title: 'My Modal Title',
      flavor: 'modal',
      component: FirstEmbeddedModalExampleComponent,
      componentProps: {
        prop1: 'value1',
        prop2: 'value2',
      },
    };

    this.modalController.showModalAnimateIn(config, 60, 60, 100, 80, this.onModalClose);
  }

  showDrawer() {
    const config: ModalConfig = {
      title: 'My Drawer Title',
      flavor: 'drawer',
      component: FirstEmbeddedModalExampleComponent,
      componentProps: {
        prop1: 'value1',
        prop2: 'value2',
      },
    };

    this.modalController.showModal(config, this.onDrawerClose);
  }

  onModalClose(data: any): void {
    console.log('Callback from Embedded Modal:');
    console.log(`Data received: ${JSON.stringify(data)}`);
  }

  onDrawerClose(data: any): void {
    console.log('Callback from Embedded Drawer:');
    console.log(`Data received: ${JSON.stringify(data)}`);
  }
}
