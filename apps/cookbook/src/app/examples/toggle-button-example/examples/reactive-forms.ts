import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

const config = {
  selector: 'cookbook-toggle-button-reactive-forms-example',
  template: `<form [formGroup]="form">
  <kirby-toggle-button formControlName="myToggleButton" [checked]="true" (checkChanged)="onCheckChanged($event)">
  <button kirby-button unchecked attentionLevel="3">Deactivated</button>
  <button kirby-button checked themeColor="success">Activated</button>
  </kirby-toggle-button>
</form>
  <cookbook-example-configuration-wrapper>
    <section class="form-state">
      <h4>Form state:</h4>
      <p>
        <strong>form.value:</strong> {{ form.value | json }}
      </p>
      <p>
        <strong>form.value: </strong>
        <span [class.state-true]="form.get('myToggleButton').valid">valid: {{ form.get('myToggleButton').valid }}</span>
        <span [class.state-true]="form.get('myToggleButton').enabled">enabled: {{ form.get('myToggleButton').enabled }}</span>
        <span [class.state-true]="form.get('myToggleButton').touched">touched: {{ form.get('myToggleButton').touched }}</span>
      </p>
    </section>
  </cookbook-example-configuration-wrapper>
`,
  codeSnippet: `form: FormGroup;

constructor(private fb: FormBuilder) {}
  
ngOnInit() {
  this.form = this.fb.group({ myToggleButton: [false] });
}

onCheckChanged(checked: boolean) {}`,
};

@Component({
  selector: config.selector,
  styleUrls: ['../toggle-button-example.component.scss', './ng-forms.shared.scss'],
  template: config.template,
  styles: [
    `
      :host {
        display: flex;
        align-items: center;
      }
    `,
  ],
})
export class ToggleButtonReactiveFormsExampleComponent implements OnInit {
  template = config.template.split('<cookbook-example-configuration-wrapper>')[0];
  codeSnippet = config.codeSnippet;
  form: FormGroup;

  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.form = this.fb.group({ myToggleButton: [false] });
  }

  onCheckChanged(checked: boolean) {
    console.log(`Toggle onCheckChanged: ${checked}`);
  }
}
