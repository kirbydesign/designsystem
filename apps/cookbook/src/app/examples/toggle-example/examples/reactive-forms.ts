import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

const config = {
  selector: 'cookbook-toggle-reactive-forms-example',
  template: `<form [formGroup]="form">
  <kirby-toggle
    formControlName="myToggle"
    (checkedChange)="onCheckedChange()"
    [disabled]="!canSelectToggle"
  ></kirby-toggle>
</form>
<cookbook-example-configuration-wrapper>
  <kirby-checkbox
    [checked]="canSelectToggle"
    (checkedChange)="toggleEnabled($event)"
    text="Form field enabled"
  ></kirby-checkbox>
 <cookbook-reactive-form-state [form]="form"/>
</cookbook-example-configuration-wrapper>`,
  codeSnippet: `constructor(private fb: FormBuilder) {}

ngOnInit() {
  this.form = this.fb.group({ myToggle: [false] });
}

toggleEnabled(checked: boolean) {
  this.canSelectToggle = checked;

  if (this.canSelectToggle) {
     this.form.get('myToggle')?.enable();
  } else {
    this.form.get('myToggle')?.disable();
  }
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
