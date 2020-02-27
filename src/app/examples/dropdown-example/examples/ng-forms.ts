import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

const config = {
  selector: 'kirby-dropdown-example-ng-forms',
  template: `<form [formGroup]="form">
  <kirby-dropdown
    formControlName="favoriteFood"
    placeholder="Dropdown in form"
    [items]="items"
    itemTextProperty="title"
  ></kirby-dropdown>
</form>
<fieldset>
  <legend>Configuration</legend>
  <kirby-checkbox [checked]="canSelectFavorite" (checkedChange)="toggleEnabled($event)"></kirby-checkbox>
  <label (click)="toggleEnabled(!canSelectFavorite)">Form field enabled</label><br />
  <kirby-checkbox [checked]="favoriteRequired" (checkedChange)="toggleRequired($event)"></kirby-checkbox>
  <label (click)="toggleRequired(!favoriteRequired)">Form field required</label>
  <p class="selection">
    form.value: {{ form.value | json }}<br />
    form.favoriteFood:
      <span [class.state-true]="favoriteFoodControl.valid">valid: {{ favoriteFoodControl.valid }}</span>
      <span [class.state-true]="favoriteFoodControl.enabled">enabled: {{ favoriteFoodControl.enabled }}</span>
      <span [class.state-true]="favoriteFoodControl.touched">touched: {{ favoriteFoodControl.touched }}</span>
  </p>
</fieldset>`,
  codeSnippet: `form = new FormGroup({
  favoriteFood: new FormControl({ value: this.items[2], disabled: !this.canSelectFavorite }),
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
  styles: [
    `label {
      cursor: pointer;
      font-size: 14px;
      font-weight: 300;
      line-height: 20px;
      padding-left: 4px;
      transform: translateY(-4px);
    }`,
    `.selection {
      margin: 0;
      font-size: 12px;
      line-height: 16px;
      font-style: italic;
    }`,
    `span {
      background-color: #ff595e;
      margin-right: 4px;
      padding: 0px 2px;
      border-radius: 4px;
    }`,
    `span.state-true {
      background-color: #2cf287;
    }`,
  ],
};

@Component({
  selector: config.selector,
  template: config.template,
  styles: config.styles,
})
export class DropdownExampleNgFormsComponent implements OnInit {
  template: string = config.template.split('<fieldset>')[0]; // Remove config part of the template
  codeSnippet: string = config.codeSnippet;
  canSelectFavorite = true;
  favoriteRequired = true;
  items = [
    { title: 'Bacon', subtitle: 'Bacon ipsum dolor', value: 1 },
    { title: 'Salami', subtitle: 'Salami andouille hamburger', value: 2 },
    { title: 'Tenderloin', subtitle: 'Tenderloin short loin frankfurter', value: 3 },
    { title: 'Tongue', subtitle: 'Tongue bresaola tail swine', value: 4 },
    { title: 'Drumstick', subtitle: 'Drumstick pastrami sirloin ', value: 5 },
  ];
  form: FormGroup;
  favoriteFoodControl: FormControl;

  ngOnInit(): void {
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

  get favFoodControl() {
    return this.form.controls['favoriteFood'];
  }
}
