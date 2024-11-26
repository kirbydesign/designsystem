import { Component } from '@angular/core';

import { CardModule } from '@kirbydesign/designsystem/card';
import { CalendarComponent } from '@kirbydesign/designsystem/calendar';
import { TranslationService } from '@kirbydesign/designsystem/shared';
import { AvatarComponent } from '@kirbydesign/designsystem/avatar';
import { CodeViewerModule } from '../shared/code-viewer/code-viewer.module';
import { ExamplesModule } from '../examples/examples.module';
import { ShowcaseModule } from '../showcase/showcase.module';
import { DaLocaleProviderComponent } from './locale-provider/da-locale-provider.component';
import { EnLocaleProviderComponent } from './locale-provider/en-locale-provider.component';

@Component({
  selector: 'cookbook-localization',
  templateUrl: './localization.component.html',
  styleUrls: ['./localization.component.scss'],
  standalone: true,
  imports: [
    CodeViewerModule,
    ShowcaseModule,
    ExamplesModule,
    DaLocaleProviderComponent,
    EnLocaleProviderComponent,
    CalendarComponent,
    CardModule,
    AvatarComponent,
  ],
})
export class LocalizationComponent {
  constructor(public translations: TranslationService) {}
  selectedDate: Date = new Date(2025, 0, 1);
}
