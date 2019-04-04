import { Injectable } from '@angular/core';
import { ModalDialogService } from 'nativescript-angular/directives/dialogs';
import { ViewContainerRef } from '@angular/core';

import { ModalConfig } from '~/kirby/components/modal/modal-config';
import { ModalComponent } from '~/kirby/components/modal/modal.component';

@Injectable()
export class ModalService {
  constructor(private modalDialogService: ModalDialogService) {}

  public async showModal(content: ModalConfig, vcRef: ViewContainerRef) {
    await this.modalDialogService
      .showModal(ModalComponent, {
        viewContainerRef: vcRef,
        context: content,
      })
      .then((result: string) => {
        console.log('res: ' + result);
      });
  }

  public async hideModal(message: string) {}
}
