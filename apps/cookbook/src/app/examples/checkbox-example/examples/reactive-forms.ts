import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

const config = {
  selector: 'cookbook-checkbox-reactive-forms-example',
  template: `<form [formGroup]="form">
  <ng-container *ngFor="let checkbox of checkboxes">
  <kirby-checkbox
      formControlName="{{ checkbox.id }}"
      [text]="checkbox.label"
      [disabled]="!canSelectFavorite"
    ></kirby-checkbox>
  </ng-container>
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
      <strong>Value:</strong> {{ formValue| json }}
      <br />
      <strong>{{checkboxes[0].id}}:</strong>
      <span [class.state-true]="form.get(checkboxes[0].id).valid">valid: {{ form.get(checkboxes[0].id).valid }}</span>
      <span [class.state-true]="form.get(checkboxes[0].id).enabled">enabled: {{ form.get(checkboxes[0].id).enabled }}</span>
      <span [class.state-true]="form.get(checkboxes[0].id).touched">touched: {{ form.get(checkboxes[0].id).touched }}</span>
     <strong>{{checkboxes[1].id}}:</strong>
     <span [class.state-true]="form.get(checkboxes[1].id).valid">valid: {{ form.get(checkboxes[1].id).valid }}</span>
      <span [class.state-true]="form.get(checkboxes[1].id).enabled">enabled: {{ form.get(checkboxes[1].id).enabled }}</span>
      <span [class.state-true]="form.get(checkboxes[1].id).touched">touched: {{ form.get(checkboxes[1].id).touched }}</span>
      <strong>{{checkboxes[2].id}}:</strong>
      <span [class.state-true]="form.get(checkboxes[2].id).valid">valid: {{ form.get(checkboxes[2].id).valid }}</span>
      <span [class.state-true]="form.get(checkboxes[2].id).enabled">enabled: {{ form.get(checkboxes[2].id).enabled }}</span>
      <span [class.state-true]="form.get(checkboxes[2].id).touched">touched: {{ form.get(checkboxes[2].id).touched }}</span>

    </p>
  </section>
  </cookbook-example-configuration-wrapper>`,
  codeSnippet: `checkboxes: { id: string; label: string }[] = [
    { id: 'Bacon', label: 'Bacon' },
    { id: 'Salami', label: 'Salami' },
    { id: 'Tenderloin', label: 'Tenderloin' },
  ];
  
  form: FormGroup;
  canSelectFavorite = true;
  formValue: any;


  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    const checkboxControls = {};

    this.checkboxes.forEach((checkbox) => {
      checkboxControls[checkbox.id] = [false];
    });

    this.form = this.formBuilder.group(checkboxControls);

    this.form.valueChanges.subscribe((value) => {
      this.formValue = value;
    });
  }

  toggleCanSelectFavorite() {
    this.canSelectFavorite = !this.canSelectFavorite;

    Object.keys(this.form.controls).forEach((controlName) => {
      const control = this.form.get(controlName);
      if (control) {
        control.enabled ? control.disable() : control.enable();
      }
    });
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
export class CheckboxReactiveFormsExampleComponent implements OnInit {
  template: string = config.template.split('<cookbook-example-configuration-wrapper>')[0];
  codeSnippet: string = config.codeSnippet;
  form: FormGroup;
  canSelectFavorite = true;

  formValue: any;

  checkboxes: { id: string; label: string }[] = [
    { id: 'Bacon', label: 'Bacon' },
    { id: 'Salami', label: 'Salami' },
    { id: 'Tenderloin', label: 'Tenderloin' },
  ];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    const checkboxControls = {};

    this.checkboxes.forEach((checkbox) => {
      checkboxControls[checkbox.id] = [false];
    });

    this.form = this.formBuilder.group(checkboxControls);

    this.form.valueChanges.subscribe((value) => {
      this.formValue = value;
    });
  }

  toggleCanSelectFavorite() {
    this.canSelectFavorite = !this.canSelectFavorite;

    Object.keys(this.form.controls).forEach((controlName) => {
      const control = this.form.get(controlName);
      if (control) {
        control.enabled ? control.disable() : control.enable();
      }
    });
  }
}
