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
    <div></div>
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
    [checked]="canSelectFavorite"
    (click)="toggleCanSelectFavorite()"
    text="Form field enabled"
  ></kirby-checkbox>
  
  <section class="form-state">
    <h4>Form state:</h4>
    <p>
      <strong>Value:</strong> {{ form.value | json }}
      <br />
      <strong>Bacon:</strong>
      <span [class.state-true]="form.get('Bacon').valid">valid: {{ form.get('Bacon').valid }}</span>
      <span [class.state-true]="form.get('Bacon').enabled">enabled: {{ form.get('Bacon').enabled }}</span>
      <span [class.state-true]="form.get('Bacon').touched">touched: {{ form.get('Bacon').touched }}</span>
     <strong>Salami:</strong>
     <span [class.state-true]="form.get('Salami').valid">valid: {{ form.get('Salami').valid }}</span>
      <span [class.state-true]="form.get('Salami').enabled">enabled: {{ form.get('Salami').enabled }}</span>
      <span [class.state-true]="form.get('Salami').touched">touched: {{ form.get('Salami').touched }}</span>
      <strong>Tenderloin:</strong>
      <span [class.state-true]="form.get('Tenderloin').valid">valid: {{ form.get('Tenderloin').valid }}</span>
      <span [class.state-true]="form.get('Tenderloin').enabled">enabled: {{ form.get('Tenderloin').enabled }}</span>
      <span [class.state-true]="form.get('Tenderloin').touched">touched: {{ form.get('Tenderloin').touched }}</span>

    </p>
  </section>
  </cookbook-example-configuration-wrapper>`,
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
  styleUrls: ['../../ng-forms.shared.scss'],
  styles: [
    `
      strong {
        display: block;
      }
    `,
  ],
})
export class CheckboxReactiveFormsExampleComponent {
  template: string = `<form [formGroup]="form">
  <kirby-checkbox formControlName="Bacon" text="Bacon" [disabled]="!canSelectFavorite">
  </kirby-checkbox>
</form>`;
  codeSnippet: string = config.codeSnippet;

  form: FormGroup = this.formBuilder.group({
    Bacon: new FormControl(false),
    Salami: new FormControl(false),
    Tenderloin: new FormControl(false),
  });
  canSelectFavorite = true;

  constructor(private formBuilder: FormBuilder) {}

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
