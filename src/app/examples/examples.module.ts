import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KirbyModule } from '@kirbydesign/designsystem';
import { COMPONENT_DECLARATIONS, PROVIDER_DECLARATIONS } from './examples.common';
import { CardExampleComponent } from './card-example/card-example.component';
import { FirstEmbeddedModalExampleComponent } from './modal-example/first-embedded-modal-example/first-embedded-modal-example.component';
import { SecondEmbeddedModalExampleComponent } from './modal-example/second-embedded-modal-example/second-embedded-modal-example.component';
import { FormFieldExamplesModule } from './form-field-example/form-field-example.module';
import { ListExamplesModule } from '~/app/examples/list/list-example.module';

@NgModule({
  imports: [CommonModule, KirbyModule, FormFieldExamplesModule, ListExamplesModule],
  declarations: COMPONENT_DECLARATIONS,
  exports: [...COMPONENT_DECLARATIONS, FormFieldExamplesModule, ListExamplesModule],
  providers: [PROVIDER_DECLARATIONS],
  entryComponents: [
    CardExampleComponent,
    FirstEmbeddedModalExampleComponent,
    SecondEmbeddedModalExampleComponent,
  ],
})
export class ExamplesModule {}
