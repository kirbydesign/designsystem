import { Component } from '@angular/core';

import exampleHtml from '../../examples/spinner-example/spinner-example.component.html?raw';
import { SpinnerExampleComponent } from '../../examples/spinner-example/spinner-example.component';
import { CodeViewerComponent } from '../../shared/code-viewer/code-viewer.component';

@Component({
  selector: 'cookbook-spinner-showcase',
  templateUrl: './spinner-showcase.component.html',
  imports: [SpinnerExampleComponent, CodeViewerComponent],
})
export class SpinnerShowcaseComponent {
  exampleHtml = exampleHtml;
}
