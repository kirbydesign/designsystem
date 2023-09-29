import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

const config = {
  selector: 'cookbook-toggle-reactive-forms-example',
  template: `<form [formGroup]="form">
<kirby-toggle formControlName="myToggle" (checkedChange)="onCheckedChange($event)" [disabled]="!canSelectToggle"></kirby-toggle>
</form>
<cookbook-example-configuration-wrapper>

  <kirby-checkbox
    [checked]="canSelectToggle"
    (checkedChange)="toggleEnabled($event)"
    text="Form field enabled"
  >
  </kirby-checkbox>

  <section class="form-state">
    <h4>Form state:</h4>
    <p>
      <strong>form.value:</strong> {{ form.value | json }}
    </p>
    <p>
      <strong>form.value: </strong>
      <span [class.state-true]="form.get('myToggle').valid">valid: {{ form.get('myToggle').valid }}</span>
      <span [class.state-true]="form.get('myToggle').enabled">enabled: {{ form.get('myToggle').enabled }}</span>
      <span [class.state-true]="form.get('myToggle').touched">touched: {{ form.get('myToggle').touched }}</span>
    </p>
  </section>
</cookbook-example-configuration-wrapper>`,
  codeSnippet: `constructor(private fb: FormBuilder) {}

ngOnInit() {
  this.form = this.fb.group({ myToggle: [false] });
}

onCheckedChange() {
    this.form.get('myToggle')?.markAsTouched();
}

toggleEnabled(checked: boolean) {
  this.canSelectToggle = checked;

  if (this.canSelectToggle) {
    this.form.get('myToggle')?.enable();
  } 
  else {
    this.form.get('myToggle')?.disable();
  }
}`,
};

@Component({
  selector: config.selector,
  styleUrls: ['../toggle-example.component.scss', './ng-forms.shared.scss'],
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
export class ToggleReactiveFormsExampleComponent implements OnInit {
  template = config.template.split('<cookbook-example-configuration-wrapper>')[0];
  codeSnippet = config.codeSnippet;
  form: FormGroup;
  canSelectToggle = true;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({ myToggle: [false] });
  }

  onCheckedChange() {
    console.log(`Value:`, this.form.get('myToggle')?.value);
    // this.form.get('myToggle')?.markAsTouched();
  }

  toggleEnabled(checked: boolean) {
    this.canSelectToggle = checked;

    if (this.canSelectToggle) {
      this.form.get('myToggle')?.enable();
    } else {
      this.form.get('myToggle')?.disable();
    }
  }
}
