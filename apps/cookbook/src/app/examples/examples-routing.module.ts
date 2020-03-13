import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { routes } from './examples.routes';
import { ExamplesModule } from './examples.module';

@NgModule({
  imports: [RouterModule.forChild(routes), ExamplesModule],
  exports: [RouterModule],
})
export class ExamplesRoutingModule {}
