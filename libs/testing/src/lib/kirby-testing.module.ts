import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MOCK_COMPONENTS } from './mock-components';

@NgModule({
  imports: [CommonModule],
  declarations: [MOCK_COMPONENTS],
  exports: [MOCK_COMPONENTS],
})
export class KirbyTestingModule {}
