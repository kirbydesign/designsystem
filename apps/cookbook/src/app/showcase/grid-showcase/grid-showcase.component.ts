import { Component } from '@angular/core';

import exampleHtml from '../../examples/grid-example/grid-example.component.html?raw';

@Component({
  selector: 'cookbook-grid-showcase',
  templateUrl: './grid-showcase.component.html',
})
export class GridShowcaseComponent {
  exampleHtml = exampleHtml;
}
