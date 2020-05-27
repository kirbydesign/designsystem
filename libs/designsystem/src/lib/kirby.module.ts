import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { OverlayModule } from '@angular/cdk/overlay';

import { InfiniteScrollDirective } from './components/list/directives/infinite-scroll.directive';
import { ModalWrapperComponent } from './components/modal/modal-wrapper/modal-wrapper.component';
import { ModalCompactWrapperComponent } from './components/modal/modal-wrapper/compact/modal-compact-wrapper.component';
import { ModalFooterComponent } from './components/modal/footer/modal-footer.component';
import { KeyHandlerDirective } from './directives/key-handler/key-handler.directive';
import { FullscreenLoadingOverlayComponent } from './components/loading-overlay/fullscreen-loading-overlay/fullscreen-loading-overlay.component';
import { LoadingOverlayComponent } from './components/loading-overlay/loading-overlay.component';
import { ListItemColorDirective } from './components/list/directives/list-item-color.directive';
import { AlertComponent } from './components/modal/alert/alert.component';
import { PageModule } from './components/page/page.module';
import { FormFieldMessageComponent } from './components/form-field/form-field-message/form-field-message.component';
import { RouterOutletModule } from './components/router-outlet/router-outlet.module';
import { TabsModule } from './components/tabs/tabs.module';
import { IconModule } from './components/icon/icon.module';
import { ItemModule } from './components/item/item.module';
import { AppModule } from './components/app/app.module';
import { ReorderListComponent } from './components/reorder-list/reorder-list.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { BadgeComponent } from './components/badge/badge.component';
import { ButtonComponent } from './components/button/button.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CardFooterComponent } from './components/card/card-footer/card-footer.component';
import { CardHeaderComponent } from './components/card/card-header/card-header.component';
import { CardComponent } from './components/card/card.component';
import { ChartComponent } from './components/chart/chart.component';
import { StockChartComponent } from './components/stock-chart/stock-chart.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { ChipComponent } from './components/chip/chip.component';
import { EmptyStateComponent } from './components/empty-state/empty-state.component';
import { GridComponent } from './components/grid/grid.component';
import { ListHeaderComponent } from './components/list/list-header/list-header.component';
import { ListSectionHeaderComponent } from './components/list/list-section-header/list-section-header.component';
import { ListComponent } from './components/list/list.component';
import {
  ListFlexItemDirective,
  ListFooterDirective,
  ListHeaderDirective,
  ListItemDirective,
  ListItemTemplateDirective,
  ListSectionHeaderDirective,
} from './components/list/list.directive';
import { GroupByPipe } from './components/list/pipes/group-by.pipe';
import { ActionSheetComponent } from './components/modal/action-sheet/action-sheet.component';
import { ActionSheetHelper } from './components/modal/services/action-sheet.helper';
import { AlertHelper } from './components/modal/services/alert.helper';
import { SegmentedControlComponent } from './components/segmented-control/segmented-control.component';
import { ModalController } from './components/modal/services/modal.controller';
import { ModalHelper } from './components/modal/services/modal.helper';
import { ComponentLoaderDirective } from './components/shared/component-loader.directive';
import { SlideButtonComponent } from './components/slide-button/slide-button.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ToastController } from './components/toast/services/toast.controller';
import { ToastHelper } from './components/toast/services/toast.helper';
import { ToggleComponent } from './components/toggle/toggle.component';
import { SizeDirective } from './directives/size/size.directive';
import { ThemeColorDirective } from './directives/theme-color/theme-color.directive';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { FabSheetComponent } from './components/fab-sheet/fab-sheet.component';
import { FormFieldComponent } from './components/form-field/form-field.component';
import { InputComponent } from './components/form-field/input/input.component';
import { TextareaComponent } from './components/form-field/textarea/textarea.component';
import { InputCounterComponent } from './components/form-field/input-counter/input-counter.component';
import { DividerComponent } from './components/divider/divider.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { BreakpointHelperService } from './components/grid/breakpoint-helper.service';
import { LoadingOverlayService } from './components/loading-overlay/fullscreen-loading-overlay/loading-overlay.service';
import { ResizeObserverFactory } from './components/shared/resize-observer/resize-observer.factory';
import { ResizeObserverService } from './components/shared/resize-observer/resize-observer.service';
import { RadioButtonComponent, RadioButtonGroupComponent } from './components/radio-button';

const exportedDeclarations = [
  CardComponent,
  CardHeaderComponent,
  CardFooterComponent,
  ButtonComponent,
  ListComponent,
  ListItemDirective,
  ListFlexItemDirective,
  ListItemTemplateDirective,
  ListSectionHeaderComponent,
  ListSectionHeaderDirective,
  ListHeaderDirective,
  ListHeaderComponent,
  ListFooterDirective,
  ChartComponent,
  StockChartComponent,
  GridComponent,
  ComponentLoaderDirective,
  AvatarComponent,
  GroupByPipe,
  SpinnerComponent,
  CalendarComponent,
  CheckboxComponent,
  ActionSheetComponent,
  ModalFooterComponent,
  SegmentedControlComponent,
  ChipComponent,
  BadgeComponent,
  SizeDirective,
  ThemeColorDirective,
  SlideButtonComponent,
  ToggleComponent,
  EmptyStateComponent,
  ToolbarComponent,
  FormFieldComponent,
  InputComponent,
  InputCounterComponent,
  TextareaComponent,
  FabSheetComponent,
  DividerComponent,
  ReorderListComponent,
  DropdownComponent,
  InfiniteScrollDirective,
  LoadingOverlayComponent,
  RadioButtonComponent,
];

const declarations = [
  ...exportedDeclarations,
  ListItemColorDirective,
  FullscreenLoadingOverlayComponent,
  KeyHandlerDirective,
  FormFieldMessageComponent,
  AlertComponent,
  ModalWrapperComponent,
  ModalCompactWrapperComponent,
];

const exportedModules = [
  AppModule,
  RouterOutletModule,
  PageModule,
  TabsModule,
  IconModule,
  ItemModule,
];

const exports = [...exportedModules, ...exportedDeclarations];

const importedModules = [...exportedModules, OverlayModule];

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
];

const entryComponents = [
  ModalWrapperComponent,
  ModalCompactWrapperComponent,
  ActionSheetComponent,
  FullscreenLoadingOverlayComponent,
  AlertComponent,
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    IonicModule.forRoot({
      mode: 'ios',
      inputShims: true,
      scrollAssist: true,
    }),
    ...importedModules,
  ],
  declarations: [declarations, RadioButtonGroupComponent],
  providers: providers,
  entryComponents: entryComponents,
  exports: [exports, RadioButtonGroupComponent],
})
export class KirbyModule {}
