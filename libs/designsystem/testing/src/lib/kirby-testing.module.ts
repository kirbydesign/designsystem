import { NgModule } from '@angular/core';

import { MOCK_COMPONENTS } from './mock-components';

@NgModule({
  declarations: [MOCK_COMPONENTS],
  exports: [MOCK_COMPONENTS],
})
export class KirbyTestingModule {}
