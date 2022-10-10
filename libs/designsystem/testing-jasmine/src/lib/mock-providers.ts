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
    'registerPresentingElement',
    'hideTopmost',
    'scrollToTop',
    'scrollToBottom',
    'hideAll',
  ]);
}

export function tabsServiceFactory() {
  return jasmine.createSpyObj<TabsService>('TabsService', ['setOutlet'], { outlet$: EMPTY });
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
