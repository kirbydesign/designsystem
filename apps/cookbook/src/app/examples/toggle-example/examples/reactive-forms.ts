import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItemModule } from '@kirbydesign/designsystem/item';
import { ToggleComponent } from '@kirbydesign/designsystem/toggle';
import { CheckboxComponent } from '@kirbydesign/designsystem/checkbox';
import { ExampleConfigurationWrapperComponent } from '../../example-configuration-wrapper/example-configuration-wrapper.component';
import { ReactiveFormStateComponent } from '../../reactive-form-state/reactive-form-state.component';

const config = {
  selector: 'cookbook-toggle-reactive-forms-example',
  template: `<form [formGroup]="form">
  <kirby-item>
    <kirby-toggle
      slot="end"
      formControlName="myToggle"
      (checkedChange)="onCheckedChange()"
    >Toggle in form</kirby-toggle>
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
  styleUrls: ['./toggle-examples.shared.scss'],
  template: config.template,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ItemModule,
    ToggleComponent,
    ExampleConfigurationWrapperComponent,
    CheckboxComponent,
    ReactiveFormStateComponent,
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
