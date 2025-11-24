import { Component } from '@angular/core';

// @ts-expect-error TypeScript cannot provide types based on attributes yet
import exampleHtml from '../../../examples/grid-layout-example/grid-layout-single-container-example/grid-layout-single-container-example.component.html' with { loader: 'text' };
// @ts-expect-error TypeScript cannot provide types based on attributes yet
import exampleCss from '../../../examples/grid-layout-example/grid-layout-single-container-example/grid-layout-single-container-example.component.scss' with { loader: 'text' };
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
