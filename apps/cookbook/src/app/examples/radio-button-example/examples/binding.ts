import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-radio-button-example-binding',
  template: `<kirby-radio-button-group [(value)]="selected">
  <kirby-item *ngFor="let item of items" selectable="true">
    <kirby-radio-button [value]="item" slot="start"></kirby-radio-button>
    <kirby-label>{{item.title}}</kirby-label>
  </kirby-item>
</kirby-radio-button-group>
<fieldset>
  <legend>Configuration</legend>
  <button kirby-button size="sm" attentionLevel="2" [disabled]="selected === null" (click)="selected = null">Clear</button>
  <p class="selection">
    <b>Selected:</b> {{selected | json}}
  </p>
</fieldset>
`,
  styles: [
    `.selection {
      margin: 0;
      font-size: 12px;
      line-height: 16px;
      font-style: italic;
    }`,
  ],
  codeSnippet: `
items = [
  { title: 'Bacon', value: 1 },
  { title: 'Salami', value: 2 },
  { title: 'Tenderloin', value: 3 },
  { title: 'Tongue', value: 4 },
  { title: 'Drumstick', value: 5 },
];
selected = this.items[2];`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styles: config.styles,
})
export class RadioButtonExampleBindingComponent {
  template: string = config.template.split('<fieldset>')[0]; // Remove config part of the template
  codeSnippet: string = config.codeSnippet.trim();

  items = [
    { title: 'Bacon', value: 1 },
    { title: 'Salami', value: 2 },
    { title: 'Tenderloin', value: 3 },
    { title: 'Tongue', value: 4 },
    { title: 'Drumstick', value: 5 },
  ];
  selected = this.items[2];
}
