import { Component } from '@angular/core';

import { RouterLink } from '@angular/router';
// @ts-expect-error TypeScript cannot provide types based on attributes yet
import exampleHtml from '../../examples/list-swipe-example/list-swipe-example.component.html' with { loader: 'text' };
import { ListSwipeExampleComponent } from '../../examples/list-swipe-example/list-swipe-example.component';
import { CodeViewerComponent } from '../../shared/code-viewer/code-viewer.component';

@Component({
  selector: 'cookbook-list-swipe-showcase',
  templateUrl: './list-swipe-showcase.component.html',
  imports: [ListSwipeExampleComponent, CodeViewerComponent, RouterLink],
})
export class ListSwipeShowcaseComponent {
  exampleHtml = exampleHtml;
}
