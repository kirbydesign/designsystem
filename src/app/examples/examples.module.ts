import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KirbyModule } from '../../kirby/kirby.module';
import { COMPONENT_DECLARATIONS } from './examples.common';
import { CardExampleComponent } from './card-example/card-example.component';

@NgModule({
  imports: [
    CommonModule,
    KirbyModule
  ],
  declarations: COMPONENT_DECLARATIONS,
  exports: COMPONENT_DECLARATIONS,
  entryComponents: [CardExampleComponent]
})
export class ExamplesModule { }
