import { DropdownExampleComponent } from '~/app/examples/dropdown-example/dropdown-example.component';
import { PagePullToRefreshExampleComponent } from '~/app/examples/page-example/pull-to-refresh/page-pull-to-refresh-example.component';

import { IconSettings, ICON_SETTINGS } from '@kirbydesign/designsystem';

import { AccordionExampleComponent } from './accordion-example/accordion-example.component';
import { ActionSheetExampleComponent } from './action-sheet-example/action-sheet-example.component';
import { AlertExampleComponent } from './alert-example/alert-example.component';
import { AvatarExampleComponent } from './avatar-example/avatar-example.component';
import { ButtonExampleComponent } from './button-example/button-example.component';
import { CalendarCardExampleComponent } from './calendar-example/calendar-card-example.component';
import { CalendarExampleComponent } from './calendar-example/calendar-example.component';
import { CardExampleComponent } from './card-example/card-example.component';
import { CardClickableExampleComponent } from './card/card-clickable-example/card-clickable-example.component';
import { CardElevationsExampleComponent } from './card/card-elevations-example/card-elevations-example.component';
import { CardThemecolorExampleComponent } from './card/card-themecolor-example/card-themecolor-example.component';
import { CheckboxExampleComponent } from './checkbox-example/checkbox-example.component';
import { ChipExampleComponent } from './chip-example/chip-example.component';
import { DividerExampleComponent } from './divider-example/divider-example.component';
import { EmptyStateExampleComponent } from './empty-state-example/empty-state-example.component';
import { ExamplesComponent } from './examples.component';
import { FabSheetExampleComponent } from './fab-sheet-example/fab-sheet-example.component';
import { FlagExampleComponent } from './flag-example/flag-example.component';
import { FontsExampleComponent } from './fonts-example/fonts-example.component';
import { FormFieldExampleComponent } from './form-field-example/form-field-example.component';
import { GridExampleComponent } from './grid-example/grid-example.component';
import { IconExampleComponent } from './icon-example/icon-example.component';
import { ItemExampleComponent } from './item-example/item-example.component';
import { ItemGroupExampleComponent } from './item-group-example/item-group-example.component';
import { LinkExampleComponent } from './link-example/link-example.component';
import { ListExampleComponent } from './list-example/list-example.component';
import { ListLoadOnDemandExampleComponent } from './list-load-on-demand-example/list-load-on-demand-example.component';
import { ListNoShapeExampleComponent } from './list-no-shape-example/list-no-shape-example.component';
import { ListSwipeExampleComponent } from './list-swipe-example/list-swipe-example.component';
import { LoadingOverlayExampleComponent } from './loading-overlay-example/loading-overlay-example.component';
import { PageAdvancedExampleComponent } from './page-example/advanced/page-advanced-example.component';
import { PageCustomTitleExampleComponent } from './page-example/advanced/page-custom-title-example.component';
import { PageAlignmentAndToolbarTitleExampleComponent } from './page-example/alignment-and-toolbar-title/page-alignment-and-toolbar-title-example.component';
import { PageFitHeadingExampleComponent } from './page-example/fit-heading/fit-heading-example.component';
import { PageFixedFooterTabsExampleComponent } from './page-example/fixed-footer-tabs/fixed-footer-tabs-example.component';
import { PageFixedFooterTabExampleComponent } from './page-example/fixed-footer-tabs/tab/fixed-footer-tab-example.component';
import { PageFixedTitleAndActionsExampleComponent } from './page-example/fixed-title-and-actions/page-fixed-title-and-actions-example.component';
import { PageSimpleExampleComponent } from './page-example/simple/page-simple-example.component';
import { ProgressCircleExampleComponent } from './progress-circle-example/progress-circle-example.component';
import { ReorderListExampleComponent } from './reorder-list-example/reorder-list-example.component';
import { SectionHeaderExampleComponent } from './section-header-example/section-header-example.component';
import { SegmentedControlExampleComponent } from './segmented-control-example/segmented-control-example.component';
import { SlideButtonExampleComponent } from './slide-button-example/slide-button-example.component';
import { CookbookExampleCardContentComponent } from './slides-example/example-card-content';
import { SlidesExampleComponent } from './slides-example/slides-example.component';
import { SpinnerExampleComponent } from './spinner-example/spinner-example.component';
import { StockChartDeprecatedExampleComponent } from './stock-chart-deprecated-example/stock-chart-deprecated-example.component';
import { TabExampleComponent } from './tabs-example/tab/tab-example.component';
import { TabsExampleComponent } from './tabs-example/tabs-example.component';
import { ToastExampleComponent } from './toast-example/toast-example.component';
import { ToggleExampleComponent } from './toggle-example/toggle-example.component';

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
  CardClickableExampleComponent,
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
  SegmentedControlExampleComponent,
  ChipExampleComponent,
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
  FabSheetExampleComponent,
  FormFieldExampleComponent,
  PageSimpleExampleComponent,
  PageAlignmentAndToolbarTitleExampleComponent,
  PageCustomTitleExampleComponent,
  PageAdvancedExampleComponent,
  PageFitHeadingExampleComponent,
  PageFixedTitleAndActionsExampleComponent,
  TabExampleComponent,
  PageFixedFooterTabsExampleComponent,
  PageFixedFooterTabExampleComponent,
  TabsExampleComponent,
  TabExampleComponent,
  ItemExampleComponent,
  DividerExampleComponent,
  ReorderListExampleComponent,
  DropdownExampleComponent,
  StockChartDeprecatedExampleComponent,
  ProgressCircleExampleComponent,
  FlagExampleComponent,
  SlidesExampleComponent,
  CookbookExampleCardContentComponent,
  AccordionExampleComponent,
  LinkExampleComponent,
  PagePullToRefreshExampleComponent,
  ItemGroupExampleComponent,
  SectionHeaderExampleComponent,
];

// Configure custom icons (used by example to show the usage of custom icons)
export const PROVIDER_DECLARATIONS: any[] = [{ provide: ICON_SETTINGS, useValue: iconSettings }];
