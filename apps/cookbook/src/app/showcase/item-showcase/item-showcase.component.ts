import { Component } from '@angular/core';
import { ExampleViewerComponent } from '../../shared/example-viewer/example-viewer.component';
import { ItemExampleSimpleMediumComponent } from '../../examples/item-example/examples/simple/default-md';
import { ItemExampleSimpleSmallComponent } from '../../examples/item-example/examples/simple/default-sm';
import { ItemExampleSimpleExtraSmallComponent } from '../../examples/item-example/examples/simple/default-xs';
import { ItemExampleSimpleComponent } from '../../examples/item-example/examples/simple/default';
import { ItemExampleLongTitleComponent } from '../../examples/item-example/examples/simple/long-title';
import { ItemExampleSimpleTwoLinesComponent } from '../../examples/item-example/examples/simple/two-lines';
import { ItemExampleSimpleThreeLinesComponent } from '../../examples/item-example/examples/simple/three-lines';
import { ItemExampleSimpleTwoValueLinesComponent } from '../../examples/item-example/examples/simple/two-value-lines';
import { ItemExampleSimpleMultilineComponent } from '../../examples/item-example/examples/simple/multiline';
import { ItemExampleSimpleMultilineSubtitleComponent } from '../../examples/item-example/examples/simple/multiline-subtitle';
import { ItemExamplePickerDefaultComponent } from '../../examples/item-example/examples/picker/default';
import { ItemExamplePickerDefaultSelectedComponent } from '../../examples/item-example/examples/picker/default-selected';
import { ItemExamplePickerAvatarSelectedComponent } from '../../examples/item-example/examples/picker/avatar-selected';
import { ItemExamplePickerCheckboxComponent } from '../../examples/item-example/examples/picker/checkbox';
import { ItemExampleFabMenuComponent } from '../../examples/item-example/examples/fab-menu';
import { ItemExampleAttachmentComponent } from '../../examples/item-example/examples/attachment';
import { ItemExampleSettingsComponent } from '../../examples/item-example/examples/settings/settings';
import { ItemExampleSettingsDisabledComponent } from '../../examples/item-example/examples/settings/settings-disabled';
import { ItemExampleFlaggedComponent } from '../../examples/item-example/examples/flagged';
import { ItemExampleAvatarComponent } from '../../examples/item-example/examples/avatar/default';
import { ItemExampleAvatarDateComponent } from '../../examples/item-example/examples/avatar/date';
import { ItemExampleAvatarFlaggedComponent } from '../../examples/item-example/examples/avatar/flagged';
import { ItemExampleAvatarFlaggedThreeLinesComponent } from '../../examples/item-example/examples/avatar/flagged-three-lines';
import { ItemExampleHorizontalComponent } from '../../examples/item-example/examples/horizontal';
import { ItemExampleButtonComponent } from '../../examples/item-example/examples/button';
import { ItemExampleInputDefaultComponent } from '../../examples/item-example/examples/input/default';
import { ItemExampleInputNumericComponent } from '../../examples/item-example/examples/input/numeric';
import { ItemExampleDisclosureComponent } from '../../examples/item-example/examples/disclosure';
import { ItemExampleDisclosureAnimationComponent } from '../../examples/item-example/examples/disclosure-animation';
import { ItemExampleCardComponent } from '../../examples/item-example/examples/card';
import { ApiDescriptionPropertiesComponent } from '../../shared/api-description/api-description-properties/api-description-properties.component';
import {
  ApiDescriptionProperty,
  ApiDescriptionPropertyColumns,
} from '~/app/shared/api-description/api-description-properties/api-description-properties.component';

@Component({
  selector: 'cookbook-item-showcase',
  templateUrl: './item-showcase.component.html',
  styleUrls: ['./item-showcase.component.scss'],
  imports: [
    ExampleViewerComponent,
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
    ApiDescriptionPropertiesComponent,
  ],
})
export class ItemShowcaseComponent {
  properties: ApiDescriptionProperty[] = [
    {
      name: 'selectable',
      description:
        'If `true`, a native button tag will be rendered under the hood and the item will become interactive.',
      defaultValue: 'false',
      type: ['boolean'],
    },
    {
      name: 'selected',
      description: 'Mark item as selected - making its content appear in bold',
      defaultValue: 'false',
      type: ['boolean'],
    },
    {
      name: 'disabled',
      description: 'Disable item entirely including its contents',
      defaultValue: 'false',
      type: ['boolean'],
    },
    {
      name: 'disclosure',
      description: 'Set disclosure icon',
      defaultValue: 'null',
      type: ["'link' | 'arrow-more' | 'arrow-down' | 'arrow-up' | null"],
    },
    {
      name: 'rotateIcon',
      description:
        'Rotates the disclosure icon 180 degrees. This only applies to the arrow-up & arrow-down icons',
      defaultValue: 'false',
      type: ['boolean'],
    },
    {
      name: 'reorderable',
      description: 'Make item reorderable in a list - makes reorder icon appear',
      defaultValue: 'false',
      type: ['boolean'],
    },
    {
      name: 'size',
      description: 'Set size for item',
      defaultValue: 'md',
      type: ['ItemSize'],
    },
  ];

  customCssPropertiesColumns: ApiDescriptionPropertyColumns = {
    name: 'Name',
    description: 'Description',
  };

  customCssProperties: ApiDescriptionProperty[] = [
    {
      name: '--kirby-item-background',
      description: 'Background of the item',
    },
    {
      name: '--kirby-item-background-focused',
      description: 'Background of the item when focused with the tab key',
    },
  ];

  scrollTo(target: Element) {
    target.scrollIntoView({ behavior: 'smooth' });
    return false;
  }
}
