import { Component } from '@angular/core';

import exampleHtml from '../../examples/item-group-example/item-group-example.component.html?raw';
@Component({
  selector: 'cookbook-item-group-showcase',
  templateUrl: './item-group-showcase.component.html',
})
export class ItemGroupShowcaseComponent {
  exampleHtml = exampleHtml;
}
