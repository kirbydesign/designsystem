import { ModalDialogService } from 'nativescript-angular/directives/dialogs';
import { Component, ViewContainerRef } from '@angular/core';

import { ModalContent } from '~/kirby/components/modal/modal-content';
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
    const ctx: ModalContent = {
      title: 'Betal & Overfør',
      titleHorizontalAlignment: 'center',
      component: PayAndTransferModalContentExampleComponent,
    };

    this.modalDialogService
      .showModal(ModalComponent, {
        viewContainerRef: this.vcRef,
        context: ctx,
      })
      .then((result: string) => {
        console.log('res: ' + result);
      });
  }
}
