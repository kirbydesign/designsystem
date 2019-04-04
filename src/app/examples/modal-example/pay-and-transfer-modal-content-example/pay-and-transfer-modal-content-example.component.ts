import { Component } from '@angular/core';

import { ModalService } from '~/kirby/components/modal/modal-service/modal-service';

@Component({
  templateUrl: './pay-and-transfer-modal-content-example.component.html',
  providers: [ModalService],
})
export class PayAndTransferModalContentExampleComponent {
  constructor(private modalService: ModalService) {}

  myExampleCallback() {
    console.log('hello from my example callback');
  }

  textPress() {
    this.modalService.hideModal(this.myExampleCallback);
  }
}
