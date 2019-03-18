import { Component } from '@angular/core';
declare var require: any;

@Component({
  selector: 'kirby-list-load-more-showcase',
  templateUrl: './list-load-more-showcase.component.html',
  styleUrls: ['./list-load-more-showcase.component.scss'],
})
export class ListLoadMoreShowcaseComponent {
  exampleHtml: string = require('../../examples/list-load-more-example/list-load-more-example.component.html');
}
