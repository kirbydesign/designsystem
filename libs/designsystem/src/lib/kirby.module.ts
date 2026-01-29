import { CommonModule } from '@angular/common';
import { Inject, NgModule, Optional } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CardModule } from '@kirbydesign/designsystem/card';
import { IconModule } from '@kirbydesign/designsystem/icon';
import { KIRBY_CONFIG, KirbyConfig } from '@kirbydesign/designsystem/config';
import { ComponentLoaderDirective, ThemeColorDirective } from '@kirbydesign/designsystem/shared';
import { FlagComponent } from '@kirbydesign/designsystem/flag';
import { SpinnerModule } from '@kirbydesign/designsystem/spinner';
import { ToggleComponent } from '@kirbydesign/designsystem/toggle';
import { SectionHeaderComponent } from '@kirbydesign/designsystem/section-header';
import { ItemModule } from '@kirbydesign/designsystem/item';
import { SlideModule } from '@kirbydesign/designsystem/slide';
import { ToggleButtonModule } from '@kirbydesign/designsystem/toggle-button';
import { TabsModule } from '@kirbydesign/designsystem/tabs';
import { SlideButtonComponent } from '@kirbydesign/designsystem/slide-button';
import { RangeComponent } from '@kirbydesign/designsystem/range';
import { PopoverComponent } from '@kirbydesign/designsystem/popover';
import { LoadingOverlayComponent } from '@kirbydesign/designsystem/loading-overlay';
import { DividerComponent } from '@kirbydesign/designsystem/divider';
import { CheckboxComponent } from '@kirbydesign/designsystem/checkbox';
import { AccordionModule } from '@kirbydesign/designsystem/accordion';
import { ItemSlidingComponent } from '@kirbydesign/designsystem/item-sliding';
import { ListModule } from '@kirbydesign/designsystem/list';
import { RadioModule } from '@kirbydesign/designsystem/radio';
import {
  AffixDirective,
  FormFieldModule,
  InputComponent,
  TextareaComponent,
} from '@kirbydesign/designsystem/form-field';
import { AvatarComponent } from '@kirbydesign/designsystem/avatar';
import {
  ProgressCircleComponent,
  ProgressCircleRingComponent,
} from '@kirbydesign/designsystem/progress-circle';
import { RouterOutletModule } from '@kirbydesign/designsystem/router-outlet';

import { ItemGroupComponent } from '@kirbydesign/designsystem/item-group';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { CalendarComponent } from '@kirbydesign/designsystem/calendar';
import {
  ActionSheetComponent,
  AlertComponent,
  ModalCompactWrapperComponent,
  ModalController,
  ModalFooterComponent,
  ModalWrapperComponent,
} from '@kirbydesign/designsystem/modal';
import { ModalComponent } from '@kirbydesign/designsystem/modal';
import { PageModule } from '@kirbydesign/designsystem/page';
import { HeaderModule } from '@kirbydesign/designsystem/header';
import { EmptyStateModule } from '@kirbydesign/designsystem/empty-state';
import { DropdownModule } from '@kirbydesign/designsystem/dropdown';
import { KirbyAppModule } from '@kirbydesign/designsystem/kirby-app';
import { ChartsModule } from '@kirbydesign/designsystem/chart';
import { FabSheetComponent } from '@kirbydesign/designsystem/fab-sheet';
import { TableSortableComponent } from '@kirbydesign/designsystem/data-table';
import { ReorderListComponent } from '@kirbydesign/designsystem/reorder-list';

import { ActionGroupComponent } from '@kirbydesign/designsystem/action-group';
import { MenuComponent } from '@kirbydesign/designsystem/menu';
import { TabNavigationModule } from '@kirbydesign/designsystem/tab-navigation';
import { BadgeComponent } from '@kirbydesign/designsystem/badge';

import { provideKirby } from '@kirbydesign/designsystem/config';
import { SegmentedControlComponent } from '@kirbydesign/designsystem/segmented-control';
import { KeyHandlerDirective } from './directives/key-handler/key-handler.directive';
import { ModalRouterLinkDirective } from './directives/modal-router-link/modal-router-link.directive';

const reexportedImports = [ModalRouterLinkDirective];

const imports = [...reexportedImports, KeyHandlerDirective];

const standaloneComponents = [
  ActionGroupComponent,
  ItemGroupComponent,
  ModalCompactWrapperComponent,
  TextareaComponent,
  InputComponent,
  AffixDirective,
  DividerComponent,
  ThemeColorDirective,
  SegmentedControlComponent,
  AlertComponent,
  PopoverComponent,
  ProgressCircleRingComponent,
  ModalWrapperComponent,
  SectionHeaderComponent,
  RangeComponent,
  ItemSlidingComponent,
  ProgressCircleComponent,
  ReorderListComponent,
  LoadingOverlayComponent,
  FabSheetComponent,
  ToggleComponent,
  SlideButtonComponent,
  SegmentedControlComponent,
  CheckboxComponent,
  MenuComponent,
  ActionSheetComponent,
  ModalFooterComponent,
  AvatarComponent,
  CalendarComponent,
  ButtonComponent,
  ComponentLoaderDirective,
  FlagComponent,
  BadgeComponent,
  ModalComponent,
  TableSortableComponent,
];
const exportedModules = [
  KirbyAppModule,
  RouterOutletModule,
  PageModule,
  HeaderModule,
  TabNavigationModule,
  TabsModule,
  IconModule,
  ItemModule,
  ToggleButtonModule,
  ListModule,
  ChartsModule,
  SpinnerModule,
  CardModule,
  RadioModule,
  EmptyStateModule,
  DropdownModule,
  FormFieldModule,
  SlideModule,
  AccordionModule,
  HeaderModule,
  ...standaloneComponents,
];

const allExports = [...exportedModules, ...reexportedImports];

const importedModules = [...exportedModules];

@NgModule({
  imports: [CommonModule, RouterModule, ...importedModules, imports],
  providers: [provideKirby()],
  exports: [allExports],
})
export class KirbyModule {
  constructor(
    modalController: ModalController,
    @Optional() @Inject(KIRBY_CONFIG) config?: KirbyConfig
  ) {
    modalController.initialize(config && config.moduleRootRoutePath);
  }
}
