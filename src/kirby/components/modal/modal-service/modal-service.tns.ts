import { Injectable } from '@angular/core';
import { ModalDialogService } from 'nativescript-angular/directives/dialogs';
import { ViewContainerRef } from '@angular/core';

import { ModalComponent } from '~/kirby/components/modal/modal.component';
import { ModalConfig } from '~/kirby/components/modal/modal-config';
import { ModalMapService } from './modal-map-service';

@Injectable()
export class ModalService {
  constructor(
    private modalDialogService: ModalDialogService,
    private modalMapService: ModalMapService
  ) {}

  public async showModal(config: ModalConfig, vcRef: ViewContainerRef) {
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
    return uid;
  }

  public hideModal(uid: number, callback: Function) {
    this.modalMapService.closeModal(uid, callback);
  }
}
