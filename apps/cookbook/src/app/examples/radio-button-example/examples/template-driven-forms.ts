import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-radio-button-example-template-driven-forms',
  template: `<kirby-radio-button-group #group="ngModel" [(ngModel)]="selected" required>
  <kirby-item *ngFor="let item of items" selectable="true">
    <kirby-radio-button [value]="item" slot="start"></kirby-radio-button>
    <kirby-label>{{item.title}}</kirby-label>
  </kirby-item>
</kirby-radio-button-group>
<fieldset>
  <legend>Configuration</legend>
  <button kirby-button size="sm" attentionLevel="2" [disabled]="selected === null" (click)="selected = null">Clear</button>
  <p class="selection">
    <b>Selected:</b> {{selected | json}}<br />
    <b>Form state:</b>:
      <span [class.state-true]="group.valid">valid: {{ group.valid }}</span>
      <span [class.state-true]="group.touched">touched: {{ group.touched }}</span>    
  </p>
</fieldset>`,
  codeSnippet: `
items = [
  { title: 'Bacon', value: 1 },
  { title: 'Salami', value: 2 },
  { title: 'Tenderloin', value: 3 },
  { title: 'Tongue', value: 4 },
  { title: 'Drumstick', value: 5 },
];
selected = this.items[2];`,
  styles: [
    `span.required {
      background-color: #ff595e;
      margin-right: 4px;
      padding: 0px 2px;
      border-radius: 4px;
    }
    
    .selection {
      margin: 0;
      font-size: 12px;
      line-height: 16px;
      font-style: italic;
    }
    
    span {
      background-color: #ff595e;
      margin-right: 4px;
      padding: 0px 2px;
      border-radius: 4px;
    }
    
    span.state-true {
      background-color: #2cf287;
    }`,
  ],
};

@Component({
  selector: config.selector,
  template: config.template,
  styles: config.styles,
})
export class RadioButtonExampleTemplateDrivenFormsComponent {
  template: string = config.template.split('<fieldset>')[0]; // Remove status part of the template
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
