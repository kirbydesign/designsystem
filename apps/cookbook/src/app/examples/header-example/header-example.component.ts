import { Component } from '@angular/core';
import { ToastController, ToastHelper } from '@kirbydesign/designsystem/toast';
import { HeaderExampleDefaultComponent } from './examples/default';
import { HeaderExampleSubtitleListComponent } from './examples/subtitles';
import { HeaderExampleFlagComponent } from './examples/flag';
import { HeaderExampleCustomFlagComponent } from './examples/custom-flag';
import { HeaderExampleValueComponent } from './examples/value';
import { HeaderExampleAvatarComponent } from './examples/avatar';
import { HeaderExampleProgressCircleWithAvatarComponent } from './examples/progress-circle-with-avatar';
import { HeaderExampleTitleScalingComponent } from './examples/title-scaling';
import { HeaderExampleCustomSectionComponent } from './examples/custom-section';
import { HeaderExampleCombinedComponent } from './examples/combined';

@Component({
  selector: 'cookbook-header-example',
  templateUrl: './header-example.component.html',
  styleUrls: ['./header-example.component.scss'],
  imports: [
    HeaderExampleDefaultComponent,
    HeaderExampleSubtitleListComponent,
    HeaderExampleFlagComponent,
    HeaderExampleCustomFlagComponent,
    HeaderExampleValueComponent,
    HeaderExampleAvatarComponent,
    HeaderExampleProgressCircleWithAvatarComponent,
    HeaderExampleTitleScalingComponent,
    HeaderExampleCustomSectionComponent,
    HeaderExampleCombinedComponent,
  ],
  providers: [ToastHelper, ToastController],
})
export class HeaderExampleComponent {}
