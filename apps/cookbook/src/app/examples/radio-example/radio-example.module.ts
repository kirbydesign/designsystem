import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { KirbyModule } from '@kirbydesign/designsystem';

import { RadioExampleBindingComponent } from './examples/binding';
import { RadioCustomContentExampleComponent } from './examples/custom';
import { RadioDefaultExampleComponent } from './examples/default';
import { RadioInFormFieldExampleComponent } from './examples/in-form-field';
import { RadioInItemExampleComponent } from './examples/in-item';
import { RadioInListExampleComponent } from './examples/list';
import { RadioSizesExampleComponent } from './examples/sizes';
import { RadioStatesExampleComponent } from './examples/states';
import { RadioExampleComponent } from './radio-example.component';

const COMPONENT_DECLARATIONS = [
  RadioExampleComponent,
  RadioDefaultExampleComponent,
  RadioStatesExampleComponent,
  RadioSizesExampleComponent,
  RadioCustomContentExampleComponent,
  RadioInFormFieldExampleComponent,
  RadioInItemExampleComponent,
  RadioInListExampleComponent,
  RadioExampleBindingComponent,
];

@NgModule({
  imports: [CommonModule, KirbyModule],
  declarations: COMPONENT_DECLARATIONS,
  exports: COMPONENT_DECLARATIONS,
})
export class RadioExampleModule {}
