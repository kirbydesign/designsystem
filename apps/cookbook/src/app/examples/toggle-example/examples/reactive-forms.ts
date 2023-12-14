import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

const config = {
  selector: 'cookbook-toggle-reactive-forms-example',
  template: `<form [formGroup]="form">
  <kirby-item>
    <h3>Toggle in form</h3>
    <kirby-toggle
      slot="end"
      formControlName="myToggle"
      (checkedChange)="onCheckedChange()"
    ></kirby-toggle>
  </kirby-item>
      
</form>
<cookbook-example-configuration-wrapper>
  <kirby-checkbox
    [checked]="true"
    (checkedChange)="toggleEnabled($event)"
    text="Form field enabled"
  ></kirby-checkbox>
  <cookbook-reactive-form-state [form]="form"></cookbook-reactive-form-state>
</cookbook-example-configuration-wrapper>`,
  codeSnippet: `constructor(private fb: FormBuilder) {}

ngOnInit() {
  this.form = this.fb.group({ myToggle: [false] });
}

toggleEnabled(checked: boolean) {
  if (checked) {
     this.form.get('myToggle')?.enable();
  } else {
    this.form.get('myToggle')?.disable();
}
`,
};

@Component({
  selector: config.selector,
  styleUrls: ['../toggle-example.component.scss'],
  template: config.template,
  styles: [
    `
      :host {
        display: flex;
        align-items: center;
        gap: 40px;
      }

      kirby-item h3 {
        padding-inline-end: 40px;
      }
    `,
  ],
})
export class ToggleReactiveFormsExampleComponent implements OnInit {
  template = config.template.split('<cookbook-example-configuration-wrapper>')[0];
  codeSnippet = config.codeSnippet;
  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({ myToggle: [false] });
  }

  onCheckedChange() {
    console.log(`Value:`, this.form.get('myToggle')?.value);
  }

  toggleEnabled(checked: boolean) {
    if (checked) {
      this.form.get('myToggle')?.enable();
    } else {
      this.form.get('myToggle')?.disable();
    }
  }
}
