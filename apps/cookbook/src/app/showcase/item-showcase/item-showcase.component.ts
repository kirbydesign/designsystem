import { Component } from '@angular/core';
import { ExampleViewerComponent } from '../../shared/example-viewer/example-viewer.component';
import { ItemExampleSizesComponent } from '../../examples/item-example/examples/sizes';
import { ItemExampleNestedControlsComponent } from '../../examples/item-example/examples/nested-controls';
import { ItemExampleTextComponent } from '../../examples/item-example/examples/text';
import { ItemExampleSlotsComponent } from '../../examples/item-example/examples/slots';
import { ItemExampleSelectableComponent } from '../../examples/item-example/examples/selectable';

import { ItemExampleTextVerticallyStackedComponent } from '../../examples/item-example/examples/text-vertically-stacked';

import { ApiDescriptionPropertiesComponent } from '../../shared/api-description/api-description-properties/api-description-properties.component';
import { ItemExampleDisabledComponent } from '../../examples/item-example/examples/disabled';
import { ItemExampleDisabledControlsComponent } from '../../examples/item-example/examples/disabled-controls';
import {
  ApiDescriptionProperty,
  ApiDescriptionPropertyColumns,
} from '~/app/shared/api-description/api-description-properties/api-description-properties.component';
import { ItemExampleComplexLabelsComponent } from '~/app/examples/item-example/examples/complex-labels';
import { ItemExampleDisclosureAnimationComponent } from '~/app/examples/item-example/examples/disclosure-animation';
import { ImportViewerComponent } from '~/app/shared/import-code-viewer/import-code-viewer.component';
import { ItemExampleWithInputComponent } from '~/app/examples/item-example/examples/with-input';

@Component({
  selector: 'cookbook-item-showcase',
  templateUrl: './item-showcase.component.html',
  styleUrls: ['./item-showcase.component.scss'],
  imports: [
    ExampleViewerComponent,
    ItemExampleSizesComponent,
    ItemExampleTextComponent,
    ItemExampleTextVerticallyStackedComponent,
    ItemExampleNestedControlsComponent,
    ItemExampleWithInputComponent,
    ItemExampleSlotsComponent,
    ItemExampleSelectableComponent,
    ItemExampleDisabledComponent,
    ItemExampleDisabledControlsComponent,
    ItemExampleComplexLabelsComponent,
    ItemExampleDisclosureAnimationComponent,
    ApiDescriptionPropertiesComponent,
    ImportViewerComponent,
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
      description: 'Disable any selectable item from being activated',
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
      name: 'href',
      description:
        'If `true`, a native <a> tag will be rendered under the hood and the item will become a link. The link item supports the `target`, `rel` and `download` attributes.',
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
