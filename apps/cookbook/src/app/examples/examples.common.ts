import { ICON_SETTINGS, IconSettings } from '@kirbydesign/designsystem';

import { AvatarExampleComponent } from './avatar-example/avatar-example.component';
import { ButtonExampleComponent } from './button-example/button-example.component';
import { CardExampleComponent } from './card-example/card-example.component';
import { CardThemecolorExampleComponent } from './card/card-themecolor-example/card-themecolor-example.component';
import { CardElevationsExampleComponent } from './card/card-elevations-example/card-elevations-example.component';
import { GridExampleComponent } from './grid-example/grid-example.component';
import { ListExampleComponent } from './list/list-example.component';
import { ListLoadOnDemandExampleComponent } from './list/components/load-on-demand/list-load-on-demand-example.component';
import { FontsExampleComponent } from './fonts-example/fonts-example.component';
import { SpinnerExampleComponent } from './spinner-example/spinner-example.component';
import { ModalExampleComponent } from './modal-example/modal-example.component';
import { ModalExampleDefaultComponent } from './modal-example/modal-example-default.component';
import { ModalExampleOutletComponent } from './modal-example/modal-example-outlet.component';
import { FirstEmbeddedModalExampleComponent } from './modal-example/first-embedded-modal-example/first-embedded-modal-example.component';
import { SecondEmbeddedModalExampleComponent } from './modal-example/second-embedded-modal-example/second-embedded-modal-example.component';
import { ModalCompactExampleComponent } from './modal-example/compact-example/modal-compact-example.component';
import { SegmentedControlExampleComponent } from './segmented-control-example/segmented-control-example.component';
import { ChipExampleComponent } from './chip-example/chip-example.component';
import { BadgeExampleComponent } from './badge-example/badge-example.component';
import { IconExampleComponent } from './icon-example/icon-example.component';
import { CalendarExampleComponent } from './calendar-example/calendar-example.component';
import { CalendarCardExampleComponent } from './calendar-example/calendar-card-example.component';
import { CheckboxExampleComponent } from './checkbox-example/checkbox-example.component';
import { ActionSheetExampleComponent } from './action-sheet-example/action-sheet-example.component';
import { AlertExampleComponent } from './alert-example/alert-example.component';
import { SlideButtonExampleComponent } from './slide-button-example/slide-button-example.component';
import { ToastExampleComponent } from './toast-example/toast-example.component';
import { ToggleExampleComponent } from './toggle-example/toggle-example.component';
import { EmptyStateExampleComponent } from './empty-state-example/empty-state-example.component';
import { LoadingOverlayExampleComponent } from './loading-overlay-example/loading-overlay-example.component';
import { ToolbarExampleComponent } from './toolbar-example/toolbar-example.component';
import { ListSwipeExampleComponent } from './list/components/swipe/list-swipe-example.component';
import { ListNoShapeExampleComponent } from './list/components/no-shape/list-no-shape-example.component';
import { FabSheetExampleComponent } from './fab-sheet-example/fab-sheet-example.component';
import { PageSimpleExampleComponent } from './page-example/simple/page-simple-example.component';
import { PageAlignmentAndToolbarTitleExampleComponent } from './page-example/alignment-and-toolbar-title/page-alignment-and-toolbar-title-example.component';
import { PageFitHeadingExampleComponent } from './page-example/fit-heading/fit-heading-example.component';
import { PageFixedTitleAndActionsExampleComponent } from './page-example/fixed-title-and-actions/page-fixed-title-and-actions-example.component';
import { PageCustomTitleExampleComponent } from './page-example/advanced/page-custom-title-example.component';
import { PageAdvancedExampleComponent } from './page-example/advanced/page-advanced-example.component';
import { FormFieldExampleComponent } from './form-field-example/form-field-example.component';
import { ExamplesComponent } from './examples.component';
import { TabsExampleComponent } from './tabs/tabs-example.component';
import { TabExampleComponent } from './tabs/tab/tab-example.component';
import { ItemExampleComponent } from './item-example/item-example.component';
import { DividerExampleComponent } from './divider-example/divider-example.component';
import { ReorderListExampleComponent } from './reorder-list/reorder-list-example.component';
import { DropdownExampleComponent } from '~/app/examples/dropdown-example/dropdown-example.component';
import { StockChartExampleComponent } from './stock-chart-example/stock-chart-example.component';
import { ProgressCircleExampleComponent } from './progress-circle-example/progress-circle-example.component';
import { ModalRoutePage1ExampleComponent } from './modal-example/modal-route-example/modal-route-page1-example.component';
import { ModalRoutePage2ExampleComponent } from './modal-example/modal-route-example/modal-route-page2-example.component';

// Example of "custom" icons
export const iconSettings: IconSettings = {
  icons: [
    {
      name: 'football',
      svg: 'assets/icons/football.svg',
    },
    {
      name: 'umbrella',
      svg: 'assets/icons/umbrella.svg',
    },
  ],
};

export const COMPONENT_DECLARATIONS: any[] = [
  ExamplesComponent,
  ButtonExampleComponent,
  SlideButtonExampleComponent,
  CardExampleComponent,
  CardThemecolorExampleComponent,
  CardElevationsExampleComponent,
  ListExampleComponent,
  ListLoadOnDemandExampleComponent,
  ListSwipeExampleComponent,
  ListNoShapeExampleComponent,
  GridExampleComponent,
  AvatarExampleComponent,
  FontsExampleComponent,
  SpinnerExampleComponent,
  ModalExampleComponent,
  ModalExampleDefaultComponent,
  ModalExampleOutletComponent,
  FirstEmbeddedModalExampleComponent,
  SecondEmbeddedModalExampleComponent,
  ModalCompactExampleComponent,
  ModalRoutePage1ExampleComponent,
  ModalRoutePage2ExampleComponent,
  SegmentedControlExampleComponent,
  ChipExampleComponent,
  BadgeExampleComponent,
  IconExampleComponent,
  CalendarExampleComponent,
  CalendarCardExampleComponent,
  ActionSheetExampleComponent,
  CheckboxExampleComponent,
  AlertExampleComponent,
  ToastExampleComponent,
  ToggleExampleComponent,
  EmptyStateExampleComponent,
  LoadingOverlayExampleComponent,
  ToolbarExampleComponent,
  FabSheetExampleComponent,
  FormFieldExampleComponent,
  PageSimpleExampleComponent,
  PageAlignmentAndToolbarTitleExampleComponent,
  PageFitHeadingExampleComponent,
  PageFixedTitleAndActionsExampleComponent,
  PageCustomTitleExampleComponent,
  PageAdvancedExampleComponent,
  TabsExampleComponent,
  TabExampleComponent,
  ItemExampleComponent,
  DividerExampleComponent,
  ReorderListExampleComponent,
  DropdownExampleComponent,
  StockChartExampleComponent,
  ProgressCircleExampleComponent,
];

// Configure custom icons (used by example to show the usage of custom icons)
export const PROVIDER_DECLARATIONS: any[] = [{ provide: ICON_SETTINGS, useValue: iconSettings }];
