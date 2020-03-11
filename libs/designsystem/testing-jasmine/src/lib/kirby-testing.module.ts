/// <reference path='../../../../../node_modules/@types/jasmine/index.d.ts' />

import { NgModule } from '@angular/core';

import { LoadingOverlayService, ModalController, ToastController } from '@kirbydesign/designsystem';
import { KirbyTestingBaseModule } from '@kirbydesign/designsystem/testing-base';

export function modalControllerFactory() {
  return jasmine.createSpyObj('ModalController', [
    'showModal',
    'showActionSheet',
    'showAlert',
    'blurNativeWrapper',
    'register',
    'hideTopmost',
    'scrollToTop',
    'scrollToBottom',
    'hideAll',
  ]);
}

export function toastControllerFactory() {
  return jasmine.createSpyObj('ToastController', ['showToast']);
}

export function loadingOverlayServiceFactory() {
  return jasmine.createSpyObj<LoadingOverlayService>('LoadingOverlayService', [
    'showLoadingOverlay',
    'hideLoadingOverlay',
  ]);
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
