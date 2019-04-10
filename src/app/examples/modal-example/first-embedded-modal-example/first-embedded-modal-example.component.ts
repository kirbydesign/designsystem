import { EventData } from 'tns-core-modules/data/observable';
import { Component, ViewContainerRef } from '@angular/core';

import { ModalService } from '~/kirby/components/modal/services/modal-service';
import { EmbeddedModalComponent } from '~/kirby/components/modal/embedded-modal.component';
import { ModalConfig } from '~/kirby/components/modal/config/modal-config';
import { SecondEmbeddedModalExampleComponent } from '../second-embedded-modal-example/second-embedded-modal-example.component';

@Component({
  templateUrl: './first-embedded-modal-example.component.html',
  providers: [ModalService],
})
export class FirstEmbeddedModalExampleComponent implements EmbeddedModalComponent {
  uid: number;

  constructor(private modalService: ModalService, private vcRef: ViewContainerRef) {}

  onHidePress(_args: EventData) {
    this.modalService.hideModal(this.uid, this.testCallback);
  }

  async openSecondModal(_args: EventData) {
    const config: ModalConfig = {
      title: 'Second Embedded Modal',
      titleHorizontalAlignment: 'left',
      closeIcon: 'arrow',
      component: SecondEmbeddedModalExampleComponent,
    };

    await this.modalService.showModal(config, this.vcRef);
  }

  testCallback() {
    console.log('callback from FirstEmbeddedModalExampleComponent');
  }
}
