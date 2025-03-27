import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormFieldModule, InputComponent } from '@kirbydesign/designsystem/form-field';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { InputSize } from '@kirbydesign/designsystem';
import { ReactiveFormStateComponent } from '../../../reactive-form-state/reactive-form-state.component';
import { ExampleConfigurationWrapperComponent } from '../../../example-configuration-wrapper/example-configuration-wrapper.component';

const config = {
  selector: 'cookbook-form-field-input-counter-form-example',
  template: `<form [formGroup]="form">
  <kirby-form-field>
    <input 
      kirby-input 
      [size]="size" 
      placeholder="Enter your message (max 140 chars)" 
      #message 
      maxlength="140"
      formControlName="message"
    />
    <kirby-input-counter [listenTo]="message"></kirby-input-counter>
  </kirby-form-field>
  
  <button 
    kirby-button 
    attentionLevel="3" 
    (click)="resetForm()"
  >
    Reset
  </button>
</form>
<cookbook-example-configuration-wrapper>
  <cookbook-reactive-form-state [form]="form"></cookbook-reactive-form-state>
</cookbook-example-configuration-wrapper>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  imports: [
    FormFieldModule,
    InputComponent,
    ReactiveFormsModule,
    ButtonComponent,
    ReactiveFormStateComponent,
    ExampleConfigurationWrapperComponent,
  ],
})
export class FormFieldInputCounterFormExampleComponent {
  template: string = config.template;
  form: FormGroup;
  @Input() size: InputSize;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      message: [''],
    });
  }

  resetForm() {
    this.form.reset();
  }
}
