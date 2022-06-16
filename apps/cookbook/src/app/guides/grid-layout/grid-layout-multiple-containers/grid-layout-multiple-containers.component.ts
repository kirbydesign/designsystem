import { Component } from '@angular/core';

import exampleHtml from '../../../examples/grid-layout-example/grid-layout-multiple-containers-example/grid-layout-multiple-containers-example.component.html?raw';
import exampleCss from '../../../examples/grid-layout-example/grid-layout-multiple-containers-example/grid-layout-multiple-containers-example.component.scss?raw';

@Component({
  selector: 'cookbook-grid-layout-multiple-containers',
  templateUrl: './grid-layout-multiple-containers.component.html',
})
export class GridLayoutMultipleContainersComponent {
  exampleHtml = exampleHtml;
  exampleCss = exampleCss;
}
