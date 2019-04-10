import { Component, ViewContainerRef } from '@angular/core';

import { ModalConfig } from '~/kirby/components/modal/config/modal-config';
import { ModalService } from '~/kirby/components/modal/services/modal-service';
import { FirstEmbeddedModalExampleComponent } from './first-embedded-modal-example/first-embedded-modal-example.component';

@Component({
  selector: 'kirby-modal-example',
  templateUrl: './modal-example.component.html',
  providers: [ModalService],
})
export class ModalExampleComponent {
  constructor(private modalService: ModalService, private vcRef: ViewContainerRef) {}

  openModal() {
    const config: ModalConfig = {
      title: 'First Embedded Modal',
      titleHorizontalAlignment: 'center',
      component: FirstEmbeddedModalExampleComponent,
    };

    this.modalService.showModal(config, this.vcRef);
  }
}
