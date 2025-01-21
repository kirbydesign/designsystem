import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeViewerComponent } from '../../shared/code-viewer/code-viewer.component';
import { ListExperimentalItemsExampleComponent } from '../../examples/list-experimental-example/examples/item';
import { ListExperimentalSlidingItemsExampleComponent } from '../../examples/list-experimental-example/examples/item-sliding';

@Component({
  selector: 'cookbook-list-experimental-showcase',
  templateUrl: './list-experimental-showcase.component.html',
  styleUrls: ['./list-experimental-showcase.component.scss'],
  imports: [
    RouterLink,
    CodeViewerComponent,
    ListExperimentalItemsExampleComponent,
    ListExperimentalSlidingItemsExampleComponent,
  ],
})
export class ListExperimentalShowcaseComponent {
  multipleListsExample: string = `<kirby-list-experimental>
  <kirby-section-header outside></kirby-section-header>
  ...
</kirby-list-experimental>

<kirby-list-experimental>
  <kirby-section-header outside></kirby-section-header>
  ...
</kirby-list-experimental>`;
}
