import { ExtendedShowModalOptions } from 'nativescript-windowed-modal/windowed-modal.common';
import { Injectable } from '@angular/core';
import { ModalDialogService } from 'nativescript-angular/directives/dialogs';
import { ViewContainerRef } from '@angular/core';

import { ModalWrapperComponent } from '../modal-wrapper/modal-wrapper.component';
import { ModalWrapperConfig } from '../modal-wrapper/config/modal-wrapper-config';
import { ModalWrapperConfigHelper } from '../modal-wrapper/config/modal-wrapper-config.helper';

@Injectable()
export class ModalWindowHelper {
  constructor(private modalDialogService: ModalDialogService) {}

  public async showModalWindow(
    config: ModalWrapperConfig,
    vcRef: ViewContainerRef,
    _: any
  ): Promise<any> {
    return await this.modalDialogService.showModal(ModalWrapperComponent, {
      viewContainerRef: vcRef,
      closeCallback: null,
      context: config,
      // TODO: dimAmount does not currently work, as ExtendedShowModalOptions is not being passed correctly
      // to the nativescript-windowed-modal plugin. Will be fixed in one of the upcoming releases of nativescript-angular.
      // https://github.com/mukaschultze/nativescript-windowed-modal/issues/6
      dimAmount: config.dim ? config.dim : ModalWrapperConfigHelper.defaultDim,
    } as ExtendedShowModalOptions);
  }
}
