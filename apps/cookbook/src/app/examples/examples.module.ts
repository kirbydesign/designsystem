import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KirbyModule } from '@kirbydesign/designsystem';
import { COMPONENT_DECLARATIONS, PROVIDER_DECLARATIONS } from './examples.common';
import { CardExampleComponent } from './card-example/card-example.component';
import { FirstEmbeddedModalExampleComponent } from './modal-example/first-embedded-modal-example/first-embedded-modal-example.component';
import { SecondEmbeddedModalExampleComponent } from './modal-example/second-embedded-modal-example/second-embedded-modal-example.component';
import { ModalCompactExampleComponent } from './modal-example/compact-example/modal-compact-example.component';
import { FormFieldExamplesModule } from './form-field-example/form-field-example.module';
import { ListExamplesModule } from './list/list-example.module';
import { ItemExampleModule } from './item-example/item-example.module';
import { DropdownExampleModule } from './dropdown-example/dropdown-example.module';

@NgModule({
  imports: [
    CommonModule,
    KirbyModule,
    FormFieldExamplesModule,
    ItemExampleModule,
    ListExamplesModule,
    DropdownExampleModule,
  ],
  declarations: COMPONENT_DECLARATIONS,
  exports: [
    ...COMPONENT_DECLARATIONS,
    FormFieldExamplesModule,
    ItemExampleModule,
    ListExamplesModule,
    DropdownExampleModule,
  ],
  providers: [PROVIDER_DECLARATIONS],
  entryComponents: [
    CardExampleComponent,
    FirstEmbeddedModalExampleComponent,
    SecondEmbeddedModalExampleComponent,
    ModalCompactExampleComponent,
  ],
})
export class ExamplesModule {}
