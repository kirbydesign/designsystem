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
        'Gets/sets the index of the selected segment within the `segmentItems` array. The value -1 indicates no element is selected.',
      defaultValue: 'undefined',
      type: ['number'],
    },
    {
      name: 'scrollable',
      description:
        'Makes the segmented control horizontally scrollable when segments take up more space than the width of the segmented control. It will also prevent segmentChange from emitting on swipe.',
      defaultValue: 'false',
      type: ['boolean'],
    },
  ];
}
