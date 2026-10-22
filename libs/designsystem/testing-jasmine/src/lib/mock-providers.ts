// AUTO-GENERATED - PLEASE DON'T EDIT THIS FILE MANUALLY

import { EMPTY } from 'rxjs';

import { ChartConfigService, ChartJSService } from '@kirbydesign/designsystem/chart';
import { IconRegistryService } from '@kirbydesign/designsystem/icon';
import { LoadingOverlayService } from '@kirbydesign/designsystem/loading-overlay';
import { ModalController } from '@kirbydesign/designsystem/modal';
import { TabsService } from '@kirbydesign/designsystem/tabs';
import { ToastController } from '@kirbydesign/designsystem/toast';

export function chartConfigServiceFactory() {
  return jasmine.createSpyObj<ChartConfigService>('ChartConfigService', [
    'getTypeConfig',
    'getAnnotationDefaults',
    'chartTypeToChartJSType',
    'applyInteractionFunctionsExtensions',
    'getStockChartOptions',
  ]);
}

export function chartJSServiceFactory() {
  return jasmine.createSpyObj<ChartJSService>('ChartJSService', [
    'renderChart',
    'redrawChart',
    'destroyChart',
    'updateData',
    'updateLabels',
    'updateType',
    'updateOptions',
    'updateAnnotations',
    'updateHighlightedElements',
  ]);
}

export function iconRegistryServiceFactory() {
  return jasmine.createSpyObj<IconRegistryService>('IconRegistryService', ['addIcon', 'addIcons']);
}

export function loadingOverlayServiceFactory() {
  return jasmine.createSpyObj<LoadingOverlayService>('LoadingOverlayService', [
    'showLoadingOverlay',
    'hideLoadingOverlay',
  ]);
}

export function modalControllerFactory() {
  return jasmine.createSpyObj<ModalController>('ModalController', [
    'showModal',
    'navigateToModal',
    'navigateWithinModal',
    'showActionSheet',
    'showAlert',
    'hideTopmost',
    'hideAll',
    'getTopMost',
  ]);
}

export function tabsServiceFactory() {
  return jasmine.createSpyObj<TabsService>('TabsService', ['setOutlet', 'resetOutlet'], {
    outlet$: EMPTY,
  });
}

export function toastControllerFactory() {
  return jasmine.createSpyObj<ToastController>('ToastController', ['showToast']);
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
