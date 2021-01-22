import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { KirbyModule } from '@kirbydesign/designsystem';
import { RangeExampleComponent } from './range-example.component';
import { RangeDefaultExampleComponent } from './examples/default';
import { RangeWithVisibleValueExampleComponent } from './examples/rangewithvisiblevalue';
import { RangeWithColorExampleComponent } from './examples/rangewithcolor';
import { RangeStepExampleComponent } from '~/app/examples/range-example/examples/step';

const COMPONENT_DECLARATIONS = [
  RangeExampleComponent,
  RangeDefaultExampleComponent,
  RangeWithVisibleValueExampleComponent,
  RangeWithColorExampleComponent,
  RangeStepExampleComponent,
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
