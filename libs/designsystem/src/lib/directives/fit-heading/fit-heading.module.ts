import { NgModule } from '@angular/core';

import { FitHeadingDirective } from './fit-heading.directive';

@NgModule({
  declarations: [FitHeadingDirective],
  exports: [FitHeadingDirective],
})
export class FitHeadingModule {}
