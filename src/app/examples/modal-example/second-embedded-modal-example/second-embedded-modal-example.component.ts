import { EventData } from 'tns-core-modules/data/observable';
import { Component } from '@angular/core';

import { ModalService } from '~/kirby/components/modal/services/modal-service';
import { EmbeddedModalComponent } from '~/kirby/components/modal/embedded-modal.component';

@Component({
  templateUrl: './second-embedded-modal-example.component.html',
  providers: [ModalService],
})
export class SecondEmbeddedModalExampleComponent implements EmbeddedModalComponent {
  uid: number;

  constructor(private modalService: ModalService) {}

  onHidePress(_args: EventData) {
    this.modalService.hideModal(this.uid);
  }
}
