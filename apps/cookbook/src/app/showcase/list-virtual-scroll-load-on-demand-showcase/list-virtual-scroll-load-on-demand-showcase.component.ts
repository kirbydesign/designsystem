import { Component } from '@angular/core';

import { config } from '~/app/examples/list/components/virtual-scroll/list-load-on-demand';
declare var require: any;

@Component({
  selector: 'cookbook-list-virtual-scroll-load-on-demand-showcase',
  templateUrl: './list-virtual-scroll-load-on-demand-showcase.component.html',
})
export class ListVirtualScrollLoadOnDemandShowcaseComponent {
  exampleHtml: string = config.template;
}
