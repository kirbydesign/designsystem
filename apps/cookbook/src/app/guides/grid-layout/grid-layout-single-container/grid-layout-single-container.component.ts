import { Component } from '@angular/core';

import exampleHtml from '../../../examples/grid-layout-example/grid-layout-single-container-example/grid-layout-single-container-example.component.html?raw';
import exampleCss from '../../../examples/grid-layout-example/grid-layout-single-container-example/grid-layout-single-container-example.component.scss?raw';
import { CodeViewerComponent } from '../../../shared/code-viewer/code-viewer.component';

@Component({
  selector: 'cookbook-grid-layout-single-container',
  templateUrl: './grid-layout-single-container.component.html',
  imports: [CodeViewerComponent],
})
export class GridLayoutSingleContainerComponent {
  exampleHtml = exampleHtml;
  exampleCss = exampleCss;
}
