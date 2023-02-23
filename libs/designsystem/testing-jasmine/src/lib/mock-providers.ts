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
  return jasmine.createSpyObj<AlertExperimentalController>('AlertExperimentalController', [
    'showAlert',
  ]);
}

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

export function loadingOverlayServiceFactory() {
  return jasmine.createSpyObj<LoadingOverlayService>('LoadingOverlayService', [
    'showLoadingOverlay',
    'hideLoadingOverlay',
  ]);
}

export function modalExperimentalControllerFactory() {
  return jasmine.createSpyObj<ModalExperimentalController>('ModalExperimentalController', [
    'showModal',
    'closeModal',
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
  return jasmine.createSpyObj<TabsService>('TabsService', ['setOutlet', 'resetOutlet'], {
    outlet$: EMPTY,
  });
}

export function toastControllerFactory() {
  return jasmine.createSpyObj<ToastController>('ToastController', ['showToast']);
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
