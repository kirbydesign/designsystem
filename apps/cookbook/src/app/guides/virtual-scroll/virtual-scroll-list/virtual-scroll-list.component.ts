import { Component } from '@angular/core';

@Component({
  selector: 'cookbook-list-virtual-scroll',
  templateUrl: './virtual-scroll-list.component.html',
})
export class VirtualScrollListComponent {
  exampleHtml: string =
    require('!raw-loader!../../../examples/virtual-scroll-example/virtual-scroll-list-example/virtual-scroll-list-example.component.html')
      .default;
}
