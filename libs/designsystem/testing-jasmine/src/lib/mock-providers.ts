// AUTO-GENERATED - PLEASE DON'T EDIT THIS FILE MANUALLY

import {
  IconRegistryService,
  LoadingOverlayService,
  ModalController,
  TabsService,
  ToastController,
} from '@kirbydesign/designsystem';

export function iconRegistryServiceFactory() {
  return jasmine.createSpyObj('IconRegistryService', ['addIcon', 'addIcons']);
}

export function loadingOverlayServiceFactory() {
  return jasmine.createSpyObj('LoadingOverlayService', [
    'showLoadingOverlay',
    'hideLoadingOverlay',
  ]);
}

export function modalControllerFactory() {
  return jasmine.createSpyObj('ModalController', [
    'showModal',
    'navigateToModal',
    'navigateWithinModal',
    'showActionSheet',
    'showAlert',
    'registerPresentingElement',
    'hideTopmost',
    'scrollToTop',
    'scrollToBottom',
    'hideAll',
  ]);
}

export function tabsServiceFactory() {
  return jasmine.createSpyObj('TabsService', ['setOutlet']);
}

export function toastControllerFactory() {
  return jasmine.createSpyObj('ToastController', ['showToast']);
}

export const MOCK_PROVIDERS = [
  {
    provide: IconRegistryService,
    useFactory: iconRegistryServiceFactory,
  },
  {
    provide: LoadingOverlayService,
    useFactory: loadingOverlayServiceFactory,
  },
  {
    provide: ModalController,
    useFactory: modalControllerFactory,
  },
  {
    provide: TabsService,
    useFactory: tabsServiceFactory,
  },
  {
    provide: ToastController,
    useFactory: toastControllerFactory,
  },
];
