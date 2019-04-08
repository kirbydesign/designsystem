import { Component, ViewContainerRef } from '@angular/core';

import { PayAndTransferModalContentExampleComponent } from './pay-and-transfer-modal-content-example/pay-and-transfer-modal-content-example.component';
import { ModalConfig } from '~/kirby/components/modal/modal-config';
import { ModalService } from '~/kirby/components/modal/modal-service/modal-service';

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
      component: PayAndTransferModalContentExampleComponent,
    };

    this.modalId = this.modalService.showModal(config, this.vcRef);
  }
}
