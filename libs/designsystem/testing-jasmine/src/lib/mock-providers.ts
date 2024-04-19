// AUTO-GENERATED - PLEASE DON'T EDIT THIS FILE MANUALLY

import {
  AlertExperimentalController,
  ChartConfigService,
  ChartJSService,
  IconRegistryService,
  LoadingOverlayService,
  ModalController,
  ModalV2Controller,
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
  ]);
}

export function modalV2ControllerFactory() {
  return jasmine.createSpyObj<ModalV2Controller>('ModalV2Controller', ['showModal', 'closeModal']);
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
    provide: ModalV2Controller,
    useFactory: modalV2ControllerFactory,
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
