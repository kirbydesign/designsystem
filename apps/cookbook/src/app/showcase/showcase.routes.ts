import { Routes } from '@angular/router';

import { ItemShowcaseComponent } from '../showcase/item-showcase/item-showcase.component';

import { AccordionShowcaseComponent } from './accordion-showcase/accordion-showcase.component';
import { ActionSheetShowcaseComponent } from './action-sheet-showcase/action-sheet-showcase.component';
import { AlertShowcaseComponent } from './alert-showcase/alert-showcase.component';
import { AvatarShowcaseComponent } from './avatar-showcase/avatar-showcase.component';
import { BadgeShowcaseComponent } from './badge-showcase/badge-showcase.component';
import { ButtonShowcaseComponent } from './button-showcase/button-showcase.component';
import { CalendarShowcaseComponent } from './calendar-showcase/calendar-showcase.component';
import { CardShowcaseComponent } from './card-showcase/card-showcase.component';
import { ChartShowcaseComponent } from './chart-showcase/chart-showcase.component';
import { CheckboxShowcaseComponent } from './checkbox-showcase/checkbox-showcase.component';
import { ColorsShowcaseComponent } from './colors-showcase/colors-showcase.component';
import { DataTableShowcaseComponent } from './data-table-showcase/data-table-showcase.component';
import { DividerShowcaseComponent } from './divider-showcase/divider-showcase.component';
import { DropdownShowcaseComponent } from './dropdown-showcase/dropdown-showcase.component';
import { EmptyStateShowcaseComponent } from './empty-state-showcase/empty-state-showcase.component';
import { FabSheetShowcaseComponent } from './fab-sheet-showcase/fab-sheet-showcase.component';
import { FlagShowcaseComponent } from './flag-showcase/flag-showcase.component';
import { FontsShowcaseComponent } from './fonts-showcase/fonts-showcase.component';
import { FormFieldShowcaseComponent } from './form-field-showcase/form-field-showcase.component';
import { GridShowcaseComponent } from './grid-showcase/grid-showcase.component';
import { IconShowcaseComponent } from './icon-showcase/icon-showcase.component';
import { ItemGroupShowcaseComponent } from './item-group-showcase/item-group-showcase.component';
import { ItemSlidingShowcaseComponent } from './item-sliding-showcase/item-sliding-showcase.component';
import { LinkShowcaseComponent } from './link-showcase/link-showcase.component';
import { ListExperimentalShowcaseComponent } from './list-experimental-showcase/list-experimental-showcase.component';
import { ListLoadOnDemandShowcaseComponent } from './list-load-on-demand-showcase/list-load-on-demand-showcase.component';
import { ListNoShapeShowcaseComponent } from './list-no-shape-showcase/list-no-shape-showcase.component';
import { ListShowcaseComponent } from './list-showcase/list-showcase.component';
import { ListSwipeShowcaseComponent } from './list-swipe-showcase/list-swipe-showcase.component';
import { LoadingOverlayShowcaseComponent } from './loading-overlay-showcase/loading-overlay-showcase.component';
import { ModalShowcaseComponent } from './modal-showcase/modal-showcase.component';
import { PageShowcaseComponent } from './page-showcase/page-showcase.component';
import { ProgressCircleShowcaseComponent } from './progress-circle-showcase/progress-circle-showcase.component';
import { RangeShowcaseComponent } from './range-showcase/range-showcase.component';
import { ReorderListShowcaseComponent } from './reorder-list-showcase/reorder-list-showcase.component';
import { SectionHeaderShowcaseComponent } from './section-header-showcase/section-header-showcase.component';
import { SegmentedControlShowcaseComponent } from './segmented-control-showcase/segmented-control-showcase.component';
import { ShowcaseComponent } from './showcase.component';
import { SlideButtonShowcaseComponent } from './slide-button-showcase/slide-button-showcase.component';
import { SlidesShowcaseComponent } from './slides-showcase/slides-showcase.component';
import { SpinnerShowcaseComponent } from './spinner-showcase/spinner-showcase.component';
import { StockChartShowcaseComponent } from './stock-chart-showcase/stock-chart-showcase.component';
import { StylingHtmlListsShowcaseComponent } from './styling-html-lists/styling-html-lists-showcase';
import { TabsShowcaseComponent } from './tabs-showcase/tabs-showcase.component';
import { ToastShowcaseComponent } from './toast-showcase/toast-showcase.component';
import { ToggleButtonShowcaseComponent } from './toggle-button-showcase/toggle-button-showcase.component';
import { ToggleShowcaseComponent } from './toggle-showcase/toggle-showcase.component';
import { ToolbarShowcaseComponent } from './toolbar-showcase/toolbar-showcase.component';
import { RadioShowcaseComponent } from './radio-showcase/radio-showcase.component';
import { CookbookChartStockConfigShowcaseComponent } from './chart-config-showcase/stock/chart-config-stock-showcase.component';
import { CookbookChartBarConfigShowcaseComponent } from './chart-config-showcase/bar/chart-config-bar-showcase.component';
import { HeaderShowcaseComponent } from './header-showcase/header-showcase.component';
import { MenuShowcaseComponent } from './menu-showcase/menu-showcase.component';

