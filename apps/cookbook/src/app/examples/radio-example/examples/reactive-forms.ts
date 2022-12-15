import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { stringifyPretty } from '~/app/shared/code-viewer/code-viewer.component';

const items = ['Bacon', 'Salami', 'Tenderloin', 'Tongue', 'Drumstick'];

const config = {
  selector: 'cookbook-radio-reactive-forms-example',
  template: `<form [formGroup]="form">
  <kirby-radio-group formControlName="favoriteFood" [items]="items"></kirby-radio-group>
</form>
<cookbook-example-configuration-wrapper>

  <kirby-checkbox
    [checked]="canSelectFavorite"
    (checkedChange)="toggleEnabled($event)"
    text="Form field enabled"
  >
  </kirby-checkbox>

  <kirby-checkbox
    [checked]="favoriteRequired"
    (checkedChange)="toggleRequired($event)"
    text="Form field required"
  >
  </kirby-checkbox>

  <button
    kirby-button
    size="sm"
    attentionLevel="2"
    [disabled]="favoriteFoodControl.value === null"
    (click)="clearForm()"
  >
    Clear form
  </button>

  <section class="form-state">
    <h4>Form state:</h4>
    <p>
      <strong>form.value:</strong> {{ form.value | json }}
    </p>
    <p>
      <strong>form.favoriteFood: </strong>
      <span [class.state-true]="favoriteFoodControl.valid">valid: {{ favoriteFoodControl.valid }}</span>
      <span [class.state-true]="favoriteFoodControl.enabled">enabled: {{ favoriteFoodControl.enabled }}</span>
      <span [class.state-true]="favoriteFoodControl.touched">touched: {{ favoriteFoodControl.touched }}</span>
    </p>
    <p>
      <strong>form.favoriteFood.errors: </strong>
      <span [class.state-true]="!favoriteFoodControl.errors">{{ favoriteFoodControl.errors | json }}</span>
    </p>
  </section>
</cookbook-example-configuration-wrapper>
    `,
  codeSnippet: `items = ${stringifyPretty(items)};

  const form = new FormGroup({
  favoriteFood: new FormControl({ value: this.items[1], disabled: !this.canSelectFavorite }),
});

const favoriteFoodControl = this.form.controls.get('favoriteFood'); 

toggleEnabled(enabled: boolean) {
  enabled
    ? favoriteFoodControl.enable()
    : favoriteFoodControl.disable();
}

toggleRequired(required: boolean) {
  required
    ? favoriteFoodControl.setValidators(Validators.required)
    : favoriteFoodControl.setValidators(null);
  favoriteFoodControl.updateValueAndValidity();
}`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./ng-forms.shared.scss'],
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: { '[class.checkbox-xs]': 'true' }, // Extra small checkboxes
})
export class RadioReactiveFormsExampleComponent implements OnInit {
  template: string = config.template.split('<cookbook-example-configuration-wrapper>')[0];
  codeSnippet: string = config.codeSnippet;

  form: UntypedFormGroup;
  favoriteFoodControl: UntypedFormControl;
  items = items;

  canSelectFavorite = true;
  favoriteRequired = true;

  ngOnInit() {
    this.buildForm();
  }

  toggleEnabled(enabled: boolean) {
    this.canSelectFavorite = enabled;
    enabled ? this.favoriteFoodControl.enable() : this.favoriteFoodControl.disable();
  }

  toggleRequired(required: boolean) {
    this.favoriteRequired = required;
    required
      ? this.favoriteFoodControl.setValidators(Validators.required)
      : this.favoriteFoodControl.setValidators(null);
    this.favoriteFoodControl.updateValueAndValidity();
  }

  clearForm() {
    this.favoriteFoodControl.setValue(null);
  }

  private buildForm() {
    this.favoriteFoodControl = new UntypedFormControl(
      null,
      this.favoriteRequired ? Validators.required : null
    );
    if (!this.canSelectFavorite) {
      this.favoriteFoodControl.disable();
    }
    this.form = new UntypedFormGroup({
      favoriteFood: this.favoriteFoodControl,
    });
  }
}
