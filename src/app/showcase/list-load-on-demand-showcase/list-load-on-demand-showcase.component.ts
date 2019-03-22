import { Component } from '@angular/core';
declare var require: any;

@Component({
  selector: 'kirby-list-load-on-demand-showcase',
  templateUrl: './list-load-on-demand-showcase.component.html',
  styleUrls: ['./list-load-on-demand-showcase.component.scss'],
})
export class ListLoadOnDemandShowcaseComponent {
  exampleHtml: string = require('../../examples/list/load-on-demand/list-load-on-demand-example.component.html');
}
