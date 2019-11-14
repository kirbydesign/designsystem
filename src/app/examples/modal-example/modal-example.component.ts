import { Component } from '@angular/core';

import { ModalConfig, ModalController } from '@kirbydesign/designsystem/modal';
import { FirstEmbeddedModalExampleComponent } from './first-embedded-modal-example/first-embedded-modal-example.component';
import { EmptyModalExampleComponent } from '~/app/examples/modal-example/empty-modal-example/empty-modal-example.component';
import { KirbyAnimation } from '@kirbydesign/designsystem/animation/kirby-animation';

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

  showModalEmptyTest() {
    const config: ModalConfig = {
      title: 'Test Modal Title',
      flavor: 'modal',
      component: EmptyModalExampleComponent,
      componentProps: {
        prop1: 'value1',
        prop2: 'value2',
      },
      durationIn: KirbyAnimation.Duration.TEST,
      durationOut: KirbyAnimation.Duration.TEST,
    };

    this.modalController.showModal(config, this.onModalClose);
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
