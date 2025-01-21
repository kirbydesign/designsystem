import { Component } from '@angular/core';

import exampleHtml from '../../../examples/grid-layout-example/grid-layout-multiple-containers-example/grid-layout-multiple-containers-example.component.html?raw';
import exampleCss from '../../../examples/grid-layout-example/grid-layout-multiple-containers-example/grid-layout-multiple-containers-example.component.scss?raw';
import { CodeViewerComponent } from '../../../shared/code-viewer/code-viewer.component';

@Component({
  selector: 'cookbook-grid-layout-multiple-containers',
  templateUrl: './grid-layout-multiple-containers.component.html',
  imports: [CodeViewerComponent],
})
export class GridLayoutMultipleContainersComponent {
  exampleHtml = exampleHtml;
  exampleCss = exampleCss;
}
