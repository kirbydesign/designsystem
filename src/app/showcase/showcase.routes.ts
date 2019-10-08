import { Routes } from '@angular/router';

import { ListSwipeShowcaseComponent } from './list-swipe-showcase/list-swipe-showcase.component';
import { AvatarShowcaseComponent } from './avatar-showcase/avatar-showcase.component';
import { ButtonShowcaseComponent } from './button-showcase/button-showcase.component';
import { CardShowcaseComponent } from './card-showcase/card-showcase.component';
import { GridShowcaseComponent } from './grid-showcase/grid-showcase.component';
import { ListShowcaseComponent } from './list-showcase/list-showcase.component';
import { ListLoadOnDemandShowcaseComponent } from './list-load-on-demand-showcase/list-load-on-demand-showcase.component';
import { ShowcaseComponent } from './showcase.component';
import { ChartShowcaseComponent } from './chart-showcase/chart-showcase.component';
import { FontsShowcaseComponent } from './fonts-showcase/fonts-showcase.component';
import { ColorsShowcaseComponent } from './colors-showcase/colors-showcase.component';
import { SpinnerShowcaseComponent } from './spinner-showcase/spinner-showcase.component';
import { ModalShowcaseComponent } from './modal-showcase/modal-showcase.component';
import { SegmentedControlShowcaseComponent } from './segmented-control-showcase/segmented-control-showcase.component';
import { ChipShowcaseComponent } from './chip-showcase/chip-showcase.component';
import { BadgeShowcaseComponent } from './badge-showcase/badge-showcase.component';
import { IconShowcaseComponent } from './icon-showcase/icon-showcase.component';
import { CalendarShowcaseComponent } from './calendar-showcase/calendar-showcase.component';
import { CheckboxShowcaseComponent } from './checkbox-showcase/checkbox-showcase.component';
import { ActionSheetShowcaseComponent } from './action-sheet-showcase/action-sheet-showcase.component';
import { AlertShowcaseComponent } from './alert-showcase/alert-showcase.component';
import { SlideButtonShowcaseComponent } from './slide-button-showcase/slide-button-showcase.component';
import { ToastShowcaseComponent } from './toast-showcase/toast-showcase.component';
import { ToggleShowcaseComponent } from './toggle-showcase/toggle-showcase.component';
import { EmptyStateShowcaseComponent } from './empty-state-showcase/empty-state-showcase.component';
import { LoadingOverlayShowcaseComponent } from './loading-overlay-showcase/loading-overlay-showcase.component';
import { ToolbarShowcaseComponent } from './toolbar-showcase/toolbar-showcase.component';
import { FormFieldShowcaseComponent } from './form-field-showcase/form-field-showcase.component';
import { ListNoShapeShowcaseComponent } from './list-no-shape-showcase/list-no-shape-showcase.component';
import { FabSheetShowcaseComponent } from './fab-sheet-showcase/fab-sheet-showcase.component';
import { PageShowcaseComponent } from './page-showcase/page-showcase.component';
import { TabsShowcaseComponent } from './tabs-showcase/tabs-showcase.component';

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
        path: 'button',
        component: ButtonShowcaseComponent,
      },
      {
        path: 'slide-button',
        component: SlideButtonShowcaseComponent,
      },
      {
        path: 'chip',
        component: ChipShowcaseComponent,
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
    ],
  },
];
