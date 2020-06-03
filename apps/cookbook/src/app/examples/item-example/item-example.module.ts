import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KirbyModule } from '@kirbydesign/designsystem';

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
import { ItemExampleCardComponent } from './examples/card';

const COMPONENT_DECLARATIONS = [
  ItemExampleSimpleComponent,
  ItemExampleSimpleMediumComponent,
  ItemExampleSimpleSmallComponent,
  ItemExampleSimpleExtraSmallComponent,
  ItemExampleLongTitleComponent,
  ItemExampleSimpleTwoLinesComponent,
  ItemExampleSimpleThreeLinesComponent,
  ItemExampleSimpleTwoValueLinesComponent,
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
  ItemExampleCardComponent,
];

@NgModule({
  imports: [CommonModule, KirbyModule],
  declarations: COMPONENT_DECLARATIONS,
  exports: COMPONENT_DECLARATIONS,
})
export class ItemExampleModule {}
