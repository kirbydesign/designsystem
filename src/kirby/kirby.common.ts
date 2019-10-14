import { AvatarComponent } from './components/avatar/avatar.component';
import { BadgeComponent } from './components/badge/badge.component';
import { ButtonComponent } from './components/button/button.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CardFooterComponent } from './components/card/card-footer/card-footer.component';
import { CardHeaderComponent } from './components/card/card-header/card-header.component';
import { CardComponent } from './components/card/card.component';
import { ChartComponent } from './components/chart/chart.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { ChipComponent } from './components/chip/chip.component';
import { EmptyStateComponent } from './components/empty-state/empty-state.component';
import { GridComponent } from './components/grid/grid.component';
import { ListCellLineComponent } from './components/list/list-cell-line/list-cell-line.component';
import { ListCellComponent } from './components/list/list-cell/list-cell.component';
import { ListFlexItemComponent } from './components/list/list-flex-item/list-flex-item.component';
import { ListHeaderComponent } from './components/list/list-header/list-header.component';
import { ListItemComponent } from './components/list/list-item/list-item.component';
import { ListSectionHeaderComponent } from './components/list/list-section-header/list-section-header.component';
import { ListComponent } from './components/list/list.component';
import {
  ListFlexItemDirective,
  ListFooterDirective,
  ListHeaderDirective,
  ListItemDirective,
  ListSectionHeaderDirective,
} from './components/list/list.directive';
import { GroupByPipe } from './components/list/pipes/group-by.pipe';
import { ActionSheetComponent } from './components/modal/action-sheet/action-sheet.component';
import { ModalWrapperComponent } from './components/modal/modal-wrapper/modal-wrapper.component';
import { ActionSheetHelper } from './components/modal/services/action-sheet.helper';
import { AlertHelper } from './components/modal/services/alert.helper';
import { SegmentedControlComponent } from './components/segmented-control/segmented-control.component';
import { ModalController } from './components/modal/services/modal.controller';
import { IModalController } from './components/modal/services/modal.controller.interface';
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

export const declarations = [
  CardComponent,
  CardHeaderComponent,
  CardFooterComponent,
  ButtonComponent,
  ListComponent,
  ListItemDirective,
  ListFlexItemDirective,
  ListItemComponent,
  ListFlexItemComponent,
  ListCellComponent,
  ListCellLineComponent,
  ListSectionHeaderComponent,
  ListSectionHeaderDirective,
  ListHeaderDirective,
  ListHeaderComponent,
  ListFooterDirective,
  ChartComponent,
  GridComponent,
  ComponentLoaderDirective,
  AvatarComponent,
  GroupByPipe,
  SpinnerComponent,
  CalendarComponent,
  CheckboxComponent,
  ModalWrapperComponent,
  ActionSheetComponent,
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
];

export const providerDeclarations: any[] = [
  ModalController,
  // the provider below is used to prevent a cyclic reference problem in our modal components
  { provide: IModalController, useExisting: ModalController },
  ActionSheetHelper,
  ModalHelper,
  AlertHelper,
  ToastHelper,
  ToastController,
];
