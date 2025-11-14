import { Component, EventEmitter, Output } from '@angular/core';

// @ts-expect-error TypeScript cannot provide types based on attributes yet
import exampleHtml from '../../examples/fonts-example/fonts-example.component.html' with { loader: 'text' };
import { CodeViewerComponent } from '../../shared/code-viewer/code-viewer.component';

@Component({
  selector: 'cookbook-fonts-showcase',
  templateUrl: './fonts-showcase.component.html',
  styleUrls: ['./fonts-showcase.component.scss'],
  imports: [CodeViewerComponent],
})
export class FontsShowcaseComponent {
  exampleHtml = exampleHtml;

  @Output() isCTABoxShown = new EventEmitter();
}
