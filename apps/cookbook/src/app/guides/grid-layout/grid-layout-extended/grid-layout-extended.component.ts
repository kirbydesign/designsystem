import { Component } from '@angular/core';
import exampleHtml from '../../../examples/grid-layout-example/grid-layout-extended-example/grid-layout-extended-example.component.html' with {
  loader: 'text',
};
import exampleCss from '../../../examples/grid-layout-example/grid-layout-extended-example/grid-layout-extended-example.component.scss' with {
  loader: 'text',
};
import { CodeViewerComponent } from '../../../shared/code-viewer/code-viewer.component';
@Component({
  selector: 'cookbook-grid-layout-extended',
  templateUrl: './grid-layout-extended.component.html',
  imports: [CodeViewerComponent],
})
export class GridLayoutExtendedComponent {
  exampleHtml = exampleHtml;
  exampleCss = exampleCss;
}
