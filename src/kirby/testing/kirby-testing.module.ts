import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { MockComponents, MockDirectives, MockModule } from 'ng-mocks';
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

/*
 * Fake components should be handled by the list of kirby
 */
@Component({
  // tslint:disable
  selector: 'ion-list',
  template: '<ng-content></ng-content>',
})
class FakeIonListComponent {
  closeSlidingItems() {}
}

@Component({
  // tslint:disable
  selector: 'ion-list-header',
  template: '<ng-content></ng-content>',
})
class FakeIonListHeaderComponent {}

@Component({
  // tslint:disable
  selector: 'ion-item-divider',
  template: '<ng-content></ng-content>',
})
class FakeIonItemDividerComponent {}

@Component({
  // tslint:disable
  selector: 'ion-item',
  template: '<ng-content></ng-content>',
})
class FakeIonItemComponent {}

@Component({
  // tslint:disable
  selector: 'ion-item-group',
  template: '<ng-content></ng-content>',
})
class FakeIonItemGroupComponent {}

@Component({
  // tslint:disable
  selector: 'ion-item-sliding',
  template: '<ng-content></ng-content>',
})
class FakeIonItemSlidingComponent {}

@Component({
  // tslint:disable
  selector: 'ion-item-options',
  template: '<ng-content></ng-content>',
})
class FakeIonItemOptionsComponent {}

@Component({
  // tslint:disable
  selector: 'ion-item-option',
  template: '<ng-content></ng-content>',
})
class FakeIonItemOptionComponent {}

@Component({
  // tslint:disable
  selector: 'ion-label',
  template: '<ng-content></ng-content>',
})
class FakeIonLabelComponent {}

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
  FakeIonListComponent,
  FakeIonListHeaderComponent,
  FakeIonItemDividerComponent,
  FakeIonItemComponent,
  FakeIonItemGroupComponent,
  FakeIonItemSlidingComponent,
  FakeIonItemOptionsComponent,
  FakeIonItemOptionComponent,
  FakeIonLabelComponent,
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
  declarations: [NON_MOCKED_COMPONENTS, MOCK_COMPONENTS, MOCK_DIRECTIVES],
  exports: [NON_MOCKED_COMPONENTS, MOCK_COMPONENTS, MOCK_DIRECTIVES],
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
