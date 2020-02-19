/// <reference path="../../../../../node_modules/@types/jasmine/index.d.ts" />

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonListHeader,
} from '@ionic/angular';
import { MockComponents, MockDirectives } from 'ng-mocks';

import {
  ActionSheetComponent,
  AppComponent,
  AvatarComponent,
  BadgeComponent,
  ButtonComponent,
  CalendarComponent,
  CardComponent,
  CardFooterComponent,
  CardHeaderComponent,
  ChartComponent,
  CheckboxComponent,
  ChipComponent,
  DividerComponent,
  EmptyStateComponent,
  FabSheetComponent,
  FormFieldComponent,
  FormFieldMessageComponent,
  GridComponent,
  IconComponent,
  InfiniteScrollDirective,
  InputComponent,
  ItemComponent,
  LabelComponent,
  ListCellComponent,
  ListCellLineComponent,
  ListComponent,
  ListFlexItemComponent,
  ListFlexItemDirective,
  ListHeaderComponent,
  ListHeaderDirective,
  ListItemColorDirective,
  ListItemComponent,
  ListItemDirective,
  ListSectionHeaderComponent,
  ListSectionHeaderDirective,
  LoadingOverlayComponent,
  LoadingOverlayService,
  ModalController,
  PageActionsComponent,
  PageActionsDirective,
  PageComponent,
  PageContentComponent,
  PageContentDirective,
  PageTitleDirective,
  PageToolbarTitleDirective,
  RouterOutletComponent,
  SegmentedControlComponent,
  SlideButtonComponent,
  SpinnerComponent,
  TabButtonComponent,
  TabsComponent,
  TextareaComponent,
  ToastController,
  ToolbarComponent,
} from '../components';
import { FitHeadingDirective, ThemeColorDirective } from '../directives';

const MOCK_COMPONENTS = MockComponents(
  AvatarComponent,
  BadgeComponent,
  ButtonComponent,
  CalendarComponent,
  CardComponent,
  CardHeaderComponent,
  CardFooterComponent,
  CheckboxComponent,
  ChipComponent,
  DividerComponent,
  EmptyStateComponent,
  GridComponent,
  IconComponent,
  SpinnerComponent,
  SegmentedControlComponent,
  EmptyStateComponent,
  SlideButtonComponent,
  ToolbarComponent,
  FormFieldComponent,
  FormFieldMessageComponent,
  InputComponent,
  TextareaComponent,
  IonList,
  IonListHeader,
  IonItemDivider,
  IonItem,
  IonItemGroup,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonLabel,
  LoadingOverlayComponent,
  TabsComponent,
  TabButtonComponent,
  PageComponent,
  PageActionsComponent,
  PageContentComponent,
  ActionSheetComponent,
  FabSheetComponent,
  RouterOutletComponent,
  AppComponent,
  ItemComponent,
  LabelComponent,
  ChartComponent
);

/**
 * Since it's very difficult (I can't seem to find a way) of mocked structural directives,
 * I'm leaving a couple of components as being "not mocked".
 */
const NON_MOCKED_COMPONENTS = [
  ListComponent,
  ListCellComponent,
  ListItemComponent,
  ListItemDirective,
  ListFlexItemDirective,
  ListCellLineComponent,
  ListFlexItemComponent,
  ListHeaderComponent,
  ListHeaderDirective,
  ListSectionHeaderComponent,
  ListSectionHeaderDirective,
];

const MOCK_DIRECTIVES = MockDirectives(
  InfiniteScrollDirective,
  ThemeColorDirective,
  ListItemColorDirective,
  PageTitleDirective,
  PageToolbarTitleDirective,
  PageActionsDirective,
  PageContentDirective,
  FitHeadingDirective
);

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
  imports: [CommonModule],
  declarations: [MOCK_COMPONENTS, MOCK_DIRECTIVES, NON_MOCKED_COMPONENTS],
  exports: [MOCK_COMPONENTS, MOCK_DIRECTIVES, NON_MOCKED_COMPONENTS],
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
