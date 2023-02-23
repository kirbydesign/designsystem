// AUTO-GENERATED - PLEASE DON'T EDIT THIS FILE MANUALLY

import {
  AlertExperimentalController,
  ChartConfigService,
  ChartJSService,
  LoadingOverlayService,
  ModalController,
  ModalExperimentalController,
  TabsService,
  ToastController,
} from '@kirbydesign/designsystem';
import { EMPTY } from 'rxjs';

export function alertExperimentalControllerFactory() {
  return {
    showAlert: jest.fn(),
  };
}

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

export function loadingOverlayServiceFactory() {
  return {
    showLoadingOverlay: jest.fn(),
    hideLoadingOverlay: jest.fn(),
  };
}

export function modalExperimentalControllerFactory() {
  return {
    showModal: jest.fn(),
    closeModal: jest.fn(),
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
    provide: AlertExperimentalController,
    useFactory: alertExperimentalControllerFactory,
  },
  {
    provide: ChartConfigService,
    useFactory: chartConfigServiceFactory,
  },
  {
    provide: ChartJSService,
    useFactory: chartJSServiceFactory,
  },
  {
    provide: LoadingOverlayService,
    useFactory: loadingOverlayServiceFactory,
  },
  {
    provide: ModalExperimentalController,
    useFactory: modalExperimentalControllerFactory,
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
