import { Routes } from '@angular/router';

import { ListNoShapeExampleComponent } from './list/no-shape/list-no-shape-example.component';
import { AvatarExampleComponent } from './avatar-example/avatar-example.component';
import { ButtonExampleComponent } from './button-example/button-example.component';
import { CardExampleComponent } from './card-example/card-example.component';
import { GridExampleComponent } from './grid-example/grid-example.component';
import { ListExampleComponent } from './list/list-example.component';
import { ChartExampleComponent } from './chart-example/chart-example.component';
import { FontsExampleComponent } from './fonts-example/fonts-example.component';
import { SpinnerExampleComponent } from './spinner-example/spinner-example.component';
import { ModalExampleComponent } from './modal-example/modal-example.component';
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
import { ListSwipeExampleComponent } from './list/swipe/list-swipe-example.component';
import { ListLoadOnDemandExampleComponent } from './list/load-on-demand/list-load-on-demand-example.component';
import { FormFieldExampleComponent } from './form-field-example/form-field-example.component';
import { FabSheetExampleComponent } from './fab-sheet-example/fab-sheet-example.component';
import { PageSimpleExampleComponent } from './page-example/simple/page-simple-example.component';
import { PageAlignmentAndToolbarTitleExampleComponent } from './page-example/alignment-and-toolbar-title/page-alignment-and-toolbar-title-example.component';
import { PageFixedTitleAndActionsExampleComponent } from './page-example/fixed-title-and-actions/page-fixed-title-and-actions-example.component';
import { PageAdvancedExampleComponent } from './page-example/advanced/page-advanced-example.component';
import { ExamplesComponent } from './examples.component';
import { TabsExampleComponent } from './tabs/tabs-example.component';
import { TabExampleComponent } from './tabs/tab/tab-example.component';

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
            path: 'fixed',
            component: PageFixedTitleAndActionsExampleComponent,
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
    ],
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
    path: 'modal',
    component: ModalExampleComponent,
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
];
