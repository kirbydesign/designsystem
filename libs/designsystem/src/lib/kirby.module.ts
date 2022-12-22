import { CommonModule } from '@angular/common';
import { Inject, InjectionToken, ModuleWithProviders, NgModule, Optional } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { CardFooterComponent } from '../../card/src/card-footer/card-footer.component';
import { CardHeaderComponent } from '../../card/card-header/card-header.component';
import { CardComponent } from '../../card/card.component';
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
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { EmptyStateComponent } from './components/empty-state/empty-state.component';
import { FabSheetComponent } from './components/fab-sheet/fab-sheet.component';
import { FlagComponent } from './components/flag/flag.component';
import { DateInputDirective } from './components/form-field/directives/date/date-input.directive';
import { DecimalMaskDirective } from './components/form-field/directives/decimal-mask/decimal-mask.directive';
import { AffixDirective } from './components/form-field/directives/affix/affix.directive';
import { FormFieldMessageComponent } from './components/form-field/form-field-message/form-field-message.component';
import { FormFieldComponent } from './components/form-field/form-field.component';
import { InputCounterComponent } from './components/form-field/input-counter/input-counter.component';
import { InputComponent } from './components/form-field/input/input.component';
import { TextareaComponent } from './components/form-field/textarea/textarea.component';
import { BreakpointHelperService } from './components/grid/breakpoint-helper.service';
import { GridComponent } from './components/grid/grid.component';
import { IconModule } from './components/icon/icon.module';
import { ItemGroupComponent } from './components/item-group/item-group.component';
import { ItemSlidingComponent } from './components/item-sliding/item-sliding.component';
import { ItemModule } from './components/item/item.module';
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
import { PopoverComponent } from './components/popover/popover.component';
import { ProgressCircleRingComponent } from './components/progress-circle/progress-circle-ring.component';
import { ProgressCircleComponent } from './components/progress-circle/progress-circle.component';
import { RadioGroupComponent } from './components/radio/radio-group/radio-group.component';
import { RadioComponent } from './components/radio/radio.component';
import { RangeComponent } from './components/range/range.component';
import { ReorderListComponent } from './components/reorder-list/reorder-list.component';
import { RouterOutletModule } from './components/router-outlet/router-outlet.module';
import { SectionHeaderComponent } from './components/section-header/section-header.component';
import { SegmentedControlComponent } from './components/segmented-control/segmented-control.component';
import { ComponentLoaderDirective } from './components/shared/component-loader.directive';
import { ResizeObserverFactory } from './components/shared/resize-observer/resize-observer.factory';
import { ResizeObserverService } from './components/shared/resize-observer/resize-observer.service';
import { SlideButtonComponent } from './components/slide-button/slide-button.component';
import { SlideDirective, SlidesComponent } from './components/slides/slides.component';
import { SpinnerModule } from './components/spinner/spinner.module';
import { TabsModule } from './components/tabs/tabs.module';
import { ToastController } from './components/toast/services/toast.controller';
import { ToastHelper } from './components/toast/services/toast.helper';
import { ToggleButtonModule } from './components/toggle-button/toggle-button.module';
import { ToggleComponent } from './components/toggle/toggle.component';
import { KirbyBadge as BadgeComponent } from './components/web-component-proxies.component';
import { customElementsInitializer } from './custom-elements-initializer';
import { ElementAsButtonDirective } from './directives/element-as-button/element-as-button.directive';
import { KeyHandlerDirective } from './directives/key-handler/key-handler.directive';
import { ModalRouterLinkDirective } from './directives/modal-router-link/modal-router-link.directive';
import { ThemeColorDirective } from './directives/theme-color/theme-color.directive';

const exportedDeclarations = [
  CardComponent,
  CardHeaderComponent,
  CardFooterComponent,
  ButtonComponent,
  GridComponent,
  ComponentLoaderDirective,
  AvatarComponent,
  CalendarComponent,
  CheckboxComponent,
  ActionSheetComponent,
  ModalFooterComponent,
  ModalRouterLinkDirective,
  SegmentedControlComponent,
  BadgeComponent,
  ThemeColorDirective,
  DateInputDirective,
  DecimalMaskDirective,
  SlideButtonComponent,
  ToggleComponent,
  EmptyStateComponent,
  AffixDirective,
  FormFieldComponent,
  InputComponent,
  InputCounterComponent,
  TextareaComponent,
  FabSheetComponent,
  DividerComponent,
  ReorderListComponent,
  DropdownComponent,
  LoadingOverlayComponent,
  ProgressCircleComponent,
  FlagComponent,
  SlidesComponent,
  SlideDirective,
  AccordionDirective,
  AccordionItemComponent,
  ItemSlidingComponent,
  RadioComponent,
  RadioGroupComponent,
  RangeComponent,
  ElementAsButtonDirective,
  ItemGroupComponent,
  SectionHeaderComponent,
];

const declarations = [
  ...exportedDeclarations,
  KeyHandlerDirective,
  FormFieldMessageComponent,
  AlertComponent,
  ModalWrapperComponent,
  ModalCompactWrapperComponent,
  ProgressCircleRingComponent,
  PopoverComponent,
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

const entryComponents = [
  ModalWrapperComponent,
  ModalCompactWrapperComponent,
  ActionSheetComponent,
  AlertComponent,
];

const ConfigToken = new InjectionToken<any>('USERCONFIG');
export interface KirbyConfig {
  moduleRootRoutePath?: string;
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    IonicModule.forRoot({
      mode: 'ios',
      inputShims: true,
      scrollAssist: true,
      scrollPadding: false,
    }),
    ...importedModules,
  ],
  declarations: declarations,
  providers: providers,
  exports: allExports,
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
