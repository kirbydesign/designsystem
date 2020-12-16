import { Component } from '@angular/core';

import { stringifyPretty } from '~/app/shared/code-viewer/code-viewer.component';

const items = [
  { label: 'Bacon', description: 'Meat’s own spice', rating: 100 },
  { label: 'Bologna', description: 'The heart of the bologna sandwich', rating: 75 },
  { label: 'Tenderloin', description: 'Love me tender ❤️', rating: 50 },
];

const config = {
  selector: 'cookbook-radio-custom-content-example',
  template: `<kirby-radio-group [value]="selected" [items]="items">
  <kirby-label *kirbyListItemTemplate="let item; let selected = selected" [title]="item.description" [class.is-selected]="selected">
    <kirby-radio [value]="item"></kirby-radio>
    <span>{{item.label}}</span>
    <em class="rating">Rating: {{item.rating}}</em>
  </kirby-label>
</kirby-radio-group>`,
  codeSnippet: `items = ${stringifyPretty(items)};

selected = this.items[1];`,
  styles: [
    `.rating {
  font-size: 12px;
  padding: 2px 4px;
  margin-left: 8px;
  background-color: var(--kirby-white);
  border: 1px solid var(--kirby-medium);
  border-radius: 4px;
  transition: background-color 200ms;
}

.is-selected .rating {
  background-color: var(--kirby-success);
  border: 1px solid var(--kirby-semi-dark);
}`,
  ],
};

@Component({
  selector: config.selector,
  template: config.template,
  styles: config.styles,
})
export class RadioCustomContentExampleComponent {
  template: string = config.template;
  codeSnippet: string = config.codeSnippet;
  styles: string = config.styles.join(`
`);

  items = items;
  selected = this.items[1];
}
