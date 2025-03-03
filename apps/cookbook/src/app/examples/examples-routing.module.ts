import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { KirbyModule } from '@kirbydesign/designsystem';
import { EXAMPLE_ROUTES } from './examples.routes';

@NgModule({
  imports: [RouterModule.forChild(EXAMPLE_ROUTES), KirbyModule],
  exports: [RouterModule],
})
export class ExamplesRoutingModule {}
