import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

const config = {
  selector: 'cookbook-checkbox-reactive-forms-example',
  template: `<form [formGroup]="form">
  <kirby-checkbox
      formControlName="Bacon"
      text="Bacon"
      [disabled]="!canSelectFavorite">
  </kirby-checkbox>
    <kirby-checkbox
    formControlName="Salami"
    text="Salami"
    [disabled]="!canSelectFavorite"
  ></kirby-checkbox>
  <kirby-checkbox
    formControlName="Tenderloin"
    text="Tenderloin"
    [disabled]="!canSelectFavorite"
  ></kirby-checkbox>
</form>
<cookbook-example-configuration-wrapper>
  <kirby-checkbox
    (checkedChange)="toggleCanSelectFavorite()"
    text="Form field enabled">
  </kirby-checkbox>
  <cookbook-reactive-form-state [form]="form"></cookbook-reactive-form-state>
</cookbook-example-configuration-wrapper>

`,
  codeSnippet: `form: FormGroup = this.formBuilder.group({
  Bacon: new FormControl(false),
  Salami: new FormControl(false),
  Tenderloin: new FormControl(false),
});

toggleCanSelectFavorite() {
  this.canSelectFavorite = !this.canSelectFavorite;

  const currentStatus = this.form.controls['Bacon'].disabled;

  if (currentStatus) {
    this.form.controls['Bacon'].enable();
  } else {
    this.form.controls['Bacon'].disable();
  }
}
`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styles: [
    `
      strong {
        display: block;
      }
      :host {
        display: flex;
      }

      cookbook-reactive-form-state {
        margin-left: utils.size('xxs');

        @include utils.media('>=medium') {
          margin-left: utils.size('xl');
        }
      }
    `,
  ],
})
export class CheckboxReactiveFormsExampleComponent {
  template: string = config.template.split('<cookbook-example-configuration-wrapper>')[0]; // Remove config part of the template;
  codeSnippet: string = config.codeSnippet;

  form: FormGroup;
  canSelectFavorite = true;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      Bacon: new FormControl(false),
      Salami: new FormControl(false),
      Tenderloin: new FormControl(false),
    });
  }

  toggleCanSelectFavorite() {
    this.canSelectFavorite = !this.canSelectFavorite;

    const currentStatus = this.form.controls['Bacon'].disabled;

    if (currentStatus) {
      this.form.controls['Bacon'].enable();
      this.form.controls['Salami'].enable();
      this.form.controls['Tenderloin'].enable();
    } else {
      this.form.controls['Bacon'].disable();
      this.form.controls['Salami'].disable();
      this.form.controls['Tenderloin'].disable();
    }
  }
}
