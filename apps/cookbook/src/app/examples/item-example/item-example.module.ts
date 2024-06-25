import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemModule } from '@kirbydesign/designsystem/item';
import { BadgeComponent } from '@kirbydesign/designsystem/badge';
import { FlagComponent } from '@kirbydesign/designsystem/flag';
import { IconModule } from '@kirbydesign/designsystem/icon';
import { ToggleComponent } from '@kirbydesign/designsystem/toggle';
import { AvatarComponent } from '@kirbydesign/designsystem/avatar';
import { CheckboxComponent } from '@kirbydesign/designsystem/checkbox';
import { CardModule } from '@kirbydesign/designsystem/card';
import { ItemExampleComponent } from './item-example.component';
import { ItemExampleSimpleComponent } from './examples/simple/default';
import { ItemExampleLongTitleComponent } from './examples/simple/long-title';
import { ItemExampleSimpleTwoLinesComponent } from './examples/simple/two-lines';
import { ItemExampleSimpleTwoValueLinesComponent } from './examples/simple/two-value-lines';
import { ItemExampleSimpleThreeLinesComponent } from './examples/simple/three-lines';
import { ItemExamplePickerDefaultComponent } from './examples/picker/default';
import { ItemExamplePickerDefaultSelectedComponent } from './examples/picker/default-selected';
import { ItemExamplePickerAvatarSelectedComponent } from './examples/picker/avatar-selected';
import { ItemExamplePickerCheckboxComponent } from './examples/picker/checkbox';
import { ItemExampleFabMenuComponent } from './examples/fab-menu';
import { ItemExampleAttachmentComponent } from './examples/attachment';
import { ItemExampleSettingsComponent } from './examples/settings/settings';
import { ItemExampleSettingsDisabledComponent } from './examples/settings/settings-disabled';
import { ItemExampleFlaggedComponent } from './examples/flagged';
import { ItemExampleAvatarComponent } from './examples/avatar/default';
import { ItemExampleAvatarDateComponent } from './examples/avatar/date';
import { ItemExampleAvatarFlaggedComponent } from './examples/avatar/flagged';
import { ItemExampleAvatarFlaggedThreeLinesComponent } from './examples/avatar/flagged-three-lines';
import { ItemExampleHorizontalComponent } from './examples/horizontal';
import { ItemExampleButtonComponent } from './examples/button';
import { ItemExampleSimpleMediumComponent } from './examples/simple/default-md';
import { ItemExampleSimpleSmallComponent } from './examples/simple/default-sm';
import { ItemExampleSimpleExtraSmallComponent } from './examples/simple/default-xs';
import { ItemExampleSimpleMultilineComponent } from './examples/simple/multiline';
import { ItemExampleInputDefaultComponent } from './examples/input/default';
import { ItemExampleInputNumericComponent } from './examples/input/numeric';
import { ItemExampleCardComponent } from './examples/card';
import { ItemExampleDisclosureComponent } from './examples/disclosure';
import { ItemExampleDisclosureAnimationComponent } from './examples/disclosure-animation';

const COMPONENT_DECLARATIONS = [
  ItemExampleComponent,
  ItemExampleSimpleComponent,
  ItemExampleSimpleMediumComponent,
  ItemExampleSimpleSmallComponent,
  ItemExampleSimpleExtraSmallComponent,
  ItemExampleLongTitleComponent,
  ItemExampleSimpleTwoLinesComponent,
  ItemExampleSimpleThreeLinesComponent,
  ItemExampleSimpleTwoValueLinesComponent,
  ItemExampleSimpleMultilineComponent,
  ItemExamplePickerDefaultComponent,
  ItemExamplePickerDefaultSelectedComponent,
  ItemExamplePickerAvatarSelectedComponent,
  ItemExamplePickerCheckboxComponent,
  ItemExampleFabMenuComponent,
  ItemExampleAttachmentComponent,
  ItemExampleSettingsComponent,
  ItemExampleSettingsDisabledComponent,
  ItemExampleFlaggedComponent,
  ItemExampleAvatarComponent,
  ItemExampleAvatarDateComponent,
  ItemExampleAvatarFlaggedComponent,
  ItemExampleAvatarFlaggedThreeLinesComponent,
  ItemExampleButtonComponent,
  ItemExampleHorizontalComponent,
  ItemExampleInputDefaultComponent,
  ItemExampleInputNumericComponent,
  ItemExampleCardComponent,
  ItemExampleDisclosureComponent,
  ItemExampleDisclosureAnimationComponent,
];

@NgModule({
  imports: [
    CommonModule,
    AvatarComponent,
    BadgeComponent,
    CheckboxComponent,
    CardModule,
    FlagComponent,
    IconModule,
    ItemModule,
    ToggleComponent,
  ],
  declarations: COMPONENT_DECLARATIONS,
  exports: COMPONENT_DECLARATIONS,
})
export class ItemExampleModule {}
