import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { provideKirby } from '@kirbydesign/designsystem';
import { EXAMPLE_ROUTES } from './examples.routes';

@NgModule({
  imports: [RouterModule.forChild(EXAMPLE_ROUTES)],
  exports: [RouterModule],
  providers: [provideKirby()],
})
export class ExamplesRoutingModule {}
