import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EXAMPLE_ROUTES } from './examples.routes';

@NgModule({
  imports: [RouterModule.forChild(EXAMPLE_ROUTES)],
  exports: [RouterModule],
})
export class ExamplesRoutingModule {}
