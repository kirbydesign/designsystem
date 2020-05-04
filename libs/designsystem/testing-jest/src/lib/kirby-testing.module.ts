/// <reference path='../../../../../node_modules/@types/jest/index.d.ts' />

import { NgModule } from '@angular/core';

import { LoadingOverlayService, ModalController, ToastController } from '@kirbydesign/designsystem';
import { KirbyTestingBaseModule } from '@kirbydesign/designsystem/testing-base';

export function modalControllerFactory() {
  return {
    showModal: jest.fn(),
    showActionSheet: jest.fn(),
    showAlert: jest.fn(),
    register: jest.fn(),
    hideTopmost: jest.fn(),
    scrollToTop: jest.fn(),
    scrollToBottom: jest.fn(),
    hideAll: jest.fn(),
    registerPresentingElement: jest.fn(),
  };
}

export function toastControllerFactory() {
  return {
    showToast: jest.fn(),
  };
}

export function loadingOverlayServiceFactory() {
  return {
    showLoadingOverlay: jest.fn(),
    hideLoadingOverlay: jest.fn(),
  };
}

@NgModule({
  imports: [KirbyTestingBaseModule],
  exports: [KirbyTestingBaseModule],
  providers: [
    {
      provide: ModalController,
      useFactory: modalControllerFactory,
    },
    {
      provide: ToastController,
      useFactory: toastControllerFactory,
    },
    {
      provide: LoadingOverlayService,
      useFactory: loadingOverlayServiceFactory,
    },
  ],
})
export class KirbyTestingModule {}
