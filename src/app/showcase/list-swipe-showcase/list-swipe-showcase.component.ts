import { Component } from '@angular/core';
declare var require: any;

@Component({
  selector: 'kirby-list-swipe-showcase',
  templateUrl: './list-swipe-showcase.component.html',
  styleUrls: ['./list-swipe-showcase.component.scss'],
})
export class ListSwipeShowcaseComponent {
  exampleHtml: string = require('!raw-loader!../../examples/list/swipe/list-swipe-example.component.html')
    .default;
}
