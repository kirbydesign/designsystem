import { CommonModule } from '@angular/common';
import { Inject, InjectionToken, ModuleWithProviders, NgModule, Optional } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CardModule } from '@kirbydesign/designsystem/card';
import { IconModule } from '@kirbydesign/designsystem/icon';
import { KirbyIonicModule } from '@kirbydesign/designsystem/kirby-ionic-module';
import {
  ComponentLoaderDirective,
  ResizeObserverFactory,
  ResizeObserverService,
  ThemeColorDirective,
} from '@kirbydesign/designsystem/shared';
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
import {
  LoadingOverlayComponent,
  LoadingOverlayService,
} from '@kirbydesign/designsystem/loading-overlay';
import { DividerComponent } from '@kirbydesign/designsystem/divider';
import { CheckboxComponent } from '@kirbydesign/designsystem/checkbox';
import { AccordionModule } from '@kirbydesign/designsystem/accordion';
import { ItemSlidingComponent } from '@kirbydesign/designsystem/item-sliding';
import { ListModule } from '@kirbydesign/designsystem/list';
import { RadioModule } from '@kirbydesign/designsystem/radio';
import {
  AffixDirective,
  DateInputDirective,
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
  ActionSheetHelper,
  AlertComponent,
  AlertHelper,
  ModalController,
  ModalFooterComponent,
  ModalHelper,
} from '@kirbydesign/designsystem/modal';
import {
  ModalCompactWrapperComponent,
  ModalWrapperComponent,
} from '@kirbydesign/designsystem/modal';
import { PageModule } from '@kirbydesign/designsystem/page';
import { EmptyStateModule } from '@kirbydesign/designsystem/empty-state';
import { DropdownModule } from '@kirbydesign/designsystem/dropdown';

import { KirbyModalModule } from '@kirbydesign/designsystem/modal/experimental';

import { AppModule } from '@kirbydesign/designsystem/kirby-app';

import { ChartsModule } from './components/charts';
import { DataTableModule } from './components/data-table/data-table.module';
import { FabSheetComponent } from './components/fab-sheet/fab-sheet.component';

import { BreakpointHelperService } from './components/grid/breakpoint-helper.service';
import { GridComponent } from './components/grid/grid.component';

import { ReorderListComponent } from './components/reorder-list/reorder-list.component';
import { SegmentedControlComponent } from './components/segmented-control/segmented-control.component';
import { ToastController } from './components/toast/services/toast.controller';
import { ToastHelper } from './components/toast/services/toast.helper';
import { customElementsInitializer } from './custom-elements-initializer';
import { KeyHandlerDirective } from './directives/key-handler/key-handler.directive';
import { ModalRouterLinkDirective } from './directives/modal-router-link/modal-router-link.directive';
import { KirbyBadgeModule } from './components/kirby-badge.module';

const exportedDeclarations = [GridComponent, ModalRouterLinkDirective];

const declarations = [...exportedDeclarations, KeyHandlerDirective];

const standaloneComponents = [
  ItemGroupComponent,
  ModalCompactWrapperComponent,
  TextareaComponent,
  InputComponent,
  AffixDirective,
  DateInputDirective,
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
  ActionSheetComponent,
  ModalFooterComponent,
  AvatarComponent,
  CalendarComponent,
  ButtonComponent,
  ComponentLoaderDirective,
  FlagComponent,
];
const exportedModules = [
  AppModule,
  RouterOutletModule,
  PageModule,
  TabsModule,
  IconModule,
  ItemModule,
  ToggleButtonModule,
  ListModule,
  ChartsModule,
  SpinnerModule,
  DataTableModule,
  CardModule,
  RadioModule,
  EmptyStateModule,
  DropdownModule,
  KirbyBadgeModule,
  FormFieldModule,
  SlideModule,
  AccordionModule,
  KirbyModalModule,
  ...standaloneComponents,
];

const allExports = [...exportedModules, ...exportedDeclarations];

const importedModules = [...exportedModules];

const providers = [
  ModalController,
  ActionSheetHelper,
  ModalHelper,
  AlertHelper,
  ToastHelper,
  ToastController,
  BreakpointHelperService,
  LoadingOverlayService,
  ResizeObserverFactory,
  ResizeObserverService,
  customElementsInitializer(),
];

const ConfigToken = new InjectionToken<any>('USERCONFIG');
export interface KirbyConfig {
  moduleRootRoutePath?: string;
}

@NgModule({
  imports: [CommonModule, RouterModule, KirbyIonicModule, ...importedModules],
  declarations: [declarations],
  providers: providers,
  exports: [allExports],
})
export class KirbyModule {
  static forChild(config?: KirbyConfig): ModuleWithProviders<KirbyModule> {
    return {
      ngModule: KirbyModule,
      providers: [
        {
          provide: ConfigToken,
          useValue: config,
        },
      ],
    };
  }

  constructor(
    modalController: ModalController,
    @Optional() @Inject(ConfigToken) config?: KirbyConfig
  ) {
    modalController.initialize(config && config.moduleRootRoutePath);
  }
}
