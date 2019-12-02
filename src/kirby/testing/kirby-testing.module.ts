import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  IonList,
  IonListHeader,
  IonItemDivider,
  IonItem,
  IonItemGroup,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonLabel,
} from '@ionic/angular';
import { MockComponents, MockDirectives } from 'ng-mocks';
import createSpyObj = jasmine.createSpyObj;

import {
  InfiniteScrollDirective,
  ListCellComponent,
  ListCellLineComponent,
  ListComponent,
  ListFlexItemComponent,
  ListFlexItemDirective,
  ListHeaderComponent,
  ListHeaderDirective,
  ListItemComponent,
  ListItemDirective,
  ListSectionHeaderComponent,
  ListSectionHeaderDirective,
} from '../list';
import { ModalController } from '../modal';
import {
  AvatarComponent,
  BadgeComponent,
  ButtonComponent,
  CardComponent,
  CardHeaderComponent,
  CardFooterComponent,
  ChipComponent,
  DividerComponent,
  EmptyStateComponent,
  GridComponent,
  SpinnerComponent,
  SegmentedControlComponent,
  ToastController,
  FabSheetComponent,
} from '..';
import { SlideButtonComponent } from '../components/slide-button/slide-button.component';
import { ToolbarComponent } from '../components/toolbar/toolbar.component';
import { ThemeColorDirective } from '../directives/theme-color/theme-color.directive';
import { ListItemColorDirective } from '../components/list/directives/list-item-color.directive';
import { LoadingOverlayComponent } from '../components/loading-overlay/loading-overlay.component';
import { LoadingOverlayService } from '../components/loading-overlay/fullscreen-loading-overlay/loading-overlay.service';
import { FormFieldComponent } from '../components/form-field/form-field.component';
import { FormFieldMessageComponent } from '../components/form-field/form-field-message/form-field-message.component';
import { InputComponent } from '../components/form-field/input/input.component';
import { TextareaComponent } from '../components/form-field/textarea/textarea.component';
import { IconComponent } from '../components/icon/icon.component';
import { TabsComponent } from '../components/tabs/tabs.component';
import { TabButtonComponent } from '../components/tabs/tab-button/tab-button.component';
import {
  PageComponent,
  PageActionsComponent,
  PageContentComponent,
  PageTitleDirective,
  PageToolbarTitleDirective,
  PageActionsDirective,
  PageContentDirective,
} from '../components/page/page.component';
import { ActionSheetComponent } from '@kirbydesign/designsystem/components/modal/action-sheet/action-sheet.component';
import { RouterOutletComponent } from '@kirbydesign/designsystem/components/router-outlet/router-outlet.component';
import { AppComponent } from '@kirbydesign/designsystem/components/app/app.component';
import { CalendarComponent } from '@kirbydesign/designsystem/components/calendar/calendar.component';
import { ItemComponent } from '../components/item/item.component';
import { LabelComponent } from '../components/item/label/label.component';

const MOCK_COMPONENTS = MockComponents(
  AvatarComponent,
  BadgeComponent,
  ButtonComponent,
  CalendarComponent,
  CardComponent,
  CardHeaderComponent,
  CardFooterComponent,
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
  LabelComponent
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
  PageContentDirective
);

function modalControllerFactory() {
  return createSpyObj('ModalController', [
    'showModal',
    'showActionSheet',
    'showAlert',
    'register',
    'hideTopmost',
  ]);
}

function toastControllerFactory() {
  return createSpyObj('ToastController', ['showToast']);
}

function loadingOverlayServiceFactory() {
  return createSpyObj<LoadingOverlayService>('LoadingOverlayService', [
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
