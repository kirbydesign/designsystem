import { Component } from '@angular/core';

import { ShowcaseProperty } from '~/app/shared/showcase-properties/showcase-property';

@Component({
  selector: 'cookbook-segmented-control-showcase',
  templateUrl: './segmented-control-showcase.component.html',
  styleUrls: ['./segmented-control-showcase.component.scss'],
})
export class SegmentedControlShowcaseComponent {
  properties: ShowcaseProperty[] = [
    {
      name: 'mode',
      description: 'The mode of the segmented control.',
      defaultValue: 'default',
      inputValues: ['default', 'chip'],
    },
    {
      name: 'size',
      description: 'Sets the size of the segmented control. Only applies to `default` mode.',
      defaultValue: 'md',
      inputValues: ['sm', 'md'],
    },
    {
      name: 'items',
      description:
        'An array of `SegmentItem[]` representing the set of segment elements within the control.',
      defaultValue: '',
      inputValues: [
        `[{
  id: string,
  text: string,
  badge?: {
    content: string,
    description?: string,
    themeColor: ThemeColor
  }
}]`,
      ],
      preserveInputValuesWhitespaces: true,
    },
    {
      name: 'value',
      description:
        'Gets/sets the selected segment. Returns the selected segment if there is one, otherwise `undefined``.',
      defaultValue: 'undefined',
      inputValues: ['SegmentItem'],
    },
    {
      name: 'selectedIndex',
      description:
        'Gets/sets the index of the selected segment within the `segmentItems` array. The value -1 indicates no element is selected.',
      defaultValue: 'undefined',
      inputValues: ['number'],
    },
  ];
}
