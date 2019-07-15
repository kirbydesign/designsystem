import { IconSettings, ICON_SETTINGS } from '@kirbydesign/designsystem';

import { AvatarExampleComponent } from './avatar-example/avatar-example.component';
import { ButtonExampleComponent } from './button-example/button-example.component';
import { FloatingActionButtonExampleComponent } from './floating-action-button-example/floating-action-button-example.component';
import { CardExampleComponent } from './card-example/card-example.component';
import { CardThemecolorExampleComponent } from './card/card-themecolor-example/card-themecolor-example.component';
import { CardElevationsExampleComponent } from './card/card-elevations-example/card-elevations-example.component';
import { GridExampleComponent } from './grid-example/grid-example.component';
import { ListExampleComponent } from './list/list-example.component';
import { ListLoadOnDemandExampleComponent } from './list/load-on-demand/list-load-on-demand-example.component';
import { ChartExampleComponent } from './chart-example/chart-example.component';
import { FontsExampleComponent } from './fonts-example/fonts-example.component';
import { SpinnerExampleComponent } from './spinner-example/spinner-example.component';
import { ModalExampleComponent } from './modal-example/modal-example.component';
import { FirstEmbeddedModalExampleComponent } from './modal-example/first-embedded-modal-example/first-embedded-modal-example.component';
import { SecondEmbeddedModalExampleComponent } from './modal-example/second-embedded-modal-example/second-embedded-modal-example.component';
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
import { SlideButtonExampleComponent } from './slide-button-example/slide-button-example.component';
import { ToastExampleComponent } from './toast-example/toast-example.component';
import { ToggleExampleComponent } from './toggle-example/toggle-example.component';
import { EmptyStateExampleComponent } from './empty-state-example/empty-state-example.component';

// Example of "custom" icons
export const iconSettings: IconSettings = {
  fontfamily: "'Ionicons', 'ionicons'",
  icons: [
    {
      name: 'football',
      svg: 'assets/icons/football.svg',
      unicode: 0xf2f6,
    },
    {
      name: 'umbrella',
      svg: 'assets/icons/umbrella.svg',
      unicode: 0xf25f,
    },
  ],
};

export const COMPONENT_DECLARATIONS: any[] = [
  ButtonExampleComponent,
  SlideButtonExampleComponent,
  FloatingActionButtonExampleComponent,
  CardExampleComponent,
  CardThemecolorExampleComponent,
  CardElevationsExampleComponent,
  ListExampleComponent,
  ListLoadOnDemandExampleComponent,
  GridExampleComponent,
  AvatarExampleComponent,
  ChartExampleComponent,
  FontsExampleComponent,
  SpinnerExampleComponent,
  ModalExampleComponent,
  FirstEmbeddedModalExampleComponent,
  SecondEmbeddedModalExampleComponent,
  SegmentedControlExampleComponent,
  SegmentedChipControlExampleComponent,
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
];

// Configure custom icons (used by example to show the usage of custom icons)
export const PROVIDER_DECLARATIONS: any[] = [{ provide: ICON_SETTINGS, useValue: iconSettings }];
