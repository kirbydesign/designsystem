import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
  ActionGroupComponent,
  AvatarComponent,
  ButtonComponent,
  FlagComponent,
  HeaderModule,
  IconModule,
  ProgressCircleComponent,
  ToastController,
  ToastHelper,
} from '@kirbydesign/designsystem';

import { BadgeComponent } from '@kirbydesign/designsystem/badge';

import { HeaderExampleComponent } from './header-example.component';
import { HeaderExampleDefaultComponent } from './examples/default';
import { HeaderExampleSubtitleListComponent } from './examples/subtitles';
import { HeaderExampleAvatarComponent } from './examples/avatar';
import { HeaderExampleProgressCircleWithAvatarComponent } from './examples/progress-circle-with-avatar';
import { HeaderExampleFlagComponent } from './examples/flag';
import { HeaderExampleValueComponent } from './examples/value';
import { HeaderExampleCombinedComponent } from './examples/combined';
import { HeaderExampleCustomSectionComponent } from './examples/custom-section';
import { HeaderExampleTitleScalingComponent } from './examples/title-scaling';
import { HeaderExampleCustomFlagComponent } from './examples/custom-flag';
import { HeaderExampleSubtitleDirectiveComponent } from '~/app/examples/header-example/examples/subtitle-directive';

const COMPONENT_DECLARATIONS = [
  HeaderExampleComponent,
  HeaderExampleDefaultComponent,
  HeaderExampleSubtitleListComponent,
  HeaderExampleAvatarComponent,
  HeaderExampleProgressCircleWithAvatarComponent,
  HeaderExampleFlagComponent,
  HeaderExampleValueComponent,
  HeaderExampleCombinedComponent,
  HeaderExampleCustomSectionComponent,
  HeaderExampleCustomFlagComponent,
  HeaderExampleTitleScalingComponent,
  HeaderExampleSubtitleDirectiveComponent,
];

@NgModule({
  declarations: COMPONENT_DECLARATIONS,
  imports: [
    CommonModule,
    AvatarComponent,
    ActionGroupComponent,
    BadgeComponent,
    ButtonComponent,
    FlagComponent,
    HeaderModule,
    ProgressCircleComponent,
    IconModule,
  ],
  providers: [ToastController, ToastHelper],
  exports: COMPONENT_DECLARATIONS,
})
export class HeaderExampleModule {}
