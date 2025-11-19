import { Component } from '@angular/core';

// @ts-expect-error TypeScript cannot provide types based on attributes yet
import exampleHtml from '../../examples/spinner-example/spinner-example.component.html' with { loader: 'text' };
import { SpinnerExampleComponent } from '../../examples/spinner-example/spinner-example.component';
import { CodeViewerComponent } from '../../shared/code-viewer/code-viewer.component';
import { ImportViewerComponent } from '~/app/shared/import-code-viewer/import-code-viewer.component';

@Component({
  selector: 'cookbook-spinner-showcase',
  templateUrl: './spinner-showcase.component.html',
  imports: [SpinnerExampleComponent, CodeViewerComponent, ImportViewerComponent],
})
export class SpinnerShowcaseComponent {
  exampleHtml = exampleHtml;
}
