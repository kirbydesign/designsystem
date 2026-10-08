// AUTO-GENERATED - PLEASE DON'T EDIT THIS FILE MANUALLY

import { EMPTY } from 'rxjs';

import { ChartConfigService, ChartJSService } from '@kirbydesign/designsystem/chart';
import { IconRegistryService } from '@kirbydesign/designsystem/icon';
import { LoadingOverlayService } from '@kirbydesign/designsystem/loading-overlay';
import { ModalController } from '@kirbydesign/designsystem/modal';
import { TabsService } from '@kirbydesign/designsystem/tabs';
import { ToastController } from '@kirbydesign/designsystem/toast';

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
    hideTopmost: jest.fn(),
    hideAll: jest.fn(),
    getTopMost: jest.fn(),
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
