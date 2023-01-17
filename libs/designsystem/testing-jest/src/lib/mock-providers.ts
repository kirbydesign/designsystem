// AUTO-GENERATED - PLEASE DON'T EDIT THIS FILE MANUALLY

import {
  ChartConfigService,
  ChartJSService,
  IconRegistryService,
  LoadingOverlayService,
  ModalController,
  TabsService,
  ToastController,
} from '@kirbydesign/designsystem';
import { EMPTY } from 'rxjs';

export function chartConfigServiceFactory() {
  return {
    getTypeConfig: jest.fn(),
    getAnnotationDefaults: jest.fn(),
    chartTypeToChartJSType: jest.fn(),
    applyInteractionFunctionsExtensions: jest.fn(),
    getStockChartOptions: jest.fn(),
  };
}

export function chartJSServiceFactory() {
  return {
    renderChart: jest.fn(),
    redrawChart: jest.fn(),
    destroyChart: jest.fn(),
    updateData: jest.fn(),
    updateLabels: jest.fn(),
    updateType: jest.fn(),
    updateOptions: jest.fn(),
    updateAnnotations: jest.fn(),
    updateHighlightedElements: jest.fn(),
  };
}

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
    resetOutlet: jest.fn(),
    outlet$: EMPTY,
  };
}

export function toastControllerFactory() {
  return {
    showToast: jest.fn(),
  };
}

export const MOCK_PROVIDERS = [
  {
    provide: ChartConfigService,
    useFactory: chartConfigServiceFactory,
  },
  {
    provide: ChartJSService,
    useFactory: chartJSServiceFactory,
  },
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
