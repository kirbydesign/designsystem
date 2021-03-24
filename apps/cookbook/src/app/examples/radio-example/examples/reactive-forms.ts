import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { stringifyPretty } from '~/app/shared/code-viewer/code-viewer.component';

const items = ['Bacon', 'Salami', 'Tenderloin', 'Tongue', 'Drumstick'];

const config = {
  selector: 'cookbook-radio-reactive-forms-example',
  template: `<form [formGroup]="form">
  <kirby-radio-group formControlName="favoriteFood" [items]="items"> </kirby-radio-group>
</form>
<cookbook-example-configuration-wrapper>
  <button
    kirby-button
    size="sm"
    attentionLevel="2"
    [disabled]="favoriteFoodControl.value === null"
    (click)="clearForm()"
  >
    Clear form
  </button>

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

  <p class="selection">
    <b>value:</b>
    {{ form.value | json }}
    <br />
    <span [class.state-true]="favoriteFoodControl.valid">
      <b>valid:</b>
      {{ favoriteFoodControl.valid }}
    </span>
    <br />
    <span [class.state-true]="favoriteFoodControl.errors">
      <b>errors:</b>
      {{ favoriteFoodControl.errors | json }}
    </span>
    <br />
    <span [class.state-true]="favoriteFoodControl.enabled">
      <b>enabled:</b>
      {{ favoriteFoodControl.enabled }}
    </span>
    <br />
    <span [class.state-true]="favoriteFoodControl.touched">
      <b>touched:</b>
      {{ favoriteFoodControl.touched }}
    </span>
  </p>
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
  styles: [
    `
      kirby-checkbox:not(:first-of-type) {
        margin-top: 4px;
      }

      kirby-checkbox.indent {
        margin-left: 32px;
        margin-top: 4px;
        font-size: 16px;
      }

      cookbook-example-configuration-wrapper {
        margin-top: 40px;
      }
    `,
  ],
})
export class RadioReactiveFormsExampleComponent implements OnInit {
  template: string = config.template.split('<cookbook-example-configuration-wrapper>')[0];
  codeSnippet: string = config.codeSnippet;

  form: FormGroup;
  favoriteFoodControl: FormControl;
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
    this.favoriteFoodControl = new FormControl(
      null,
      this.favoriteRequired ? Validators.required : null
    );
    if (!this.canSelectFavorite) {
      this.favoriteFoodControl.disable();
    }
    this.form = new FormGroup({
      favoriteFood: this.favoriteFoodControl,
    });
  }
}
