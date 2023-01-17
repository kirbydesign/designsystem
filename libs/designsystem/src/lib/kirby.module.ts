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
import { AccordionItemComponent } from './components/accordion/accordion-item.component';
import { AccordionDirective } from './components/accordion/accordion.directive';
import { AppModule } from './components/app/app.module';
import { AvatarComponent } from './components/avatar/avatar.component';
import { ButtonComponent } from './components/button/button.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ChartsModule } from './components/charts';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { DataTableModule } from './components/data-table/data-table.module';
import { DividerComponent } from './components/divider/divider.component';
import { FabSheetComponent } from './components/fab-sheet/fab-sheet.component';
import { DateInputDirective } from './components/form-field/directives/date/date-input.directive';
import { DecimalMaskDirective } from './components/form-field/directives/decimal-mask/decimal-mask.directive';
import { AffixDirective } from './components/form-field/directives/affix/affix.directive';

import { InputComponent } from './components/form-field/input/input.component';
import { TextareaComponent } from './components/form-field/textarea/textarea.component';
import { BreakpointHelperService } from './components/grid/breakpoint-helper.service';
import { GridComponent } from './components/grid/grid.component';
import { ItemGroupComponent } from './components/item-group/item-group.component';
import { ItemSlidingComponent } from './components/item-sliding/item-sliding.component';
import { ListModule } from './components/list/list.module';
import { LoadingOverlayComponent } from './components/loading-overlay/loading-overlay.component';
import { LoadingOverlayService } from './components/loading-overlay/loading-overlay.service';
import { ActionSheetComponent } from './components/modal/action-sheet/action-sheet.component';
import { AlertComponent } from './components/modal/alert/alert.component';
import { ModalFooterComponent } from './components/modal/footer/modal-footer.component';
import { ModalCompactWrapperComponent } from './components/modal/modal-wrapper/compact/modal-compact-wrapper.component';
import { ModalWrapperComponent } from './components/modal/modal-wrapper/modal-wrapper.component';
import { ActionSheetHelper } from './components/modal/services/action-sheet.helper';
import { AlertHelper } from './components/modal/services/alert.helper';
import { ModalController } from './components/modal/services/modal.controller';
import { ModalHelper } from './components/modal/services/modal.helper';
import { PageModule } from './components/page/page.module';
import { ProgressCircleRingComponent } from './components/progress-circle/progress-circle-ring.component';
import { ProgressCircleComponent } from './components/progress-circle/progress-circle.component';
import { ReorderListComponent } from './components/reorder-list/reorder-list.component';
import { RouterOutletModule } from './components/router-outlet/router-outlet.module';
import { SegmentedControlComponent } from './components/segmented-control/segmented-control.component';
import { ToastController } from './components/toast/services/toast.controller';
import { ToastHelper } from './components/toast/services/toast.helper';
import { customElementsInitializer } from './custom-elements-initializer';
import { KeyHandlerDirective } from './directives/key-handler/key-handler.directive';
import { ModalRouterLinkDirective } from './directives/modal-router-link/modal-router-link.directive';
import { ThemeColorDirective } from './directives/theme-color/theme-color.directive';
import { RadioModule } from './components';
import { EmptyStateModule } from './components/empty-state/empty-state.module';
import { DropdownModule } from './components/dropdown';
import { KirbyBadgeModule } from './components/kirby-badge.module';
import { FormFieldModule } from './components/form-field/form-field.module';

const exportedDeclarations = [
  GridComponent,
  ModalRouterLinkDirective,
  DateInputDirective,
  DecimalMaskDirective,
  AffixDirective,
  InputComponent,
  TextareaComponent,
  DividerComponent,

  ItemGroupComponent,
];

const declarations = [...exportedDeclarations, KeyHandlerDirective, ModalCompactWrapperComponent];

const standaloneComponents = [
  ThemeColorDirective,
  SegmentedControlComponent,
  AlertComponent,
  ThemeColorDirective,
  PopoverComponent,
  ProgressCircleRingComponent,
  ModalWrapperComponent,
  SectionHeaderComponent,
  RangeComponent,
  ItemSlidingComponent,
  AccordionItemComponent,
  AccordionDirective,
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
