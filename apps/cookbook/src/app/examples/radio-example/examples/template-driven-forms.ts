import { Component, OnInit } from '@angular/core';
import { stringifyPretty } from '~/app/shared/code-viewer/code-viewer.component';

const items = ['Bacon', 'Salami', 'Tenderloin', 'Tongue', 'Drumstick'];

const config = {
  selector: 'cookbook-radio-template-driven-forms-example',
  template: `<kirby-radio-group #group="ngModel" [items]="items" [(ngModel)]="selected" required>
</kirby-radio-group>
<cookbook-example-configuration-wrapper>
  <button kirby-button size="sm" attentionLevel="2" [disabled]="selected === null" (click)="selected = null">
    Clear selection
  </button>

  <p class="selection">
    <strong>Selected:</strong> {{ selected | json }}<br />
    <strong>ngModel: </strong>
    <span [class.state-true]="group.valid">valid: {{ group.valid }}</span>
    <span [class.state-true]="group.enabled">enabled: {{ group.enabled }}</span>
    <span [class.state-true]="group.touched">touched: {{ group.touched }}</span><br />
    <strong>ngModel.errors: </strong>
    <span [class.state-true]="!group.errors">{{ group.errors | json }}</span>
  </p>
</cookbook-example-configuration-wrapper>
    `,
  codeSnippet: `items = ${stringifyPretty(items)};

selected = null;`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./ng-forms.shared.scss'],
})
export class RadioTemplateDrivenFormsExampleComponent {
  template: string = config.template.split('<cookbook-example-configuration-wrapper>')[0];
  codeSnippet: string = config.codeSnippet;

  items = items;
  selected = null;
}
