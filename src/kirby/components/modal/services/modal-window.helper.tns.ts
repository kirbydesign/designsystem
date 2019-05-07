import { ExtendedShowModalOptions } from 'nativescript-windowed-modal/windowed-modal.common';
import { Injectable } from '@angular/core';
import { ModalDialogService } from 'nativescript-angular/directives/dialogs';
import { ViewContainerRef } from '@angular/core';

import { ModalWindowComponent } from '../modal-window/modal-window.component';
import { ModalWindowConfig } from '../modal-window/config/modal-window-config';
import { ModalConfigHelper } from '../modal-window/config/modal-window-config.helper';

@Injectable()
export class ModalWindowHelper {
  constructor(private modalDialogService: ModalDialogService) {}

  public async showModalWindow(
    config: ModalWindowConfig,
    vcRef: ViewContainerRef,
    _: any
  ): Promise<any> {
    return await this.modalDialogService.showModal(ModalWindowComponent, {
      viewContainerRef: vcRef,
      closeCallback: null,
      context: config,
      // TODO: dimAmount does not currently work, as ExtendedShowModalOptions is not being passed correctly
      // to the nativescript-windowed-modal plugin. Will be fixed in one of the upcoming releases of nativescript-angular.
      // https://github.com/mukaschultze/nativescript-windowed-modal/issues/6
      dimAmount: config.dim ? config.dim : ModalConfigHelper.defaultDim,
    } as ExtendedShowModalOptions);
  }
}
