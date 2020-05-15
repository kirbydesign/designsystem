import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-radio-button-example-template-driven-forms',
  template: `<kirby-radio-button-group #group="ngModel" [(ngModel)]="selected" required>
  <kirby-item *ngFor="let item of items" selectable="true">
    <kirby-radio-button [value]="item.value" slot="start"></kirby-radio-button>
    <kirby-label>{{item.title}}</kirby-label>
  </kirby-item>
</kirby-radio-button-group>
<section>
    <b>Selected:</b> {{selected | json}}
    <span class="required" *ngIf="group.errors?.required">Missing selection</span>
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
  styles: [
    `span.required {
      background-color: #ff595e;
      margin-right: 4px;
      padding: 0px 2px;
      border-radius: 4px;
    }`,
  ],
};

@Component({
  selector: config.selector,
  template: config.template,
  styles: config.styles,
})
export class RadioButtonExampleTemplateDrivenFormsComponent {
  template: string = config.template.split('<section>')[0]; // Remove status part of the template
  codeSnippet: string = config.codeSnippet.trim();

  items = [
    { title: 'Bacon', value: 1 },
    { title: 'Salami', value: 2 },
    { title: 'Tenderloin', value: 3 },
    { title: 'Tongue', value: 4 },
    { title: 'Drumstick', value: 5 },
  ];
  selected = null;
}
