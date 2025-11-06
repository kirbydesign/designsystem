import { Component } from '@angular/core';

import exampleHtml from '../../examples/item-group-example/item-group-example.component.html?raw';
import { ItemGroupSimpleExampleComponent } from '../../examples/item-group-example/examples/simple';
import { ExampleViewerComponent } from '../../shared/example-viewer/example-viewer.component';
import { ItemGroupWithSectionHeaderExampleComponent } from '../../examples/item-group-example/examples/with-header';
import { ImportViewerComponent } from '~/app/shared/import-code-viewer/import-code-viewer.component';
@Component({
  selector: 'cookbook-item-group-showcase',
  templateUrl: './item-group-showcase.component.html',
  imports: [
    ItemGroupSimpleExampleComponent,
    ExampleViewerComponent,
    ItemGroupWithSectionHeaderExampleComponent,
    ImportViewerComponent,
  ],
})
export class ItemGroupShowcaseComponent {
  exampleHtml = exampleHtml;
}
