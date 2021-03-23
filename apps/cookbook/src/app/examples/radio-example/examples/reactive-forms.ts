import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

const config = {
  selector: 'cookbook-radio-reactive-forms-example',
  template: `
    <form [formGroup]="form">
        <kirby-radio-group formControlName="favoriteFood" [items]="items">
        </kirby-radio-group>
    </form>
    <fieldset>
        <legend>Configuration</legend>
        <button kirby-button
                size="sm"
                attentionLevel="2"
                [disabled]="favoriteFoodControl.value === null"
                (click)="clearForm()">
            Clear
        </button>
        <kirby-checkbox [checked]="canSelectFavorite"
                        (checkedChange)="toggleEnabled($event)"
                        text="Form field enabled">
        </kirby-checkbox>
        <br/>
        <kirby-checkbox [checked]="favoriteRequired"
                        (checkedChange)="toggleRequired($event)"
                        text="Form field required">
        </kirby-checkbox>
        <p class="selection">
            <b>value:</b>
            {{ form.value | json }}
            <br/>
            <span [class.state-true]="favoriteFoodControl.valid">
                <b>valid:</b>
                {{ favoriteFoodControl.valid }}
            </span>
            <br/>
            <span [class.state-true]="favoriteFoodControl.errors">
                <b>errors:</b>
                {{ favoriteFoodControl.errors | json }}
            </span>
            <br/>
            <span [class.state-true]="favoriteFoodControl.enabled">
                <b>enabled:</b>
                {{ favoriteFoodControl.enabled }}
            </span>
            <br/>
            <span [class.state-true]="favoriteFoodControl.touched">
                <b>touched:</b>
                {{ favoriteFoodControl.touched }}
            </span>
        </p>
    </fieldset>
    `,
  codeSnippet: `form = new FormGroup({
  favoriteFood: new FormControl({ value: this.items[1], disabled: !this.canSelectFavorite }),
});
toggleEnabled(enabled: boolean) {
  const favoriteFoodControl = this.form.controls['favoriteFood'];
  enabled
    ? favoriteFoodControl.enable()
    : favoriteFoodControl.disable();
}
toggleRequired(required: boolean) {
  const favoriteFoodControl = this.form.controls['favoriteFood'];
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
      :host {
        display: flex;
      }

      kirby-form-field:not(:last-of-type) {
        margin-right: 40px;
      }
    `,
  ],
})
export class RadioReactiveFormsExampleComponent implements OnInit {
  template: string = config.template;
  codeSnippet: string = config.codeSnippet;

  form: FormGroup;
  favoriteFoodControl: FormControl;
  items = [
    { title: 'Bacon', value: 1 },
    { title: 'Salami', value: 2 },
    { title: 'Tenderloin', value: 3 },
    { title: 'Tongue', value: 4 },
    { title: 'Drumstick', value: 5 },
  ];

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
