import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { routes } from './showcase.routes';

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowcaseRoutingModule {}
