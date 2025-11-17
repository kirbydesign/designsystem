import { Component } from '@angular/core';

// @ts-expect-error TypeScript cannot provide types based on attributes yet
import exampleHtml from '../../../examples/virtual-scroll-example/virtual-scroll-list-example/virtual-scroll-list-example.component.html' with { loader: 'text' };
import { CodeViewerComponent } from '../../../shared/code-viewer/code-viewer.component';
@Component({
  selector: 'cookbook-list-virtual-scroll',
  templateUrl: './virtual-scroll-list.component.html',
  imports: [CodeViewerComponent],
})
export class VirtualScrollListComponent {
  exampleHtml: string = exampleHtml;
}
