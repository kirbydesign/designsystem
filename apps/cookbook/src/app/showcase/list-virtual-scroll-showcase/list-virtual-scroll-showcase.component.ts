import { Component } from '@angular/core';
import { ApiDescriptionProperty } from '~/app/shared/api-description/api-description-properties/api-description-properties.component';

import { ListVirtualScrollExampleTemplate } from './../../examples/list-virtual-scroll-example/list-virtual-scroll-example.component';

@Component({
  selector: 'cookbook-virtual-scroll-showcase',
  templateUrl: './list-virtual-scroll-showcase.component.html',
  styleUrls: ['./list-virtual-scroll-showcase.component.scss'],
})
export class ListVirtualScrollShowcaseComponent {
  exampleHtml: string = ListVirtualScrollExampleTemplate;

  properties: ApiDescriptionProperty[] = [
    {
      name: 'useVirtualScroll',
      description:
        'Determines if virtual scroll is used to improve rendering performance of many list items.',
      type: ['boolean'],
      defaultValue: 'false',
    },
    {
      name: 'viewPortHeight',
      description: 'A fixed viewport height in pixels.',
      type: ['number'],
      defaultValue: '500',
    },
    {
      name: 'virtualScrollSettings',
      description:
        'Sensible defaults are provided, but the behaviour of the virtual scroll can be fine tuned to specific needs. Available settings can be seen at https://github.com/dhilt/ngx-ui-scroll#settings',
      type: ['object'],
      defaultValue: '{ minIndex: 0, startIndex: 0, bufferSize: 10}',
    },
  ];
}
