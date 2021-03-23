import { Component, OnInit } from '@angular/core';

const config = {
  selector: 'cookbook-radio-template-driven-forms-example',
  template: `<kirby-radio-group #group="ngModel" [items]="items" [(ngModel)]="selected" required>
</kirby-radio-group>
<cookbook-example-configuration-wrapper>
  <button kirby-button size="sm" attentionLevel="2" [disabled]="selected === null" (click)="selected = null">
      Clear
  </button>
  <p class="selection">
    <b>Selected:</b>
    {{selected | json}}
    <br/>
    <span [class.state-true]="group.valid">
      <b>valid:</b>
      {{ group.valid }}
    </span>
    <br/>
    <span>
      <b>errors:</b>
      {{ group.errors | json }}
    </span>
    <br/>
    <span [class.state-true]="group.enabled">
      <b>enabled:</b>
      {{ group.enabled }}
    </span>
    <br/>
    <span [class.state-true]="group.touched"><b>touched:</b> {{ group.touched }}</span>
  </p>
</cookbook-example-configuration-wrapper>
    `,
  styles: [
    `.selection {
      margin: 0;
      font-size: 12px;
      line-height: 16px;
      font-style: italic;
    }`,
  ],
  codeSnippet: `items = [
  'Bacon',
  'Salami',
  'Tenderloin',
  'Tongue',
  'Drumstick',
];

selected = null;`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styles: [],
})
export class RadioTemplateDrivenFormsExampleComponent {
  template: string = config.template.split('<cookbook-example-configuration-wrapper>')[0];
  codeSnippet: string = config.codeSnippet;

  items = ['Bacon', 'Salami', 'Tenderloin', 'Tongue', 'Drumstick'];
  selected = null;
}
