import { Component } from '@angular/core';
declare var require: any;

@Component({
  selector: 'cookbook-list-load-on-demand-showcase',
  templateUrl: './list-load-on-demand-showcase.component.html',
  styleUrls: ['./list-load-on-demand-showcase.component.scss'],
})
export class ListLoadOnDemandShowcaseComponent {
  exampleHtml: string = require('!raw-loader!../../examples/list/components/load-on-demand/list-load-on-demand-example.component.html')
    .default;
}
