import { Injectable } from '@angular/core';
import { ModalDialogService } from 'nativescript-angular/directives/dialogs';
import { ViewContainerRef } from '@angular/core';
import { ExtendedShowModalOptions } from 'nativescript-windowed-modal/windowed-modal.common';

import { ModalConfig } from '~/kirby/components/modal/modal-config';
import { ModalComponent } from '~/kirby/components/modal/modal.component';

@Injectable()
export class ModalService {
  constructor(private modalDialogService: ModalDialogService, private vcRef: ViewContainerRef) {}

  // vcRef: ViewContainerRef;

  public async showModal(content: ModalConfig, vcRef: ViewContainerRef) {
    // this.vcRef = vcRef;
    await this.modalDialogService.showModal(ModalComponent, {
      viewContainerRef: vcRef,
      context: content,
      closeCallback: this.testCallback,
      dimAmount: 0.1,
    } as ExtendedShowModalOptions);
  }

  public async hideModal(callback: Function) {
    this.vcRef.clear();
    console.log('hideModal() called');
  }

  // todo: close modal
  public testCallback() {
    console.log('testCallback() called');
  }
}
