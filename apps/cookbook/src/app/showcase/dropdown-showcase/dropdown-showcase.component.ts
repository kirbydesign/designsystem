import { Component } from '@angular/core';
import { DropdownExampleConfigurationComponent } from '../../examples/dropdown-example/dropdown-example-configuration-component/dropdown-example-configuration.component';
import { ExampleViewerComponent } from '../../shared/example-viewer/example-viewer.component';
import { DropdownExampleDefaultComponent } from '../../examples/dropdown-example/examples/default';
import { DropdownExampleScrollComponent } from '../../examples/dropdown-example/examples/scroll';
import { DropdownExamplePreSelectedComponent } from '../../examples/dropdown-example/examples/pre-selected';
import { DropdownExampleExpandComponent } from '../../examples/dropdown-example/examples/expand';
import { DropdownExampleRightAlignedComponent } from '../../examples/dropdown-example/examples/right-aligned';
import { DropdownExampleAttentionLevelComponent } from '../../examples/dropdown-example/examples/attention-level';
import { DropdownExampleItemSelectComponent } from '../../examples/dropdown-example/examples/item-select';
import { DropdownExampleCustomItemTemplateComponent } from '../../examples/dropdown-example/examples/custom-item-template';
import { DropdownExampleNgFormsComponent } from '../../examples/dropdown-example/examples/ng-forms';
import { ApiDescriptionPropertiesComponent } from '../../shared/api-description/api-description-properties/api-description-properties.component';
import { ApiDescriptionEventsComponent } from '../../shared/api-description/api-description-events/api-description-events.component';
import { ApiDescriptionMethodsComponent } from '../../shared/api-description/api-description-methods/api-description-methods.component';
import { ApiDescriptionProperty } from '~/app/shared/api-description/api-description-properties/api-description-properties.component';
import { ApiDescriptionMethod } from '~/app/shared/api-description/api-description-methods/api-description-methods.component';
import { ApiDescriptionEvent } from '~/app/shared/api-description/api-description-events/api-description-events.component';

@Component({
  selector: 'cookbook-dropdown-showcase',
  templateUrl: './dropdown-showcase.component.html',
  styleUrls: ['./dropdown-showcase.component.scss'],
  imports: [
    DropdownExampleConfigurationComponent,
    ExampleViewerComponent,
    DropdownExampleDefaultComponent,
    DropdownExampleScrollComponent,
    DropdownExamplePreSelectedComponent,
    DropdownExampleExpandComponent,
    DropdownExampleRightAlignedComponent,
    DropdownExampleAttentionLevelComponent,
    DropdownExampleItemSelectComponent,
    DropdownExampleCustomItemTemplateComponent,
    DropdownExampleNgFormsComponent,
    ApiDescriptionPropertiesComponent,
    ApiDescriptionEventsComponent,
    ApiDescriptionMethodsComponent,
  ],
})
export class DropdownShowcaseComponent {
  size: string = 'md';
  properties: ApiDescriptionProperty[] = [
    {
      name: 'items',
      description: 'The items rendered within the dropdown.',
      defaultValue: '[ ]',
      type: ['Array<string> | Array<any>'],
    },
    {
      name: 'size',
      description:
        'The size of the dropdown. The touch area will always be a minimum of 44px by 44px. If the dropdown is smaller than this, the surrounding area will still be clickable, to preserve accessibility.',
      defaultValue: 'md',
      type: ['sm | md'],
    },
    {
      name: 'itemTextProperty',
      description:
        'The property to use for the text representation of items when configured with `Array<any>`.',
      defaultValue: `'text'`,
      type: ['string'],
    },
    {
      name: 'value',
      description: 'The currently selected item (readonly).',
      defaultValue: 'undefined',
      type: ['string | any'],
    },
    {
      name: 'selectedIndex',
      description: 'The index of the selected item within the `items` array.',
      defaultValue: 'undefined',
      type: ['number'],
    },
    {
      name: 'disabled',
      description: 'Disables the dropdown so the the user cannot interact with it.',
      defaultValue: 'false',
      type: ['true', 'false'],
    },
    {
      name: 'placeholder',
      defaultValue: `'Please select:'`,
      description: 'Instructional text to show before the dropdown has a selected option.',
      type: ['string'],
    },
    {
      name: 'attentionLevel',
      description:
        'Sets the attention level for the button of the dropdown. Button color will be updated automatically depending on host color.',
      defaultValue: '3',
      type: ['1', '2', '3'],
    },
    {
      name: 'expand',
      description:
        'If the dropdown needs to expand to full width of its parent container, then use expand.',
      defaultValue: 'undefined',
      type: ['block'],
    },
  ];

  methods: ApiDescriptionMethod[] = [
    {
      name: 'toggle()',
      description: 'Toggles the open/closed state of the dropdown.',
      signature: '() => void',
    },
    {
      name: 'open()',
      description: 'Opens the dropdown.',
      signature: '() => void',
    },
    {
      name: 'close()',
      description: 'Closes the dropdown.',
      signature: '() => void',
    },
  ];

  events: ApiDescriptionEvent[] = [
    {
      name: 'change',
      description: 'Emitted when an item is selected (tap on mobile, click/keypress on web)',
      signature: '(item: string | any) => void',
    },
  ];

  setSize(size: string) {
    this.size = size;
  }
}
