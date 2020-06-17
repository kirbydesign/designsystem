import { Component } from '@angular/core';

import { config } from '~/app/examples/list/components/virtual-scroll/list-load-on-demand';
declare var require: any;

@Component({
  selector: 'cookbook-list-load-on-demand-showcase',
  templateUrl: './virtual-scroll-list-load-on-demand-showcase.component.html',
})
export class VirtualScrollListLoadOnDemandShowcaseComponent {
  exampleHtml: string = config.template;
}
