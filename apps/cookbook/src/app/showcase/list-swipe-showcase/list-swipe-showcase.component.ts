import { Component } from '@angular/core';

import exampleHtml from '../../examples/list-swipe-example/list-swipe-example.component.html?raw';
import { ListSwipeExampleComponent } from '../../examples/list-swipe-example/list-swipe-example.component';
import { CodeViewerComponent } from '../../shared/code-viewer/code-viewer.component';

@Component({
  selector: 'cookbook-list-swipe-showcase',
  templateUrl: './list-swipe-showcase.component.html',
  imports: [ListSwipeExampleComponent, CodeViewerComponent],
})
export class ListSwipeShowcaseComponent {
  exampleHtml = exampleHtml;
}