export const routes: Routes = [
  {
    path: '',
    component: ShowcaseComponent,
    children: [
      {
        path: '',
        redirectTo: 'button',
        pathMatch: 'full',
      },
      {
        path: 'item',
        component: ItemShowcaseComponent,
      },
      {
        path: 'item-sliding',
        component: ItemSlidingShowcaseComponent,
        data: {
          hide: true,
        },
      },
      {
        path: 'item-group',
        component: ItemGroupShowcaseComponent,
        data: {
          hide: true,
        },
      },
      {
        path: 'button',
        component: ButtonShowcaseComponent,
      },
      {
        path: 'slide-button',
        component: SlideButtonShowcaseComponent,
      },
      {
        path: 'divider',
        component: DividerShowcaseComponent,
      },
      {
        path: 'avatar',
        component: AvatarShowcaseComponent,
      },
      {
        path: 'card',
        component: CardShowcaseComponent,
      },
      {
        path: 'colors',
        component: ColorsShowcaseComponent,
      },
      {
        path: 'list',
        component: ListShowcaseComponent,
      },
      {
        path: 'list-load-on-demand',
        component: ListLoadOnDemandShowcaseComponent,
      },
      {
        path: 'list-swipe',
        component: ListSwipeShowcaseComponent,
      },
      {
        path: 'list-no-shape',
        component: ListNoShapeShowcaseComponent,
      },
      {
        path: 'list-experimental',
        component: ListExperimentalShowcaseComponent,
        data: {
          hide: true,
        },
      },
      {
        path: 'page',
        component: PageShowcaseComponent,
      },
      {
        path: 'tabs',
        component: TabsShowcaseComponent,
      },
      {
        path: 'grid',
        component: GridShowcaseComponent,
      },
      {
        path: 'chart',
        component: ChartShowcaseComponent,
      },
      { path: 'chart-stock', component: StockChartShowcaseComponent },
      {
        path: 'chart-stock-config',
        component: CookbookChartStockConfigShowcaseComponent,
        data: {
          hide: true, // hidden until we are ready to get users on it.
        },
      },
      {
        path: 'chart-bar-config',
        component: CookbookChartBarConfigShowcaseComponent,
        data: {
          hide: true, // hidden until we are ready to get users on it.
        },
      },
      {
        path: 'fonts',
        component: FontsShowcaseComponent,
      },
      {
        path: 'spinner',
        component: SpinnerShowcaseComponent,
      },
      {
        path: 'modal',
        component: ModalShowcaseComponent,
      },
      {
        path: 'loading-overlay',
        component: LoadingOverlayShowcaseComponent,
      },
      {
        path: 'action-sheet',
        component: ActionSheetShowcaseComponent,
      },
      {
        path: 'fab-sheet',
        component: FabSheetShowcaseComponent,
      },
      {
        path: 'alert',
        component: AlertShowcaseComponent,
      },
      {
        path: 'badge',
        component: BadgeShowcaseComponent,
      },
      {
        path: 'flag',
        component: FlagShowcaseComponent,
      },
      {
        path: 'icon',
        component: IconShowcaseComponent,
      },
      {
        path: 'checkbox',
        component: CheckboxShowcaseComponent,
      },
      {
        path: 'toast',
        component: ToastShowcaseComponent,
      },
      {
        path: 'toggle',
        component: ToggleShowcaseComponent,
      },
      {
        path: 'toggle-button',
        component: ToggleButtonShowcaseComponent,
      },
      {
        path: 'calendar',
        component: CalendarShowcaseComponent,
      },
      {
        path: 'segmented-control',
        component: SegmentedControlShowcaseComponent,
      },
      {
        path: 'empty-state',
        component: EmptyStateShowcaseComponent,
      },
      {
        path: 'toolbar',
        component: ToolbarShowcaseComponent,
      },
      {
        path: 'form-field',
        component: FormFieldShowcaseComponent,
      },
      {
        path: 'reorder-list',
        component: ReorderListShowcaseComponent,
      },
      {
        path: 'dropdown',
        component: DropdownShowcaseComponent,
      },
      {
        path: 'progress-circle',
        component: ProgressCircleShowcaseComponent,
      },
      {
        path: 'slides',
        component: SlidesShowcaseComponent,
      },
      {
        path: 'accordion',
        component: AccordionShowcaseComponent,
      },
      {
        path: 'menu',
        component: MenuShowcaseComponent,
      },
      {
        path: 'radio',
        component: RadioShowcaseComponent,
      },
      {
        path: 'range',
        component: RangeShowcaseComponent,
      },
      {
        path: 'link',
        component: LinkShowcaseComponent,
      },
      {
        path: 'section-header',
        component: SectionHeaderShowcaseComponent,
      },
      {
        path: 'styling-HTML-lists',
        component: StylingHtmlListsShowcaseComponent,
      },
      {
        path: 'data-table',
        component: DataTableShowcaseComponent,
      },
      {
        path: 'header',
        component: HeaderShowcaseComponent,
      },
    ],
  },
];
