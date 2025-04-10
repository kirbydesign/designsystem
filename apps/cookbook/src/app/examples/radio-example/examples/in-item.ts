import { Component } from '@angular/core';

import { CardModule } from '@kirbydesign/designsystem/card';
import { RadioModule } from '@kirbydesign/designsystem/radio';
import { NgFor } from '@angular/common';
import { ItemModule } from '@kirbydesign/designsystem/item';
import { stringifyPretty } from '~/app/shared/code-viewer/code-viewer.component';

const items = [
  { title: 'Bacon', value: 1 },
  { title: 'Salami (disabled)', value: 2, disabled: true },
  { title: 'Tenderloin', value: 3 },
];

const config = {
  selector: 'cookbook-radio-in-item-example',
  template: `<kirby-card>
  <kirby-radio-group [value]="selected" aria-label="Select main course">
    <kirby-item *ngFor="let item of items">
      <kirby-radio [value]="item" slot="start" [disabled]="item.disabled">
        {{item.title}}
      </kirby-radio>
    </kirby-item> 
  </kirby-radio-group>
</kirby-card>`,
  codeSnippet: `items = ${stringifyPretty(items)};
selected = this.items[2];`,
};

@Component({
  selector: config.selector,
  template: config.template,
  imports: [CardModule, RadioModule, NgFor, ItemModule],
})
export class RadioInItemExampleComponent {
  template: string = config.template;
  codeSnippet: string = config.codeSnippet;

  items = items;
  selected = this.items[2];
}
