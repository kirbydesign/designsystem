import { Routes } from '@angular/router';

import { AvatarExampleComponent } from './avatar-example/avatar-example.component';
import { ButtonExampleComponent } from './button-example/button-example.component';
import { FloatingActionButtonExampleComponent } from './floating-action-button-example/floating-action-button-example.component';
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
import { SegmentedChipControlExampleComponent } from './segmented-chip-control-example/segmented-chip-control-example.component';
import { ActionSheetExampleComponent } from './action-sheet-example/action-sheet-example.component';
import { AlertExampleComponent } from './alert-example/alert-example.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'grid',
  },
  {
    path: 'button',
    component: ButtonExampleComponent,
  },
  {
    path: 'floating-action-button',
    component: FloatingActionButtonExampleComponent,
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
    path: 'segmented-chip-control',
    component: SegmentedChipControlExampleComponent,
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
    path: 'calendar',
    component: CalendarExampleComponent,
  },
  {
    path: 'calendar-card',
    component: CalendarCardExampleComponent,
  },
];
