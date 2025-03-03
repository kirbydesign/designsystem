import { Component } from '@angular/core';
import { SimpleListNoShapeExampleComponent } from './examples/simple-list-no-shape';
import { DetailedCardWithListNoShapeComponent } from './examples/detailed-card-with-list-no-shape';
import { MultiCardListNoShapeExampleComponent } from './examples/multi-card-list-no-shape';

@Component({
  selector: 'cookbook-list-no-shape-example',
  templateUrl: './list-no-shape-example.component.html',
  styleUrls: ['./list-no-shape-example.component.scss'],
  imports: [
    SimpleListNoShapeExampleComponent,
    DetailedCardWithListNoShapeComponent,
    MultiCardListNoShapeExampleComponent,
  ],
})
export class ListNoShapeExampleComponent {}
