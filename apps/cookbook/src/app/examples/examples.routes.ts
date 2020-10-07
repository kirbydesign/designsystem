import { Routes } from '@angular/router';

import { ListNoShapeExampleComponent } from './list/components/no-shape/list-no-shape-example.component';
import { AvatarExampleComponent } from './avatar-example/avatar-example.component';
import { ButtonExampleComponent } from './button-example/button-example.component';
import { CardExampleComponent } from './card-example/card-example.component';
import { GridExampleComponent } from './grid-example/grid-example.component';
import { ListExampleComponent } from './list/list-example.component';
import { ChartExampleComponent } from './chart-example/chart-example.component';
import { FontsExampleComponent } from './fonts-example/fonts-example.component';
import { SpinnerExampleComponent } from './spinner-example/spinner-example.component';
import { ModalExampleComponent } from './modal-example/modal-example.component';
import { ModalRoutePage1ExampleComponent } from './modal-example/modal-route-example/modal-route-page1-example.component';
import { ModalRoutePage2ExampleComponent } from './modal-example/modal-route-example/modal-route-page2-example.component';
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
import { ListLoadOnDemandExampleComponent } from './list/components/load-on-demand/list-load-on-demand-example.component';
import { FormFieldExampleComponent } from './form-field-example/form-field-example.component';
import { FabSheetExampleComponent } from './fab-sheet-example/fab-sheet-example.component';
import { PageSimpleExampleComponent } from './page-example/simple/page-simple-example.component';
import { PageAlignmentAndToolbarTitleExampleComponent } from './page-example/alignment-and-toolbar-title/page-alignment-and-toolbar-title-example.component';
import { PageFitHeadingExampleComponent } from './page-example/fit-heading/fit-heading-example.component';
import { PageFixedTitleAndActionsExampleComponent } from './page-example/fixed-title-and-actions/page-fixed-title-and-actions-example.component';
import { PageCustomTitleExampleComponent } from './page-example/advanced/page-custom-title-example.component';
import { PageAdvancedExampleComponent } from './page-example/advanced/page-advanced-example.component';
import { ExamplesComponent } from './examples.component';
import { TabsExampleComponent } from './tabs/tabs-example.component';
import { TabExampleComponent } from './tabs/tab/tab-example.component';
import { ItemExampleComponent } from './item-example/item-example.component';
import { ListBoldTextOnRowSelectionExampleComponent } from './list/components/bold-text-on-row-selection';
import { ListWithDividersExampleComponent } from './list/components/dividers';
import { ListSelectableItemsExampleComponent } from './list/components/selectable-items';
import { ListWithSectionsAndColoredItemsExampleComponent } from './list/components/sections-and-colored-items';
import { ListColoredItemsExampleComponent } from './list/components/colored-items';
import { ListWithHeaderAndFooterExampleComponent } from './list/components/header-and-footer';
import { ListWithSectionsExampleComponent } from './list/components/sections';
import { ListItemsExampleComponent } from './list/components/items';
import { ReorderListExampleComponent } from './reorder-list/reorder-list-example.component';
import { DropdownExampleComponent } from '~/app/examples/dropdown-example/dropdown-example.component';
import { StockChartExampleComponent } from './stock-chart-example/stock-chart-example.component';
import { ProgressCircleExampleComponent } from './progress-circle-example/progress-circle-example.component';
import { FlagExampleComponent } from './flag-example/flag-example.component';

