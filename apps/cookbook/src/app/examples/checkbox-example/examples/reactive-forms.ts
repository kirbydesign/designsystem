import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const config = {
  selector: 'cookbook-checkbox-reactive-forms-example',
  template: `<form [formGroup]="form">
  <kirby-checkbox formControlName="isChecked" text="Reactive Forms" [disabled]="!canSelectFavorite"></kirby-checkbox>
</form>

<fieldset class="checkbox-xs">
  <legend>Configuration</legend>
  <kirby-checkbox
    [checked]="canSelectFavorite"
    (click)="toggleCanSelectFavorite()"
    text="Form field enabled"
  ></kirby-checkbox>

  <section class="form-state">
    <h4>Form state:</h4>
    <p>
      <strong>Value:</strong> {{ form.get('isChecked').value | json }}
      <br />
      <span [class.state-true]="form.get('isChecked').valid">valid: {{ form.get('isChecked').valid }}</span>
      <span [class.state-true]="form.get('isChecked').enabled">enabled: {{ form.get('isChecked').enabled }}</span>
      <span [class.state-true]="form.get('isChecked').touched">touched: {{ form.get('isChecked').touched }}</span>
    </p>
  </section>
</fieldset>`,
  codeSnippet: `
    }
    `,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./ng-forms.shared.scss'],
})
export class CheckboxReativeFormsExampleComponent implements OnInit {
  template: string = config.template.split('<fieldset>')[0];
  codeSnippet: string = config.codeSnippet;
  form: FormGroup;
  canSelectFavorite = true;
  favoriteRequired = true;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      isChecked: [
        { value: false, disabled: !this.canSelectFavorite },
        this.favoriteRequired ? Validators.required : null,
      ],
    });
  }

  toggleCanSelectFavorite() {
    this.canSelectFavorite = !this.canSelectFavorite;

    if (this.canSelectFavorite) {
      this.form.get('isChecked')?.enable();
    } else {
      this.form.get('isChecked')?.disable();
    }
  }
}
