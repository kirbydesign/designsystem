import { ExamplesModule } from '../examples/examples.module';
import { AvatarShowcaseComponent } from './avatar-showcase/avatar-showcase.component';
import { ButtonShowcaseComponent } from './button-showcase/button-showcase.component';
import { FloatingActionButtonShowcaseComponent } from './floating-action-button-showcase/floating-action-button-showcase.component';
import { CardShowcaseComponent } from './card-showcase/card-showcase.component';
import { FontsShowcaseComponent } from './fonts-showcase/fonts-showcase.component';
import { GridShowcaseComponent } from './grid-showcase/grid-showcase.component';
import { ListShowcaseComponent } from './list-showcase/list-showcase.component';
import { ListLoadOnDemandShowcaseComponent } from './list-load-on-demand-showcase/list-load-on-demand-showcase.component';
import { ShowcaseComponent } from './showcase.component';
import { ChartShowcaseComponent } from './chart-showcase/chart-showcase.component';
import { DoughnutChartShowcaseComponent } from './doughnut-chart-showcase/doughnut-chart-showcase.component';
import { ShowcaseRoutingModule } from './showcase-routing.module';
import { ColorsShowcaseComponent } from './colors-showcase/colors-showcase.component';
import { LineChartShowcaseComponent } from './line-chart-showcase/line-chart-showcase.component';
import { SpinnerShowcaseComponent } from './spinner-showcase/spinner-showcase.component';
import { ModalShowcaseComponent } from './modal-showcase/modal-showcase.component';
import { SegmentedControlShowcaseComponent } from './segmented-control-showcase/segmented-control-showcase.component';
import { ChipShowcaseComponent } from './chip-showcase/chip-showcase.component';
import { BadgeShowcaseComponent } from './badge-showcase/badge-showcase.component';
import { IconShowcaseComponent } from './icon-showcase/icon-showcase.component';
import { CalendarShowcaseComponent } from './calendar-showcase/calendar-showcase.component';
import { CheckboxShowcaseComponent } from './checkbox-showcase/checkbox-showcase.component';
import { SegmentedChipControlShowcaseComponent } from './segmented-chip-control-showcase/segmented-chip-control-showcase.component';
import { ActionSheetShowcaseComponent } from './action-sheet-showcase/action-sheet-showcase.component';
import { AlertShowcaseComponent } from './alert-showcase/alert-showcase.component';
import { SlideButtonShowcaseComponent } from './slide-button-showcase/slide-button-showcase.component';
import { ToastShowcaseComponent } from './toast-showcase/toast-showcase.component';
import { ToggleShowcaseComponent } from './toggle-showcase/toggle-showcase.component';
import { EmptyStateShowcaseComponent } from './empty-state-showcase/empty-state-showcase.component';

export const COMPONENT_IMPORTS: any[] = [ExamplesModule, ShowcaseRoutingModule];

export const COMPONENT_EXPORTS: any[] = [
  CardShowcaseComponent,
  ColorsShowcaseComponent,
  ButtonShowcaseComponent,
  SlideButtonShowcaseComponent,
  FloatingActionButtonShowcaseComponent,
  ListShowcaseComponent,
  ListLoadOnDemandShowcaseComponent,
  GridShowcaseComponent,
  AvatarShowcaseComponent,
  ChartShowcaseComponent,
  DoughnutChartShowcaseComponent,
  FontsShowcaseComponent,
  LineChartShowcaseComponent,
  SpinnerShowcaseComponent,
  ModalShowcaseComponent,
  SegmentedControlShowcaseComponent,
  ChipShowcaseComponent,
  SegmentedChipControlShowcaseComponent,
  BadgeShowcaseComponent,
  IconShowcaseComponent,
  CalendarShowcaseComponent,
  ActionSheetShowcaseComponent,
  CheckboxShowcaseComponent,
  AlertShowcaseComponent,
  ToastShowcaseComponent,
  ToggleShowcaseComponent,
  EmptyStateShowcaseComponent,
];

export const COMPONENT_DECLARATIONS: any[] = [...COMPONENT_EXPORTS, ShowcaseComponent];
