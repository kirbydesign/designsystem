import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ExamplesModule } from './examples.module';
import { routes } from './examples.routes';

@NgModule({
  imports: [RouterModule.forChild(routes), ExamplesModule],
  exports: [RouterModule],
})
export class ExamplesRoutingModule {}
