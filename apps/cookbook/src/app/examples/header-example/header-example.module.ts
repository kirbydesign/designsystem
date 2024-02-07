import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { KirbyModule } from '@kirbydesign/designsystem';

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
];

@NgModule({
  declarations: COMPONENT_DECLARATIONS,
  imports: [CommonModule, KirbyModule],
  exports: COMPONENT_DECLARATIONS,
})
export class HeaderExampleModule {}
