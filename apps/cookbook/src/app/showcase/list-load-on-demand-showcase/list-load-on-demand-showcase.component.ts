import { Component } from '@angular/core';

import { config } from '~/app/examples/list/components/load-on-demand/list-load-on-demand-example.component';
declare var require: any;

@Component({
  selector: 'cookbook-list-load-on-demand-showcase',
  templateUrl: './list-load-on-demand-showcase.component.html',
  styleUrls: ['./list-load-on-demand-showcase.component.scss'],
})
export class ListLoadOnDemandShowcaseComponent {
  exampleHtml: string = config.template;
}
