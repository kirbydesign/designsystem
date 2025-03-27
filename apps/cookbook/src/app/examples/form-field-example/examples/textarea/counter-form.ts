import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormFieldModule, TextareaComponent } from '@kirbydesign/designsystem/form-field';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { ReactiveFormStateComponent } from '../../../reactive-form-state/reactive-form-state.component';
import { ExampleConfigurationWrapperComponent } from '../../../example-configuration-wrapper/example-configuration-wrapper.component';

const config = {
  selector: 'cookbook-form-field-textarea-counter-form-example',
  template: `<form [formGroup]="form">
  <kirby-form-field>
    <textarea 
      kirby-textarea 
      placeholder="Enter your message (max 140 chars)" 
      #message 
      maxlength="140"
      formControlName="message"
    ></textarea>
    <kirby-input-counter [listenTo]="message"></kirby-input-counter>
  </kirby-form-field>
  
  <button 
    kirby-button 
    attentionLevel="3" 
    (click)="resetForm()"
    [disabled]="!form.get('message').value"
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
    TextareaComponent,
    ReactiveFormsModule,
    ButtonComponent,
    ReactiveFormStateComponent,
    ExampleConfigurationWrapperComponent,
  ],
  standalone: true,
})
export class FormFieldTextareaCounterFormExampleComponent {
  template: string = config.template;
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      message: [''],
    });
  }

  resetForm() {
    this.form.reset();
  }
}
