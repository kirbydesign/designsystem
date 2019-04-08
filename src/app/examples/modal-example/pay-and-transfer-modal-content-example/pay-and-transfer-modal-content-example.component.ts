import { EventData } from 'tns-core-modules/data/observable';
import { Component } from '@angular/core';

import { ModalService } from '~/kirby/components/modal/modal-service/modal-service';
import { EmbeddedModal } from '~/kirby/components/modal/embedded-modal';

@Component({
  templateUrl: './pay-and-transfer-modal-content-example.component.html',
  providers: [ModalService],
})
export class PayAndTransferModalContentExampleComponent implements EmbeddedModal {
  uid: number;

  constructor(private modalService: ModalService) {}

  textPress(args: EventData) {
    this.modalService.hideModal(this.uid, this.testCallback);
  }

  testCallback() {
    console.log('example of a callback');
  }
}
