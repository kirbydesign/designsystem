import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KirbyModule } from '@kirbydesign/designsystem';

import { CheckboxSingleExampleComponent } from './examples/single';
import { CheckboxMultiExampleComponent } from './examples/multi';
import { CheckboxMultiListExampleComponent } from './examples/multi-list';

const COMPONENT_DECLARATIONS = [
  CheckboxSingleExampleComponent,
  CheckboxMultiExampleComponent,
  CheckboxMultiListExampleComponent,
];

@NgModule({
  imports: [CommonModule, KirbyModule],
  declarations: COMPONENT_DECLARATIONS,
  exports: COMPONENT_DECLARATIONS,
})
export class CheckboxExampleModule {}
