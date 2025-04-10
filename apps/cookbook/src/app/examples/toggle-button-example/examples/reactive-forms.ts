import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  ButtonComponent,
  CheckboxComponent,
  IconModule,
  ToggleButtonModule,
} from '@kirbydesign/designsystem';
import { ExampleConfigurationWrapperComponent } from '../../example-configuration-wrapper/example-configuration-wrapper.component';
import { ReactiveFormStateComponent } from '../../reactive-form-state/reactive-form-state.component';

const config = {
  selector: 'cookbook-toggle-button-reactive-forms-example',
  template: `<form [formGroup]="form">
    <div class="toggle-buttons">
      <kirby-toggle-button formControlName="notifications" [disabled]="!isEnabled">
        <button kirby-button unchecked attentionLevel="3" aria-label="Notifications disabled">
          <kirby-icon name="notification"></kirby-icon>
        </button>
        <button kirby-button checked attentionLevel="3" aria-label="Notifications enabled">
          <kirby-icon name="notification-fill"></kirby-icon>
        </button>
      </kirby-toggle-button>

      <kirby-toggle-button formControlName="status" [disabled]="!isEnabled">
        <button kirby-button unchecked attentionLevel="3">Deactivated</button>
        <button kirby-button checked attentionLevel="2">Activated</button>
      </kirby-toggle-button>
    </div>
  </form>

  <cookbook-example-configuration-wrapper>
    <kirby-checkbox [checked]="isEnabled" (checkedChange)="toggleEnabled()">
      Form field enabled
    </kirby-checkbox>
    <cookbook-reactive-form-state [form]="form"></cookbook-reactive-form-state>
  </cookbook-example-configuration-wrapper>`,
  styles: [
    `
    :host {
      display: flex;
      gap: 1rem;
    }

    .toggle-buttons {
      display: flex;
      flex-direction: column;
    }

    cookbook-example-configuration-wrapper {
      flex: 1;
    }
  `,
  ],
  codeSnippet: `form: FormGroup = this.formBuilder.group({
  notifications: new FormControl(false),
  status: new FormControl(false),
});

toggleEnabled() {
  this.isEnabled = !this.isEnabled;
  if (this.isEnabled) {
    this.form.enable();
  } else {
    this.form.disable();
  }
}`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styles: config.styles,
  imports: [
    ToggleButtonModule,
    ButtonComponent,
    IconModule,
    CheckboxComponent,
    FormsModule,
    ExampleConfigurationWrapperComponent,
    ReactiveFormStateComponent,
    ReactiveFormsModule,
  ],
})
export class ToggleButtonReactiveFormsExampleComponent {
  template: string = config.template.split('<cookbook-example-configuration-wrapper>')[0]; // Remove config part of the template
  codeSnippet: string = config.codeSnippet;

  form: FormGroup = this.formBuilder.group({
    notifications: new FormControl(false),
    status: new FormControl(false),
  });

  isEnabled = true;

  constructor(private formBuilder: FormBuilder) {}

  toggleEnabled() {
    this.isEnabled = !this.isEnabled;
    if (this.isEnabled) {
      this.form.enable();
    } else {
      this.form.disable();
    }
  }
}
