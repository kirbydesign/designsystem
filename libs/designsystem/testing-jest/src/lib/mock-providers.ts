// AUTO-GENERATED - PLEASE DON'T EDIT THIS FILE MANUALLY

import {
  IconRegistryService,
  LoadingOverlayService,
  ModalController,
  TabsService,
  ToastController,
} from '@kirbydesign/designsystem';

export function iconRegistryServiceFactory() {
  return {
    addIcon: jest.fn(),
    addIcons: jest.fn(),
  };
}

export function loadingOverlayServiceFactory() {
  return {
    showLoadingOverlay: jest.fn(),
    hideLoadingOverlay: jest.fn(),
  };
}

export function modalControllerFactory() {
  return {
    showModal: jest.fn(),
    navigateToModal: jest.fn(),
    navigateWithinModal: jest.fn(),
    showActionSheet: jest.fn(),
    showAlert: jest.fn(),
    registerPresentingElement: jest.fn(),
    hideTopmost: jest.fn(),
    scrollToTop: jest.fn(),
    scrollToBottom: jest.fn(),
    hideAll: jest.fn(),
  };
}

export function tabsServiceFactory() {
  return {
    setOutlet: jest.fn(),
  };
}

export function toastControllerFactory() {
  return {
    showToast: jest.fn(),
  };
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
