import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { KirbyModule } from '@kirbydesign/designsystem';

import { RadioExampleComponent } from './radio-example.component';
import { RadioDefaultExampleComponent } from './examples/default';
import { RadioExampleBindingComponent } from './examples/binding';
import { RadioInItemExampleComponent } from './examples/in-item';
import { RadioCustomContentExampleComponent } from './examples/custom';
import { RadioInListExampleComponent } from './examples/list';

const COMPONENT_DECLARATIONS = [
  RadioExampleComponent,
  RadioDefaultExampleComponent,
  RadioCustomContentExampleComponent,
  RadioInItemExampleComponent,
  RadioInListExampleComponent,
  RadioExampleBindingComponent,
];

@NgModule({
  imports: [CommonModule, KirbyModule, FormsModule, ReactiveFormsModule],
  declarations: COMPONENT_DECLARATIONS,
  exports: COMPONENT_DECLARATIONS,
})
export class RadioExampleModule {}
