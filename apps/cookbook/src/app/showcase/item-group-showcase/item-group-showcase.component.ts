import { Component } from '@angular/core';

@Component({
  selector: 'cookbook-item-group-showcase',
  templateUrl: './item-group-showcase.component.html',
})
export class ItemGroupShowcaseComponent {
  exampleHtml: string =
    require('!raw-loader!../../examples/item-group-example/item-group-example.component.html')
      .default;
}
