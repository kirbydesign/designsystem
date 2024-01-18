import { CommonModule } from '@angular/common';
import { Inject, InjectionToken, ModuleWithProviders, NgModule, Optional } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CardModule } from '@kirbydesign/designsystem/card';
import { IconModule } from '@kirbydesign/designsystem/icon';
import { IONIC_CONFIG } from '@kirbydesign/designsystem/kirby-ionic-module';
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
  CanDismissHelper,
  ModalCompactWrapperComponent,
  ModalController,
  ModalFooterComponent,
  ModalHelper,
  ModalWrapperComponent,
} from '@kirbydesign/designsystem/modal';
import { KirbyModalModule } from '@kirbydesign/designsystem/modal/v2';
import { PageModule } from '@kirbydesign/designsystem/page';
import { HeaderModule } from '@kirbydesign/designsystem/header';
import { EmptyStateModule } from '@kirbydesign/designsystem/empty-state';
import { DropdownModule } from '@kirbydesign/designsystem/dropdown';
import { KirbyAppModule } from '@kirbydesign/designsystem/kirby-app';
import { ChartsModule } from '@kirbydesign/designsystem/chart';
import { FabSheetComponent } from '@kirbydesign/designsystem/fab-sheet';
import { DataTableModule } from '@kirbydesign/designsystem/data-table';
import { ReorderListComponent } from '@kirbydesign/designsystem/reorder-list';

import { ToastController, ToastHelper } from '@kirbydesign/designsystem/toast';
import { ActionGroupComponent } from '@kirbydesign/designsystem/action-group';
import { MenuComponent } from '@kirbydesign/designsystem/menu';
import { TabNavigationModule } from '@kirbydesign/designsystem/tab-navigation';
import { BadgeComponent } from '@kirbydesign/designsystem/badge';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { SegmentedControlComponent } from './components/segmented-control/segmented-control.component';
import { KeyHandlerDirective } from './directives/key-handler/key-handler.directive';
import { ModalRouterLinkDirective } from './directives/modal-router-link/modal-router-link.directive';

const exportedDeclarations = [ModalRouterLinkDirective];

const declarations = [...exportedDeclarations, KeyHandlerDirective];

const standaloneComponents = [
  ActionGroupComponent,
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
  MenuComponent,
  ActionSheetComponent,
  ModalFooterComponent,
  AvatarComponent,
  CalendarComponent,
  ButtonComponent,
  ComponentLoaderDirective,
  FlagComponent,
  BadgeComponent,
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
  DataTableModule,
  CardModule,
  RadioModule,
  EmptyStateModule,
  DropdownModule,
  FormFieldModule,
  SlideModule,
  AccordionModule,
  HeaderModule,
  KirbyModalModule,
  ...standaloneComponents,
];

const allExports = [...exportedModules, ...exportedDeclarations];

const importedModules = [...exportedModules];

const providers = [
  provideIonicAngular(IONIC_CONFIG),
  ModalController,
  ActionSheetHelper,
  ModalHelper,
  AlertHelper,
  ToastHelper,
  ToastController,
  LoadingOverlayService,
  ResizeObserverFactory,
  ResizeObserverService,
  CanDismissHelper,
];

const ConfigToken = new InjectionToken<unknown>('USERCONFIG');
export interface KirbyConfig {
  moduleRootRoutePath?: string;
}

@NgModule({
  imports: [CommonModule, RouterModule, ...importedModules],
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
