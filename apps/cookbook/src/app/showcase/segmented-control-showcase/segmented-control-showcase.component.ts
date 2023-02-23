import { Component } from '@angular/core';
import { ApiDescriptionProperty } from '~/app/shared/api-description/api-description-properties/api-description-properties.component';

@Component({
  selector: 'cookbook-segmented-control-showcase',
  templateUrl: './segmented-control-showcase.component.html',
  styleUrls: ['./segmented-control-showcase.component.scss'],
})
export class SegmentedControlShowcaseComponent {
  properties: ApiDescriptionProperty[] = [
    {
      name: 'mode',
      description: 'The mode of the segmented control.',
      defaultValue: 'default',
      type: ['default', 'chip', 'compactChip'],
    },
    {
      name: 'size',
      description: 'Sets the size of the segmented control. Only applies to `default` mode.',
      defaultValue: 'md',
      type: ['sm', 'md'],
    },
    {
      name: 'items',
      description: `An array of SegmentItem[] representing the set of segment elements within the control.`,
      defaultValue: '',
      type: [
        `[{
  id: string,
  text: string,
  badge?: {
    content?: string,
    icon?: string,
    description?: string,
    themeColor: ThemeColor
  }
}]`,
      ],
      preserveTypeWhitespaces: true,
    },
    {
      name: 'value',
      description:
        'Gets/sets the selected segment. Returns the selected segment if there is one, otherwise `undefined``.',
      defaultValue: 'undefined',
      type: ['SegmentItem'],
    },
    {
      name: 'selectedIndex',
      description:
        'The index of the segment selected within the provided `Items` array. The value -1 means no element selected. Define this parameter as two-way-binding when used for controlling the selection',
      defaultValue: '-1',
      type: ['number'],
    },
    {
      name: 'disableChangeOnSwipe',
      description:
        'Sets the `scrollable` attribute on ion-segment. Note that this will not make the segmented-control scrollable but it will prevent segmentChange from emitting on swipe, when set to true',
      defaultValue: 'false',
      type: ['boolean'],
    },
  ];

  items = [
    {
      text: 'Item 1',
      id: '1',
    },
    {
      text: 'Item 2',
      id: '2',
    },
  ];
}
