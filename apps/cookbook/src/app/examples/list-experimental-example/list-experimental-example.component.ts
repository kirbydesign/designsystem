import { Component } from '@angular/core';
import { ListExperimentalItemsExampleComponent } from './examples/item';
import { ListExperimentalSlidingItemsExampleComponent } from './examples/item-sliding';

@Component({
  selector: 'cookbook-list-example',
  templateUrl: './list-experimental-example.component.html',
  styleUrls: ['./list-experimental-example.component.scss'],
  imports: [ListExperimentalItemsExampleComponent, ListExperimentalSlidingItemsExampleComponent],
})
export class ListExperimentalExampleComponent {}
