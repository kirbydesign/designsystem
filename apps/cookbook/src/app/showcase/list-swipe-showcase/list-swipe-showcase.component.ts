import { Component } from '@angular/core';

import exampleHtml from '../../examples/list-swipe-example/list-swipe-example.component.html?raw';

@Component({
  selector: 'cookbook-list-swipe-showcase',
  templateUrl: './list-swipe-showcase.component.html',
})
export class ListSwipeShowcaseComponent {
  exampleHtml = exampleHtml;
}
