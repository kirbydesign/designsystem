import { Component } from '@angular/core';

// @ts-expect-error TypeScript cannot provide types based on attributes yet
import exampleHtml from '../../../examples/grid-layout-example/grid-layout-multiple-containers-example/grid-layout-multiple-containers-example.component.html' with { loader: 'text' };
// @ts-expect-error TypeScript cannot provide types based on attributes yet
import exampleCss from '../../../examples/grid-layout-example/grid-layout-multiple-containers-example/grid-layout-multiple-containers-example.component.scss' with { loader: 'text' };
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
