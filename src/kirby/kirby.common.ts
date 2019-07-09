import { GroupByPipe } from './components/list/pipes/group-by.pipe';
import { AvatarComponent } from './components/avatar/avatar.component';
import { ButtonComponent } from './components/button/button.component';
import { FloatingActionButtonComponent } from './components/floating-action-button/floating-action-button.component';
import { CardFooterComponent } from './components/card/card-footer/card-footer.component';
import { CardHeaderComponent } from './components/card/card-header/card-header.component';
import { CardComponent } from './components/card/card.component';
import { GridComponent } from './components/grid/grid.component';
import { IconComponent } from './components/icon/icon.component';
import { ListComponent } from './components/list/list.component';
import {
  ListItemDirective,
  ListFlexItemDirective,
  ListHeaderDirective,
  ListSectionHeaderDirective,
  ListFooterDirective,
} from './components/list/list.directive';
import { ComponentLoaderDirective } from './components/shared/component-loader.directive';
import { ChartComponent } from './components/chart/chart.component';
import { ListItemComponent } from './components/list/list-item/list-item.component';
import { ListFlexItemComponent } from './components/list/list-flex-item/list-flex-item.component';
import { ListSectionHeaderComponent } from './components/list/list-section-header/list-section-header.component';
import { ListHeaderComponent } from './components/list/list-header/list-header.component';
import { ListCellComponent } from './components/list/list-cell/list-cell.component';
import { ListCellLineComponent } from './components/list/list-cell-line/list-cell-line.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { ModalWrapperComponent } from './components/modal/modal-wrapper/modal-wrapper.component';
import { SegmentedControlComponent } from './components/segmented-control/segmented-control.component';
import { ChipComponent } from './components/chip/chip.component';
import { SegmentedChipControlComponent } from './components/segment/segmented-chip-control/segmented-chip-control.component';
import { BadgeComponent } from './components/badge/badge.component';
import { ModalController } from './components/modal/services/modal.controller';
import { IModalController } from './components/modal/services/modal.controller.interface';
import { ModalHelper } from './components/modal/services/modal.helper';
import { ActionSheetHelper } from './components/modal/services/action-sheet.helper';
import { ActionSheetComponent } from './components/modal/action-sheet/action-sheet.component';
import { AlertHelper } from './components/modal/services/alert.helper';
import { SizeDirective } from './directives/size/size.directive';
import { ThemeColorDirective } from './directives/theme-color/theme-color.directive';
import { ToastController } from './components/toast/services/toast.controller';
import { ToastHelper } from './components/toast/services/toast.helper';
import { ToggleComponent } from './components/toggle/toggle.component';
import { EmptyStateComponent } from './components/empty-state/empty-state.component';

export const declarations = [
  CardComponent,
  CardHeaderComponent,
  CardFooterComponent,
  ButtonComponent,
  FloatingActionButtonComponent,
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
  IconComponent,
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
  SegmentedChipControlComponent,
  BadgeComponent,
  SizeDirective,
  ThemeColorDirective,
  ToggleComponent,
  EmptyStateComponent,
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
