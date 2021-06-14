import { Component } from '@angular/core';
import { ApiDescriptionProperty } from '~/app/shared/api-description/api-description-properties/api-description-properties.component';
declare var require: any;

@Component({
  selector: 'cookbook-virtual-scroll-window-showcase',
  templateUrl: './list-virtual-scroll-window-showcase.component.html',
  styleUrls: ['./list-virtual-scroll-window-showcase.component.scss'],
})
export class ListVirtualScrollWindowShowcaseComponent {
  exampleHtml: string = require('!raw-loader!../../examples/list-virtual-scroll-window-example/list-virtual-scroll-window-example.component.html')
    .default;

  properties: ApiDescriptionProperty[] = [
    {
      name: 'useVirtualScroll',
      description:
        'Determines if virtual scroll is used to improve rendering performance of many list items.',
      type: ['boolean'],
      defaultValue: 'false',
    },
    {
      name: 'virtualScrollViewportHeight',
      description:
        'When using virtual scroll, we need a fixed height scroll container. This property makes it possible to set a custom height on this.',
      type: ['number'],
      defaultValue: '500',
    },
    {
      name: 'virtualScrollTimeout',
      description:
        'When combining virtual scroll with load-on-demand, a timeout is defined as a failsafe for a non-responsive external API. This can be increased if working with slow APIs or large queries.',
      type: ['number'],
      defaultValue: '5000',
    },
    {
      name: 'virtualScrollSettings',
      description:
        'Sensible defaults are provided, but the behaviour of the virtual scroll can be fine tuned to specific needs. Available settings can also be seen at https://github.com/dhilt/ngx-ui-scroll#settings',
      type: ['VirtualScrollerSettings'],
      defaultValue: '{ minIndex: 0, startIndex: 0, bufferSize: 10}',
    },
  ];
}
