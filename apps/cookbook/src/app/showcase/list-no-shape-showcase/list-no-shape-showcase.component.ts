import { Component } from '@angular/core';

import examleHtml from '../../examples/list-no-shape-example/list-no-shape-example.component.html?raw';

@Component({
  selector: 'cookbook-list-no-shape-showcase',
  templateUrl: './list-no-shape-showcase.component.html',
})
export class ListNoShapeShowcaseComponent {
  exampleHtml = examleHtml;
}
