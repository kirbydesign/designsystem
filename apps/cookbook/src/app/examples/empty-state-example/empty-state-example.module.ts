import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { IconModule } from '@kirbydesign/designsystem/icon';

import { EmptyStateModule } from '@kirbydesign/designsystem/empty-state';
import { EmptyStateMessageTypesExampleComponent } from './examples/message-types';
import { EmptyStateButtonsExampleComponent } from './examples/buttons';
import { EmptyStateExampleComponent } from './empty-state-example.component';
import { EmptyStateSimpleExampleComponent } from './examples/simple';

const COMPONENT_DECLARATIONS = [
  EmptyStateExampleComponent,
  EmptyStateButtonsExampleComponent,
  EmptyStateMessageTypesExampleComponent,
  EmptyStateSimpleExampleComponent,
];

@NgModule({
  imports: [CommonModule, EmptyStateModule, ButtonComponent, IconModule, ...COMPONENT_DECLARATIONS],
  exports: COMPONENT_DECLARATIONS,
})
export class EmptyStateExampleModule {}
