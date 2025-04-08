import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CardModule } from '@kirbydesign/designsystem/card';
import { CheckboxComponent, SegmentedControlComponent } from '@kirbydesign/designsystem';
import { ExampleConfigurationWrapperComponent } from '../../example-configuration-wrapper/example-configuration-wrapper.component';
import { ReactiveFormStateComponent } from '../../reactive-form-state/reactive-form-state.component';

const config = {
  selector: 'cookbook-segmented-control-reactive-forms-example',
  template: `<form [formGroup]="form">
    <kirby-segmented-control
      formControlName="view"
      [items]="viewItems"
      [disabled]="!isEnabled"
    ></kirby-segmented-control>
</form>
<cookbook-example-configuration-wrapper>
  <kirby-checkbox
    [checked]="isEnabled"
    (checkedChange)="toggleEnabled()"
    text="Form field enabled"
  ></kirby-checkbox>
  <cookbook-reactive-form-state [form]="form"></cookbook-reactive-form-state>
</cookbook-example-configuration-wrapper>`,
  styles: [
    `:host {
      display: flex;
      gap: 1rem;
    }
  `,
  ],
  codeSnippet: `isEnabled = true;

viewItems = [
  { text: 'Stone', id: '1' },
  { text: 'Rick', id: '2' },
  { text: 'Gooey', id: '3' },
];

form: FormGroup = this.formBuilder.group({
  view: new FormControl(this.viewItems[0]),
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
    FormsModule,
    ReactiveFormsModule,
    SegmentedControlComponent,
    CheckboxComponent,
    CardModule,
    ExampleConfigurationWrapperComponent,
    ReactiveFormStateComponent,
  ],
})
export class SegmentedControlReactiveFormsExampleComponent {
  template: string = config.template.split('<cookbook-example-configuration-wrapper>')[0]; // Remove config part of the template
  codeSnippet: string = config.codeSnippet;

  viewItems = [
    { text: 'Stone', id: '1' },
    { text: 'Rick', id: '2' },
    { text: 'Gooey', id: '3' },
  ];

  form: FormGroup = this.formBuilder.group({
    view: new FormControl(this.viewItems[0]),
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
