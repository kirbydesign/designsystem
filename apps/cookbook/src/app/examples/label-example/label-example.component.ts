import { Component } from '@angular/core';
import { LabelExampleItemComponent } from './examples/item';

@Component({
  selector: 'cookbook-label-example',
  template: `
    <cookbook-label-example-item></cookbook-label-example-item>
  `,
  imports: [LabelExampleItemComponent],
})
export class LabelExampleComponent {}
