import { EventData } from 'tns-core-modules/data/observable';
import { Component } from '@angular/core';

import { ModalService } from '~/kirby/components/modal/modal-service/modal-service';
import { EmbeddedModal } from '~/kirby/components/modal/embedded-modal';

@Component({
  templateUrl: './second-embedded-modal-example.component.html',
  providers: [ModalService],
})
export class SecondEmbeddedModalExampleComponent implements EmbeddedModal {
  uid: number;

  constructor(private modalService: ModalService) {}

  onHidePress(_args: EventData) {
    this.modalService.hideModal(this.uid, this.testCallback);
  }

  testCallback() {
    console.log('callback from SecondEmbeddedModalExampleComponent');
  }
}
