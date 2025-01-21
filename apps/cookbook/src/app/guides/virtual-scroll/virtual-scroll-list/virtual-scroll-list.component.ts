import { Component } from '@angular/core';

import exampleHtml from '../../../examples/virtual-scroll-example/virtual-scroll-list-example/virtual-scroll-list-example.component.html?raw';
import { CodeViewerComponent } from '../../../shared/code-viewer/code-viewer.component';
@Component({
  selector: 'cookbook-list-virtual-scroll',
  templateUrl: './virtual-scroll-list.component.html',
  imports: [CodeViewerComponent],
})
export class VirtualScrollListComponent {
  exampleHtml: string = exampleHtml;
}
