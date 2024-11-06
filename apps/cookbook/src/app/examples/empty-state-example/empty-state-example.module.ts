import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { IconModule } from '@kirbydesign/designsystem/icon';

import { EmptyStateModule } from '@kirbydesign/designsystem/empty-state';
import { EmptyStateMessageTypesExampleComponent } from './examples/message-types';
import { EmptyStateButtonsExampleComponent } from './examples/buttons';
import { EmptyStateExampleComponent } from './empty-state-example.component';

const COMPONENT_DECLARATIONS = [
  EmptyStateExampleComponent,
  EmptyStateButtonsExampleComponent,
  EmptyStateMessageTypesExampleComponent,
];

@NgModule({
  declarations: COMPONENT_DECLARATIONS,
  imports: [CommonModule, EmptyStateModule, ButtonComponent, IconModule],
  exports: COMPONENT_DECLARATIONS,
})
export class EmptyStateExampleModule {}
