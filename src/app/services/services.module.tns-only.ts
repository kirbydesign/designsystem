import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { FpsService } from './fps.service.tns-only';

@NgModule({
  providers: [FpsService],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ServicesModule {}
