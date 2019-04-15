import { ExtendedShowModalOptions } from 'nativescript-windowed-modal/windowed-modal.common';
import { Injectable } from '@angular/core';
import { ModalDialogService } from 'nativescript-angular/directives/dialogs';
import { ViewContainerRef } from '@angular/core';

import { ModalComponent } from '../modal.component';
import { ModalConfig } from '../config/modal-config';
import { ModalCloserService } from './modal-closer.service';
import { ModalConfigHelper } from '../helpers/modal-config-helper';

@Injectable()
export class ModalServiceHelper {
  constructor(
    private modalDialogService: ModalDialogService,
    private modalCloserService: ModalCloserService
  ) {}

  public async showModal(
    config: ModalConfig,
    vcRef: ViewContainerRef,
    callback?: Function
  ): Promise<void> {
    await this.modalDialogService
      .showModal(ModalComponent, {
        viewContainerRef: vcRef,
        closeCallback: callback,
        context: config,
        // TODO: dimAmount does not currently work, as ExtendedShowModalOptions is not being passed correctly
        // to the nativescript-windowed-modal plugin. Will be fixed in one of the upcoming releases of nativescript-angular.
        // https://github.com/mukaschultze/nativescript-windowed-modal/issues/6
        dimAmount: config.dim ? config.dim : ModalConfigHelper.defaultDim,
      } as ExtendedShowModalOptions)
      .then((data) => {
        if (callback) {
          callback(data);
        }
      });
  }

  public async hideModal(uid: number, data?: any): Promise<void> {
    this.modalCloserService.closeModal(uid, data);
  }
}
