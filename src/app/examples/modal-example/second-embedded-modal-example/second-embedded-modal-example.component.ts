import { Component } from '@angular/core';

import { ModalService } from '~/kirby/components/modal/services/modal-service';
import { ModalUidProvider } from '~/kirby/components/modal/modal-uid-provider';

@Component({
  templateUrl: './second-embedded-modal-example.component.html',
  providers: [ModalService],
})
export class SecondEmbeddedModalExampleComponent {
  constructor(private modalService: ModalService, private modalUidProvider: ModalUidProvider) {}

  onHideSecond() {
    this.modalService.hideModal(this.modalUidProvider.uid);
  }
}
