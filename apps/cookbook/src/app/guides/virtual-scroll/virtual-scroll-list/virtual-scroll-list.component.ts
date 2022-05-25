import { Component } from '@angular/core';

import exampleHtml from '../../../examples/virtual-scroll-example/virtual-scroll-list-example/virtual-scroll-list-example.component.html?raw';
@Component({
  selector: 'cookbook-list-virtual-scroll',
  templateUrl: './virtual-scroll-list.component.html',
})
export class VirtualScrollListComponent {
  exampleHtml: string = exampleHtml;
}
