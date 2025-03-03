import { Component } from '@angular/core';
import { ExampleViewerComponent } from '../../shared/example-viewer/example-viewer.component';
import { SimpleListNoShapeExampleComponent } from '../../examples/list-no-shape-example/examples/simple-list-no-shape';
import { DetailedCardWithListNoShapeComponent } from '../../examples/list-no-shape-example/examples/detailed-card-with-list-no-shape';
import { MultiCardListNoShapeExampleComponent } from '../../examples/list-no-shape-example/examples/multi-card-list-no-shape';

@Component({
  selector: 'cookbook-list-no-shape-showcase',
  templateUrl: './list-no-shape-showcase.component.html',
  styleUrls: ['./list-no-shape-showcase.component.scss'],
  imports: [
    ExampleViewerComponent,
    SimpleListNoShapeExampleComponent,
    DetailedCardWithListNoShapeComponent,
    MultiCardListNoShapeExampleComponent,
  ],
})
export class ListNoShapeShowcaseComponent {}
