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
import { ItemExampleSimpleNormalComponent } from '~/app/examples/item-example/examples/simple/default-normal';
import { ItemExampleSimpleSmallComponent } from './examples/simple/default-small';
import { ItemExampleSimpleTinyComponent } from './examples/simple/default-tiny';

const COMPONENT_DECLARATIONS = [
  ItemExampleSimpleComponent,
  ItemExampleSimpleNormalComponent,
  ItemExampleSimpleSmallComponent,
  ItemExampleSimpleTinyComponent,
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
];

@NgModule({
  imports: [CommonModule, KirbyModule],
  declarations: COMPONENT_DECLARATIONS,
  exports: COMPONENT_DECLARATIONS,
})
export class ItemExampleModule {}
