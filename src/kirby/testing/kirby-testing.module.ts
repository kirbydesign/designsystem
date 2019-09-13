import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { MockComponents, MockDirectives } from 'ng-mocks';

import {
  AvatarComponent,
  BadgeComponent,
  ButtonComponent,
  CardComponent,
  CardFooterComponent,
  CardHeaderComponent,
  ChipComponent,
  EmptyStateComponent,
  GridComponent,
  IconComponent,
  SegmentedControlComponent,
  SpinnerComponent,
} from '@kirbydesign/designsystem';
import { ListItemColorDirective } from '@kirbydesign/designsystem/components/list/directives/list-item-color.directive';
import { SlideButtonComponent } from '@kirbydesign/designsystem/components/slide-button/slide-button.component';
import { ToastController } from '@kirbydesign/designsystem/components/toast/services/toast.controller';
import { ToolbarComponent } from '@kirbydesign/designsystem/components/toolbar/toolbar.component';
import { ThemeColorDirective } from '@kirbydesign/designsystem/directives/theme-color/theme-color.directive';
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
} from '@kirbydesign/designsystem/list';
import createSpyObj = jasmine.createSpyObj;
import { ModalController } from '../modal';

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
  CardComponent,
  CardHeaderComponent,
  CardFooterComponent,
  ChipComponent,
  EmptyStateComponent,
  GridComponent,
  IconComponent,
  SpinnerComponent,
  SegmentedControlComponent,
  EmptyStateComponent,
  SlideButtonComponent,
  FakeIonListComponent,
  FakeIonListHeaderComponent,
  FakeIonItemDividerComponent,
  FakeIonItemComponent,
  FakeIonItemGroupComponent,
  FakeIonItemSlidingComponent,
  FakeIonItemOptionsComponent,
  FakeIonItemOptionComponent,
  FakeIonLabelComponent,
  ToolbarComponent
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

const MOCK_DIRECTIVES = MockDirectives(InfiniteScrollDirective, ThemeColorDirective, ListItemColorDirective);

@NgModule({
  imports: [CommonModule],
  declarations: [NON_MOCKED_COMPONENTS, MOCK_COMPONENTS, MOCK_DIRECTIVES],
  exports: [NON_MOCKED_COMPONENTS, MOCK_COMPONENTS, MOCK_DIRECTIVES],
  providers: [
    {
      provide: ModalController,
      useValue: createSpyObj('ModalController', [
        'showModal',
        'showActionSheet',
        'showAlert',
        'register',
        'hideTopmost',
      ]),
    },
    {
      provide: ToastController,
      useValue: createSpyObj('ToastController', ['showToast']),
    },
  ],
})
export class KirbyTestingModule {}
