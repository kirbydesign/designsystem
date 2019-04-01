import { ModalDialogService } from 'nativescript-angular/directives/dialogs';
import { Component, ViewContainerRef } from '@angular/core';
import { ExtendedShowModalOptions } from 'nativescript-windowed-modal/windowed-modal.common';

import { ModalComponent } from '~/kirby/components/modal/modal.component';

@Component({
  selector: 'kirby-modal-example',
  templateUrl: './modal-example.component.html',
  styleUrls: ['./modal-example.component.scss'],
})
export class ModalExampleComponent {
  constructor(private modal: ModalDialogService, private vcRef: ViewContainerRef) {}

  openModal() {
    this.modal.showModal(ModalComponent, {
      viewContainerRef: this.vcRef,
      context: "I'm the context",
      closeCallback: (response: string) => {
        console.log('response: ' + response);
      },
      dimAmount: 0.5, // Sets the alpha of the background dim
    } as ExtendedShowModalOptions);
  }
}

// mainPage.showModal("./modal", {
//   context: "I'm the context",
//   closeCallback: (response: string) => console.log("Modal response: " + response),
//   dimAmount: 0.5 // Sets the alpha of the background dim
// } as ExtendedShowModalOptions)
