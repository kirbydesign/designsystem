import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KirbyModule } from '../../kirby/kirby.module';
import { COMPONENT_DECLARATIONS } from './examples.common';
import { CardExampleComponent } from './card-example/card-example.component';
import { FirstEmbeddedModalExampleComponent } from './modal-example/first-embedded-modal-example/first-embedded-modal-example.component';
import { SecondEmbeddedModalExampleComponent } from './modal-example/second-embedded-modal-example/second-embedded-modal-example.component';
import {
  CustomIconSettings,
  CUSTOM_FONT_SETTINGS,
} from '../../kirby/components/icon/custom-icon-settings';

export const customIconSettings: CustomIconSettings = {
  font: '[PATH_TO_TTF_FILE]',
  icons: [
    {
      name: 'horse',
      svg: '[PATH_TO_SVG_FILE]',
      unicode: '[UNICODE_FROM_TTF_FILE]',
    },
    {
      name: 'happy',
      svg: 'assets/icons/happy.svg',
      unicode: '0xf389',
    },
  ],
};

@NgModule({
  imports: [CommonModule, KirbyModule],
  declarations: COMPONENT_DECLARATIONS,
  exports: COMPONENT_DECLARATIONS,
  providers: [
    {
      provide: CUSTOM_FONT_SETTINGS,
      useValue: customIconSettings,
      multi: true,
    },
  ],
  entryComponents: [
    CardExampleComponent,
    FirstEmbeddedModalExampleComponent,
    SecondEmbeddedModalExampleComponent,
  ],
})
export class ExamplesModule {}
