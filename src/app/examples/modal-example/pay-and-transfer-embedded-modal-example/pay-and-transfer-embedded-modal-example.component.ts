import { EventData } from 'tns-core-modules/data/observable';
import { Component, ViewContainerRef } from '@angular/core';

import { ModalService } from '~/kirby/components/modal/modal-service/modal-service';
import { EmbeddedModal } from '~/kirby/components/modal/embedded-modal';
import { ModalConfig } from '~/kirby/components/modal/modal-config';
import { SecondEmbeddedModalExampleComponent } from '../second-embedded-modal-example/second-embedded-modal-example.component';

@Component({
  templateUrl: './pay-and-transfer-embedded-modal-example.component.html',
  providers: [ModalService],
})
export class PayAndTransferEmbeddedModalExampleComponent implements EmbeddedModal {
  uid: number;

  constructor(private modalService: ModalService, private vcRef: ViewContainerRef) {}

  onHidePress(_args: EventData) {
    this.modalService.hideModal(this.uid, this.testCallback);
  }

  async openSecondModal(_args: EventData) {
    const config: ModalConfig = {
      title: 'Second Embedded Modal',
      titleHorizontalAlignment: 'left',
      component: SecondEmbeddedModalExampleComponent,
    };

    await this.modalService.showModal(config, this.vcRef);
  }

  testCallback() {
    console.log('callback from PayAndTransferEmbeddedModalExampleComponent');
  }
}