export const routes: Routes = [
  {
    path: '',
    component: ExamplesComponent,
    children: [
      {
        path: 'page',
        children: [
          {
            path: '',
            redirectTo: 'simple',
            pathMatch: 'full',
          },
          {
            path: 'simple',
            component: PageSimpleExampleComponent,
          },
          {
            path: 'alignment-toolbar-title',
            component: PageAlignmentAndToolbarTitleExampleComponent,
          },
          {
            path: 'fit-heading',
            component: PageFitHeadingExampleComponent,
          },
          {
            path: 'fixed',
            component: PageFixedTitleAndActionsExampleComponent,
          },
          {
            path: 'custom-title',
            component: PageCustomTitleExampleComponent,
          },
          {
            path: 'advanced',
            component: PageAdvancedExampleComponent,
          },
        ],
      },
      {
        path: 'tabs',
        component: TabsExampleComponent,
        children: [
          {
            path: '',
            redirectTo: 'dashboard',
            pathMatch: 'full',
          },
          {
            path: 'dashboard',
            component: TabExampleComponent,
            data: {
              title: 'Dashboard',
            },
          },
          {
            path: 'account',
            children: [
              {
                path: '',
                component: TabExampleComponent,
                data: {
                  title: 'Account',
                },
              },
              {
                path: 'sub',
                component: TabExampleComponent,
                data: {
                  title: 'Account Sub',
                },
              },
            ],
          },
          {
            path: 'inbox',
            component: TabExampleComponent,
            data: {
              title: 'Inbox',
            },
          },
        ],
      },
      {
        path: 'reorder-list',
        component: ReorderListExampleComponent,
      },
      {
        path: 'modal',
        component: ModalExampleComponent,
        children: [
          {
            path: 'page1',
            outlet: 'modal',
            component: ModalRoutePage1ExampleComponent,
          },
          {
            path: 'page2',
            outlet: 'modal',
            component: ModalRoutePage2ExampleComponent,
          },
        ],
      },
    ],
  },
  {
    path: 'item',
    component: ItemExampleComponent,
  },
  {
    path: 'button',
    component: ButtonExampleComponent,
  },
  {
    path: 'slide-button',
    component: SlideButtonExampleComponent,
  },
  {
    path: 'card',
    component: CardExampleComponent,
  },
  {
    path: 'list',
    component: ListExampleComponent,
    children: [
      {
        path: '',
        redirectTo: 'with-items',
      },
      {
        path: 'bold-text-on-row-selection',
        component: ListBoldTextOnRowSelectionExampleComponent,
      },
      {
        path: 'with-dividers',
        component: ListWithDividersExampleComponent,
      },
      {
        path: 'with-selectable-items',
        component: ListSelectableItemsExampleComponent,
      },
      {
        path: 'with-colored-items',
        component: ListColoredItemsExampleComponent,
      },
      {
        path: 'with-sections-and-colored-items',
        component: ListWithSectionsAndColoredItemsExampleComponent,
      },
      {
        path: 'with-header-and-footer',
        component: ListWithHeaderAndFooterExampleComponent,
      },
      {
        path: 'with-sections',
        component: ListWithSectionsExampleComponent,
      },
      {
        path: 'with-items',
        component: ListItemsExampleComponent,
      },
    ],
  },
  {
    path: 'list-swipe',
    component: ListSwipeExampleComponent,
  },
  {
    path: 'list-no-shape',
    component: ListNoShapeExampleComponent,
  },
  {
    path: 'list-load-on-demand',
    component: ListLoadOnDemandExampleComponent,
  },
  {
    path: 'chart',
    component: ChartExampleComponent,
  },
  {
    path: 'stock-chart',
    component: StockChartExampleComponent,
  },
  {
    path: 'grid',
    component: GridExampleComponent,
  },
  {
    path: 'chip',
    component: ChipExampleComponent,
  },
  {
    path: 'avatar',
    component: AvatarExampleComponent,
  },
  {
    path: 'fonts',
    component: FontsExampleComponent,
  },
  {
    path: 'spinner',
    component: SpinnerExampleComponent,
  },
  {
    path: 'loading-overlay',
    component: LoadingOverlayExampleComponent,
  },
  {
    path: 'action-sheet',
    component: ActionSheetExampleComponent,
  },
  {
    path: 'alert',
    component: AlertExampleComponent,
  },
  {
    path: 'segmented-control',
    component: SegmentedControlExampleComponent,
  },
  {
    path: 'badge',
    component: BadgeExampleComponent,
  },
  {
    path: 'flag',
    component: FlagExampleComponent,
  },
  {
    path: 'icon',
    component: IconExampleComponent,
  },
  {
    path: 'checkbox',
    component: CheckboxExampleComponent,
  },
  {
    path: 'toast',
    component: ToastExampleComponent,
  },
  {
    path: 'toggle',
    component: ToggleExampleComponent,
  },
  {
    path: 'calendar',
    component: CalendarExampleComponent,
  },
  {
    path: 'calendar-card',
    component: CalendarCardExampleComponent,
  },
  {
    path: 'empty-state',
    component: EmptyStateExampleComponent,
  },
  {
    path: 'toolbar',
    component: ToolbarExampleComponent,
  },
  {
    path: 'form-field',
    component: FormFieldExampleComponent,
  },
  {
    path: 'fab-sheet',
    component: FabSheetExampleComponent,
  },
  {
    path: 'dropdown',
    component: DropdownExampleComponent,
  },
  {
    path: 'progress-circle',
    component: ProgressCircleExampleComponent,
  },
];
