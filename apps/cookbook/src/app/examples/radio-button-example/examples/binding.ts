import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-radio-button-example-binding',
  template: `<kirby-radio-button-group [(value)]="selected">
  <kirby-item *ngFor="let item of items" selectable="true">
    <kirby-radio-button [value]="item.value" slot="start"></kirby-radio-button>
    <kirby-label>{{item.title}}</kirby-label>
  </kirby-item>
</kirby-radio-button-group>
<section>
    <b>Selected:</b> {{selected | json}}
    <button kirby-button size="sm" *ngIf="selected" (click)="selected = null">Clear</button>
</section>
`,
  codeSnippet: `
items = [
  { title: 'Bacon', value: 1 },
  { title: 'Salami', value: 2 },
  { title: 'Tenderloin', value: 3 },
  { title: 'Tongue', value: 4 },
  { title: 'Drumstick', value: 5 },
];
selected = this.items[2].value;`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class RadioButtonExampleBindingComponent {
  template: string = config.template.split('<section>')[0]; // Remove status part of the template
  codeSnippet: string = config.codeSnippet.trim();

  items = [
    { title: 'Bacon', value: 1 },
    { title: 'Salami', value: 2 },
    { title: 'Tenderloin', value: 3 },
    { title: 'Tongue', value: 4 },
    { title: 'Drumstick', value: 5 },
  ];
  selected = this.items[2].value;
}
