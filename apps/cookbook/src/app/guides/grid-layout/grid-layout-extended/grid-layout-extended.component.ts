import { Component } from '@angular/core';

import exampleHtml from '../../../examples/grid-layout-example/grid-layout-extended-example/grid-layout-extended-example.component.html?raw';
import exampleCss from '../../../examples/grid-layout-example/grid-layout-extended-example/grid-layout-extended-example.component.scss?raw';
@Component({
  selector: 'cookbook-grid-layout-extended',
  templateUrl: './grid-layout-extended.component.html',
})
export class GridLayoutExtendedComponent {
  exampleHtml = exampleHtml;
  exampleCss = exampleCss;
}
