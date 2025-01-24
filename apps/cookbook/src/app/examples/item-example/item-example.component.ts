import { Component } from '@angular/core';
import { ItemExampleSimpleMediumComponent } from './examples/simple/default-md';
import { ItemExampleSimpleSmallComponent } from './examples/simple/default-sm';
import { ItemExampleSimpleExtraSmallComponent } from './examples/simple/default-xs';
import { ItemExampleSimpleComponent } from './examples/simple/default';
import { ItemExampleLongTitleComponent } from './examples/simple/long-title';
import { ItemExampleSimpleTwoLinesComponent } from './examples/simple/two-lines';
import { ItemExampleSimpleThreeLinesComponent } from './examples/simple/three-lines';
import { ItemExampleSimpleTwoValueLinesComponent } from './examples/simple/two-value-lines';
import { ItemExampleSimpleMultilineComponent } from './examples/simple/multiline';
import { ItemExampleSimpleMultilineSubtitleComponent } from './examples/simple/multiline-subtitle';
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
import { ItemExampleInputDefaultComponent } from './examples/input/default';
import { ItemExampleInputNumericComponent } from './examples/input/numeric';
import { ItemExampleDisclosureComponent } from './examples/disclosure';
import { ItemExampleDisclosureAnimationComponent } from './examples/disclosure-animation';
import { ItemExampleCardComponent } from './examples/card';

@Component({
  selector: 'cookbook-item-example',
  templateUrl: './item-example.component.html',
  styleUrls: ['./item-example.component.scss'],
  imports: [
    ItemExampleSimpleMediumComponent,
    ItemExampleSimpleSmallComponent,
    ItemExampleSimpleExtraSmallComponent,
    ItemExampleSimpleComponent,
    ItemExampleLongTitleComponent,
    ItemExampleSimpleTwoLinesComponent,
    ItemExampleSimpleThreeLinesComponent,
    ItemExampleSimpleTwoValueLinesComponent,
    ItemExampleSimpleMultilineComponent,
    ItemExampleSimpleMultilineSubtitleComponent,
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
    ItemExampleHorizontalComponent,
    ItemExampleButtonComponent,
    ItemExampleInputDefaultComponent,
    ItemExampleInputNumericComponent,
    ItemExampleDisclosureComponent,
    ItemExampleDisclosureAnimationComponent,
    ItemExampleCardComponent,
  ],
})
export class ItemExampleComponent {}
