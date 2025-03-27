import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CardModule } from '@kirbydesign/designsystem/card';
import { SegmentedControlComponent, SegmentItem } from '@kirbydesign/designsystem';
import { ExampleConfigurationWrapperComponent } from '../../example-configuration-wrapper/example-configuration-wrapper.component';
import { ReactiveFormStateComponent } from '../../reactive-form-state/reactive-form-state.component';

const config = {
  selector: 'cookbook-segmented-control-reactive-forms-example',
  template: `<div class="form-container">
  <form [formGroup]="form">
    <div class="segments">
      <kirby-segmented-control
        formControlName="view"
        [items]="viewItems"
        [disabled]="!isEnabled"
      ></kirby-segmented-control>

      <kirby-segmented-control
        formControlName="mode"
        [items]="modeItems"
        mode="chip"
        [disabled]="!isEnabled"
      ></kirby-segmented-control>
    </div>

    <kirby-card hasPadding="true">
      <h2>Content for {{ form.get('view')?.value?.text }} view</h2>
      <p>Mode: {{ form.get('mode')?.value?.text }}</p>
    </kirby-card>
  </form>

  <cookbook-example-configuration-wrapper>
    <kirby-segmented-control
      [items]="enableItems"
      (segmentSelect)="toggleEnabled($event)"
    ></kirby-segmented-control>
    <cookbook-reactive-form-state [form]="form"></cookbook-reactive-form-state>
  </cookbook-example-configuration-wrapper>
</div>`,
  styles: [
    `
    .form-container {
      display: flex;
      gap: 1rem;
    }

    .segments {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    cookbook-example-configuration-wrapper {
      flex: 1;
    }
  `,
  ],
  codeSnippet: `form: FormGroup = this.formBuilder.group({
  view: new FormControl(this.viewItems[0]),
  mode: new FormControl(this.modeItems[0]),
});

toggleEnabled(segment: SegmentItem) {
  this.isEnabled = segment.id === 'enabled';
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
    CardModule,
    ExampleConfigurationWrapperComponent,
    ReactiveFormStateComponent,
  ],
})
export class SegmentedControlReactiveFormsExampleComponent {
  template: string = config.template.split('<cookbook-example-configuration-wrapper>')[0]; // Remove config part of the template
  codeSnippet: string = config.codeSnippet;

  viewItems = [
    { text: 'List', id: 'list' },
    { text: 'Grid', id: 'grid' },
    { text: 'Calendar', id: 'calendar' },
  ];

  modeItems = [
    { text: 'Light', id: 'light' },
    { text: 'Dark', id: 'dark' },
  ];

  enableItems = [
    { text: 'Form enabled', id: 'enabled' },
    { text: 'Form disabled', id: 'disabled' },
  ];

  form: FormGroup = this.formBuilder.group({
    view: new FormControl(this.viewItems[0]),
    mode: new FormControl(this.modeItems[0]),
  });

  isEnabled = true;

  constructor(private formBuilder: FormBuilder) {}

  toggleEnabled(segment: SegmentItem) {
    this.isEnabled = segment.id === 'enabled';
    if (this.isEnabled) {
      this.form.enable();
    } else {
      this.form.disable();
    }
  }
}
