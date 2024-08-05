import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BadgeComponent } from '@kirbydesign/designsystem/badge';
import { CardModule } from '@kirbydesign/designsystem/card';
import { IconModule } from '@kirbydesign/designsystem/icon';

import { BadgeExampleComponent } from './badge-example.component';
import { BadgeExampleIconComponent } from './examples/badge-example-icon.component';
import { BadgeExampleNumberComponent } from './examples/badge-example-number.component';
import { BadgeExampleSmallComponent } from './examples/badge-example-small.component';
import { BadgeExampleTextComponent } from './examples/badge-example-text.component';

const COMPONENT_DECLARATIONS = [
  BadgeExampleComponent,
  BadgeExampleIconComponent,
  BadgeExampleNumberComponent,
  BadgeExampleTextComponent,
  BadgeExampleSmallComponent,
];

@NgModule({
  declarations: COMPONENT_DECLARATIONS,
  imports: [CommonModule, BadgeComponent, CardModule, IconModule],
  exports: COMPONENT_DECLARATIONS,
})
export class BadgeExampleModule {}
