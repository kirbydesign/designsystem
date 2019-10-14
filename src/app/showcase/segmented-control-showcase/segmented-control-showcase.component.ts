import { Component, OnInit } from '@angular/core';

import { ShowcaseProperty } from '~/app/shared/showcase-properties/showcase-property';

declare var require: any;
@Component({
  selector: 'kirby-segmented-control-showcase',
  templateUrl: './segmented-control-showcase.component.html',
  styleUrls: ['./segmented-control-showcase.component.scss'],
})
export class SegmentedControlShowcaseComponent implements OnInit {
  selectedMode: 'default' | 'chip';
  exampleHtml: string = require('!raw-loader!../../examples/segmented-control-example/segmented-control-example.component.html')
    .default;

  properties: ShowcaseProperty[] = [
    {
      name: 'mode',
      description: 'The mode of the segmented control.',
      defaultValue: 'default',
      inputValues: ['default', 'chip'],
    },
    {
      name: 'segmentItems',
      description: 'Array of SegmentItem controls',
      defaultValue: '',
      inputValues: [
        '[{ text: string, id: string, checked: boolean, badge?: {content: string, themeColor: ThemeColor}}]',
      ],
    },
  ];

  ngOnInit(): void {
    this.selectedMode = 'default';
  }

  onModeChange(mode: any) {
    this.selectedMode = mode;
  }
}
