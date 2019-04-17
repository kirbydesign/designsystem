import { ExtendedShowModalOptions } from 'nativescript-windowed-modal/windowed-modal.common';
import { Injectable } from '@angular/core';
import { ModalDialogService } from 'nativescript-angular/directives/dialogs';
import { ViewContainerRef } from '@angular/core';

import { ModalComponent } from '../modal.component';
import { ModalConfig } from '../config/modal-config';
import { ModalConfigHelper } from '../config/modal-config.helper';

@Injectable()
export class ModalHelper {
  constructor(private modalDialogService: ModalDialogService) {}

  public async showModal(config: ModalConfig, vcRef: ViewContainerRef, _: any): Promise<any> {
    return await this.modalDialogService.showModal(ModalComponent, {
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
