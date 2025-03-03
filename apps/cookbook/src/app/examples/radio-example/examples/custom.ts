import { Component } from '@angular/core';
import { RadioModule } from '@kirbydesign/designsystem/radio';
import { ListModule } from '@kirbydesign/designsystem/list';
import { stringifyPretty } from '~/app/shared/code-viewer/code-viewer.component';

const items = [
  { label: 'Bacon', description: 'Meat’s own spice', rating: 100 },
  { label: 'Bologna', description: 'The heart of the bologna sandwich', rating: 75 },
  { label: 'Tenderloin', description: 'Love me tender ❤️', rating: 50 },
];

const config = {
  selector: 'cookbook-radio-custom-content-example',
  template: `<kirby-radio-group [value]="selected" [items]="items" aria-label="Select main course">
  <div
    *kirbyListItemTemplate="let item; let selected = selected"
    [class.is-selected]="selected"
    class="wrapper">
    <kirby-radio
      [value]="item"
      [text]="item.label"
      [attr.title]="item.description">
    </kirby-radio>
    <span class="rating">Rating: {{item.rating}}</span>
  </div>
</kirby-radio-group>`,
  slottedTemplate: `<kirby-radio-group value="Bacon">
  <kirby-radio value="Bacon" text="Bacon"></kirby-radio>
  <kirby-radio value="Bologna" text="Bologna"></kirby-radio>
  <kirby-radio value="Tenderloin" text="Tenderloin"></kirby-radio>
</kirby-radio-group>`,
  codeSnippet: `items = ${stringifyPretty(items)};

selected = this.items[1];`,
  styles: [
    `.wrapper {
  display: flex;
  align-items: center;
}

.rating {
  font-size: 14px;
  padding: 2px 8px;
  margin-left: 8px;
  background-color: var(--kirby-semi-light);
  border-radius: 4px;
  transition: background-color 200ms;
}

.is-selected .rating {
  background-color: var(--kirby-success);
}`,
  ],
};

@Component({
  selector: config.selector,
  template: config.template,
  styles: config.styles,
  imports: [RadioModule, ListModule],
})
export class RadioCustomContentExampleComponent {
  template: string = `<!-- 1. Using slotted <kirby-radio> -->
${config.slottedTemplate}

<!-- 2. Using *kirbyListItemTemplate -->
${config.template}`;
  codeSnippet: string = config.codeSnippet;
  styles: string = config.styles.join(`
`);

  items = items;
  selected = this.items[1];
}
