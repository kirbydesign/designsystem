import { NgModule } from '@angular/core';

import { MOCK_COMPONENTS } from './mock-components';
import { MOCK_DIRECTIVES } from './mock-directives';

@NgModule({
  declarations: [MOCK_COMPONENTS, MOCK_DIRECTIVES],
  exports: [MOCK_COMPONENTS, MOCK_DIRECTIVES],
})
export class KirbyTestingBaseModule {}
