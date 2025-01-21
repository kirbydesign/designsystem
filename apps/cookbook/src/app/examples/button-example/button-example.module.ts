import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { CardModule } from '@kirbydesign/designsystem/card';
import { DropdownModule } from '@kirbydesign/designsystem/dropdown';
import { IconModule } from '@kirbydesign/designsystem/icon';

import { ButtonExampleComponent } from './button-example.component';
import { ButtonExampleDefaultComponent } from './examples/default';
import { ButtonExampleSizesComponent } from './examples/sizes';
import { ButtonExampleBlockComponent } from './examples/block';
import { ButtonExampleAttentionLevelComponent } from './examples/attention-level';
import { ButtonExampleIconsComponent } from './examples/icons';
import { ButtonExampleIconOnlyComponent } from './examples/icon-only';
import { ButtonExampleDisabledComponent } from './examples/disabled';
import { ButtonExampleAriaDisabledComponent } from './examples/aria-disabled';
import { ButtonExampleUndecoratedComponent } from './examples/undecorated';
import { ButtonExampleLinkComponent } from './examples/link';

const COMPONENT_DECLARATIONS = [
  ButtonExampleComponent,
  ButtonExampleDefaultComponent,
  ButtonExampleSizesComponent,
  ButtonExampleBlockComponent,
  ButtonExampleAttentionLevelComponent,
  ButtonExampleIconsComponent,
  ButtonExampleIconOnlyComponent,
  ButtonExampleDisabledComponent,
  ButtonExampleAriaDisabledComponent,
  ButtonExampleUndecoratedComponent,
  ButtonExampleLinkComponent,
];

@NgModule({
  imports: [
    CommonModule,
    ButtonComponent,
    CardModule,
    DropdownModule,
    IconModule,
    ...COMPONENT_DECLARATIONS,
  ],
  exports: COMPONENT_DECLARATIONS,
})
export class ButtonExampleModule {}
