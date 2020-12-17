import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KirbyModule } from '@kirbydesign/designsystem';

import { CheckboxDefaultExampleComponent } from './examples/default';
import { CheckboxListExampleComponent } from './examples/list';
import { CheckboxConfirmExampleComponent } from './examples/confirm';
import { CheckboxStatesExampleComponent } from './examples/states';
import { CheckboxEventsExampleComponent } from './examples/events';

const COMPONENT_DECLARATIONS = [
  CheckboxDefaultExampleComponent,
  CheckboxListExampleComponent,
  CheckboxConfirmExampleComponent,
  CheckboxStatesExampleComponent,
  CheckboxEventsExampleComponent,
];

@NgModule({
  imports: [CommonModule, KirbyModule],
  declarations: COMPONENT_DECLARATIONS,
  exports: COMPONENT_DECLARATIONS,
})
export class CheckboxExampleModule {}
