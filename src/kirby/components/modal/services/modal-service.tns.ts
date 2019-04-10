import { Injectable } from '@angular/core';
import { ModalDialogService } from 'nativescript-angular/directives/dialogs';
import { ViewContainerRef } from '@angular/core';

import { ModalComponent } from '~/kirby/components/modal/modal.component';
import { ModalConfig } from '~/kirby/components/modal/config/modal-config';
import { ModalCloserService } from './modal-closer-service';
import { ModalServiceInterface } from './modal-service-interface';

@Injectable()
export class ModalService implements ModalServiceInterface {
  constructor(
    private modalDialogService: ModalDialogService,
    private modalCloserService: ModalCloserService
  ) {}

  public async showModal(config: ModalConfig, vcRef: ViewContainerRef): Promise<void> {
    const uid = new Date().getTime();
    config.uid = uid;
    await this.modalDialogService
      .showModal(ModalComponent, {
        viewContainerRef: vcRef,
        context: config,
      })
      .then((callback) => {
        if (callback) {
          callback();
        }
      });
  }

  public async hideModal(uid: number, callback: Function): Promise<void> {
    this.modalCloserService.closeModal(uid, callback);
  }
}
