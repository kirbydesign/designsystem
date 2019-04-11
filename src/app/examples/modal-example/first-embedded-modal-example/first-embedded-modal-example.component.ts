import { Component, ViewContainerRef } from '@angular/core';

import { ModalUidProvider } from '~/kirby/components/modal/modal-uid-provider';
import { ModalService } from '~/kirby/components/modal/services/modal.service';
import { ModalConfig } from '~/kirby/components/modal/config/modal-config';
import { SecondEmbeddedModalExampleComponent } from '../second-embedded-modal-example/second-embedded-modal-example.component';

@Component({
  templateUrl: './first-embedded-modal-example.component.html',
  providers: [ModalService],
})
export class FirstEmbeddedModalExampleComponent {
  constructor(
    private modalService: ModalService,
    private vcRef: ViewContainerRef,
    private modalUidProvider: ModalUidProvider
  ) {}

  async openSecondModal() {
    const config: ModalConfig = {
      title: 'Second Embedded Modal',
      titleHorizontalAlignment: 'left',
      closeIconName: 'arrow',
      component: SecondEmbeddedModalExampleComponent,
    };

    // supposing no callback needed for the second component
    let modalId = this.modalService.showModal(config, this.vcRef);
  }

  onHideFirst() {
    let someTestData: number = Math.PI;
    this.modalService.hideModal(this.modalUidProvider.uid, someTestData);
  }
}
