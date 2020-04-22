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
      name: 'segmentItems',
      description: 'Array of SegmentItem controls',
      defaultValue: '',
      inputValues: [
        '[{ text: string, id: string, checked: boolean, badge?: {content: string, description?: string, themeColor: ThemeColor}}]',
      ],
    },
  ];
}
