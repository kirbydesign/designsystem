import { Component, LOCALE_ID } from '@angular/core';
import { TranslationService } from '@kirbydesign/designsystem/shared';

@Component({
  selector: 'cookbook-da-locale-provider',
  template: '<ng-content></ng-content>',
  standalone: true,
  providers: [{ provide: LOCALE_ID, useValue: 'da' }, TranslationService],
})
export class DaLocaleProviderComponent {}
