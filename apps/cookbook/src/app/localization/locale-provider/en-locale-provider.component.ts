import { Component, LOCALE_ID } from '@angular/core';
import { TranslationService } from '@kirbydesign/designsystem/shared';

@Component({
  selector: 'cookbook-en-locale-provider',
  template: '<ng-content></ng-content>',
  standalone: true,
  providers: [{ provide: LOCALE_ID, useValue: 'en' }, TranslationService],
})
export class EnLocaleProviderComponent {}
