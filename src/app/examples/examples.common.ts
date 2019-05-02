import { AvatarExampleComponent } from './avatar-example/avatar-example.component';
import { ButtonExampleComponent } from './button-example/button-example.component';
import { FloatingActionButtonExampleComponent } from './floating-action-button-example/floating-action-button-example.component';
import { CardExampleComponent } from './card-example/card-example.component';
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
import { SegmentedChipControlExampleComponent } from './segmented-chip-control-example/segmented-chip-control-example.component';
import {
  CUSTOM_FONT_SETTINGS,
  CustomIconSettings,
} from '~/kirby/components/icon/custom-icon-settings';

export const customIconSettings: CustomIconSettings = {
  fontfamily: "'Ionicons', 'ionicons'",
  icons: [
    {
      name: 'horse',
      svg: 'assets/icons/sprites/office.svg',
      unicode: '0xf331',
    },
    {
      name: 'happy',
      svg: 'assets/icons/happy.svg',
      unicode: '0xf389',
    },
  ],
};

export const COMPONENT_DECLARATIONS: any[] = [
  ButtonExampleComponent,
  FloatingActionButtonExampleComponent,
  CardExampleComponent,
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
];

export const PROVIDER_DECLARATIONS: any[] = [
  { provide: CUSTOM_FONT_SETTINGS, useValue: customIconSettings, multi: true },
];
