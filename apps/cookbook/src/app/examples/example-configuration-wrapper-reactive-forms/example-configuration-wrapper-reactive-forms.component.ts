import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'cookbook-example-configuration-wrapper-reative-forms',
  templateUrl: './example-configuration-wrapper-reactive-forms.component.html',
  styleUrls: ['./example-configuration-wrapper-reactive-forms.component.scss'],
})
export class ExampleConfigurationWrapperReactiveFormsComponent {
  @Input() form: FormGroup;

  isRequired(controlId: string): boolean {
    const control = this.form.get(controlId);

    if (!control) {
      return false;
    }

    const errors = control.errors;

    return !!errors && !!errors.required;
  }
}
