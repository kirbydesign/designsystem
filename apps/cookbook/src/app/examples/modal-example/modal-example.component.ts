import { Component } from '@angular/core';

import { ModalConfig, ModalController, RouterOutletComponent } from '@kirbydesign/designsystem';
import { FirstEmbeddedModalExampleComponent } from './first-embedded-modal-example/first-embedded-modal-example.component';
import { ModalCompactExampleComponent } from './compact-example/modal-compact-example.component';

@Component({
  selector: 'cookbook-modal-example',
  templateUrl: './modal-example.component.html',
  styleUrls: ['./modal-example.component.scss'],
})
export class ModalExampleComponent {
  constructor(
    private modalController: ModalController,
    private routerOutlet: RouterOutletComponent
  ) {}

  showModal() {
    const config: ModalConfig = {
      title: 'My Modal Title',
      component: FirstEmbeddedModalExampleComponent,
      componentProps: {
        prop1: 'value1',
        prop2: 'value2',
      },
      presentingElement: this.routerOutlet.nativeEl,
    };

    this.modalController.showModal(config, this.onModalClose);
  }

  showCompact() {
    const config: ModalConfig = {
      title: null,
      flavor: 'compact',
      component: ModalCompactExampleComponent,
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
