import { Component, ViewContainerRef } from '@angular/core';

import { ModalConfig } from '~/kirby/components/modal/modal-config';
import { ModalService } from '~/kirby/components/modal/modal-service/modal-service';
import { PayAndTransferEmbeddedModalExampleComponent } from './pay-and-transfer-embedded-modal-example/pay-and-transfer-embedded-modal-example.component';

@Component({
  selector: 'kirby-modal-example',
  templateUrl: './modal-example.component.html',
  providers: [ModalService],
})
export class ModalExampleComponent {
  private modalId: any;

  constructor(private modalService: ModalService, private vcRef: ViewContainerRef) {}

  openModal() {
    const config: ModalConfig = {
      title: 'Betal & Overfør',
      titleHorizontalAlignment: 'center',
      component: PayAndTransferEmbeddedModalExampleComponent,
    };

    this.modalId = this.modalService.showModal(config, this.vcRef);
  }
}
