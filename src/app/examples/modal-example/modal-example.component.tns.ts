import { ModalDialogService } from 'nativescript-angular/directives/dialogs';
import { Component, ViewContainerRef } from '@angular/core';

import { ModalConfig } from '~/kirby/components/modal/modal-config';
import { ModalComponent } from '~/kirby/components/modal/modal.component';
import { PayAndTransferModalContentExampleComponent } from './pay-and-transfer-modal-content-example/pay-and-transfer-modal-content-example.component';

@Component({
  selector: 'kirby-modal-example',
  templateUrl: './modal-example.component.html',
  styleUrls: ['./modal-example.component.scss'],
})
export class ModalExampleComponent {
  constructor(private modalDialogService: ModalDialogService, private vcRef: ViewContainerRef) {}

  openModal() {
    const content: ModalConfig = {
      title: 'Betal & Overfør',
      titleHorizontalAlignment: 'center',
      component: PayAndTransferModalContentExampleComponent,
    };

    this.modalDialogService
      .showModal(ModalComponent, {
        viewContainerRef: this.vcRef,
        context: content,
      })
      .then((result: string) => {
        console.log('res: ' + result);
      });
  }
}
