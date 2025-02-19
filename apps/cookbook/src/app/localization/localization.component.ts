import { Component } from '@angular/core';

import { CardModule } from '@kirbydesign/designsystem/card';
import { CalendarComponent } from '@kirbydesign/designsystem/calendar';
import { TranslationService } from '@kirbydesign/designsystem/shared';
import { AvatarComponent } from '@kirbydesign/designsystem/avatar';

import { CodeViewerComponent } from '../shared/code-viewer/code-viewer.component';
import { ExampleViewerComponent } from '../shared/example-viewer/example-viewer.component';
import { DaLocaleProviderComponent } from './locale-provider/da-locale-provider.component';
import { EnLocaleProviderComponent } from './locale-provider/en-locale-provider.component';
import { DeLocaleProviderComponent } from './locale-provider/de-locale-provider.component';

@Component({
  selector: 'cookbook-localization',
  templateUrl: './localization.component.html',
  styleUrls: ['./localization.component.scss'],
  imports: [
    ExampleViewerComponent,
    CodeViewerComponent,
    DaLocaleProviderComponent,
    EnLocaleProviderComponent,
    DeLocaleProviderComponent,
    CalendarComponent,
    CardModule,
    AvatarComponent,
  ],
})
export class LocalizationComponent {
  localeConfigCodeSnippet = `import { registerLocaleData } from '@angular/common';
import localeData from '@angular/common/locales/da';
import { LOCALE_ID, NgModule } from '@angular/core';

registerLocaleData(localeData);

@NgModule({
  ...,
  providers: [
    { provide: LOCALE_ID, useValue: 'da' },
  ],
})
export class AppModule {}`;
  translationGetterCodeSnippet = `constructor(private translationService: TranslationService) {}

get previousMonthLabel(): string {
  return this.translationService.get('previousMonth');
}`;

  constructor(public translations: TranslationService) {}
  selectedDate: Date = new Date(2025, 0, 1);
}
