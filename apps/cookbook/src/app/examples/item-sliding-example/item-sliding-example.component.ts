import { Component } from '@angular/core';
import { ItemSlidingConditionalExampleComponent } from './examples/item-sliding-conditional-example.component';

@Component({
  selector: 'cookbook-item-sliding-example',
  template: `
    <cookbook-item-sliding-conditional-example></cookbook-item-sliding-conditional-example>
  `,
  imports: [ItemSlidingConditionalExampleComponent],
})
export class ItemSlidingExampleComponent {}
