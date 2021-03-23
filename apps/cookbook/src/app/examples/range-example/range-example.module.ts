import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RangeStepExampleComponent } from '~/app/examples/range-example/examples/step.component';

import { KirbyModule } from '@kirbydesign/designsystem';

import { RangeDefaultExampleComponent } from './examples/default.component';
import { RangeDisabledFormExampleComponent } from './examples/disabled.form.component';
import { RangeWithVisibleValueExampleComponent } from './examples/rangeWithVisibleValue.component';
import { RangeExampleComponent } from './range-example.component';

const COMPONENT_DECLARATIONS = [
  RangeExampleComponent,
  RangeDefaultExampleComponent,
  RangeWithVisibleValueExampleComponent,
  RangeStepExampleComponent,
  RangeDisabledFormExampleComponent,
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    KirbyModule,
    IonicModule.forRoot({
      mode: 'ios',
      inputShims: true,
      scrollAssist: true,
      scrollPadding: false,
    }),
  ],
  declarations: COMPONENT_DECLARATIONS,
  exports: COMPONENT_DECLARATIONS,
})
export class RangeExampleModule {}
