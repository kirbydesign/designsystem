import { Component } from '@angular/core';
import { ItemGroupSimpleExampleComponent } from './examples/simple';
import { ItemGroupWithSectionHeaderExampleComponent } from './examples/with-header';

@Component({
  selector: 'cookbook-item-group-example',
  templateUrl: './item-group-example.component.html',
  imports: [ItemGroupSimpleExampleComponent, ItemGroupWithSectionHeaderExampleComponent],
})
export class ItemGroupExampleComponent {}
