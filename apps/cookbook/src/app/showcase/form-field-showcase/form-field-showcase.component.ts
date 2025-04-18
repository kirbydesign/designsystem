import { Component } from '@angular/core';
import { InputSize } from '@kirbydesign/designsystem';
import { FormFieldExampleConfigurationComponent } from '../../examples/form-field-example/form-field-example-configuration-component/form-field-example-configuration.component';
import { ExampleViewerComponent } from '../../shared/example-viewer/example-viewer.component';
import { FormFieldInputDefaultExampleComponent } from '../../examples/form-field-example/examples/input/default';
import { FormFieldInputColorExampleComponent } from '../../examples/form-field-example/examples/input/color';
import { FormFieldInputLabelExampleComponent } from '../../examples/form-field-example/examples/input/label';
import { FormFieldInputLabelMessageExampleComponent } from '../../examples/form-field-example/examples/input/label-message';
import { FormFieldInputAffixExampleComponent } from '../../examples/form-field-example/examples/input/affix';
import { FormFieldInputCounterExampleComponent } from '../../examples/form-field-example/examples/input/counter';
import { FormFieldInputCounterFormExampleComponent } from '../../examples/form-field-example/examples/input/reactive-forms';
import { FormFieldInputNumericExampleComponent } from '../../examples/form-field-example/examples/input/numeric';
import { FormFieldInputDecimalMaskExampleComponent } from '../../examples/form-field-example/examples/input/decimal-mask';
import { FormFieldInputDateExampleComponent } from '../../examples/form-field-example/examples/input/date';
import { FormFieldInputDateNativeExampleComponent } from '../../examples/form-field-example/examples/input/date-native';
import { FormFieldInputDisabledExampleComponent } from '../../examples/form-field-example/examples/input/disabled';
import { FormFieldInputErrorExampleComponent } from '../../examples/form-field-example/examples/input/error';
import { FormFieldInputBorderlessExampleComponent } from '../../examples/form-field-example/examples/input/borderless';
import { FormFieldFocusExampleComponent } from '../../examples/form-field-example/examples/input/focus';
import { FormFieldTextareaDefaultExampleComponent } from '../../examples/form-field-example/examples/textarea/default';
import { FormFieldTextareaLabelExampleComponent } from '../../examples/form-field-example/examples/textarea/label';
import { FormFieldTextareaCounterExampleComponent } from '../../examples/form-field-example/examples/textarea/counter';
import { FormFieldTextareaCounterFormExampleComponent } from '../../examples/form-field-example/examples/textarea/reactive-forms';
import { ApiDescriptionPropertiesComponent } from '../../shared/api-description/api-description-properties/api-description-properties.component';
import { ApiDescriptionMethodsComponent } from '../../shared/api-description/api-description-methods/api-description-methods.component';
import { ApiDescriptionEventsComponent } from '../../shared/api-description/api-description-events/api-description-events.component';
import { CodeViewerComponent } from '../../shared/code-viewer/code-viewer.component';
import { ApiDescriptionProperty } from '~/app/shared/api-description/api-description-properties/api-description-properties.component';
import { ApiDescriptionMethod } from '~/app/shared/api-description/api-description-methods/api-description-methods.component';
import { ApiDescriptionEvent } from '~/app/shared/api-description/api-description-events/api-description-events.component';

@Component({
  selector: 'cookbook-form-field-showcase',
  templateUrl: './form-field-showcase.component.html',
  styleUrls: ['./form-field-showcase.component.scss'],
  imports: [
    FormFieldExampleConfigurationComponent,
    ExampleViewerComponent,
    FormFieldInputDefaultExampleComponent,
    FormFieldInputColorExampleComponent,
    FormFieldInputLabelExampleComponent,
    FormFieldInputLabelMessageExampleComponent,
    FormFieldInputAffixExampleComponent,
    FormFieldInputCounterExampleComponent,
    FormFieldInputCounterFormExampleComponent,
    FormFieldInputNumericExampleComponent,
    FormFieldInputDecimalMaskExampleComponent,
    FormFieldInputDateExampleComponent,
    FormFieldInputDateNativeExampleComponent,
    FormFieldInputDisabledExampleComponent,
    FormFieldInputErrorExampleComponent,
    FormFieldInputBorderlessExampleComponent,
    FormFieldFocusExampleComponent,
    FormFieldTextareaDefaultExampleComponent,
    FormFieldTextareaLabelExampleComponent,
    FormFieldTextareaCounterExampleComponent,
    FormFieldTextareaCounterFormExampleComponent,
    ApiDescriptionPropertiesComponent,
    ApiDescriptionMethodsComponent,
    ApiDescriptionEventsComponent,
    CodeViewerComponent,
  ],
})
export class FormFieldShowcaseComponent {
  size: InputSize;
  formFieldProperties: ApiDescriptionProperty[] = [
    {
      name: 'label',
      defaultValue: 'undefined',
      description:
        '(Optional) The label shown above the input. Clicking the label sets focus to the input/textarea.',
      type: ['string'],
    },
    {
      name: 'message',
      defaultValue: 'undefined',
      description: `(Optional) Message shown below the input. Can be used for hints, error and/or validation messages.
        \n If set to null space will be reserved for the message but nothing will be rendered inside. This is useful for preventing layout-shifts when e.g. an error message dynamically appears.`,
      type: ['string | null'],
    },
  ];

  formFieldMethods: ApiDescriptionMethod[] = [
    {
      name: 'focus()',
      description: `Programmatically sets focus to the input (or textarea) within the form field.
On native devices this method also ensures the form field is scrolled into the viewport.`,
      signature: '() => void',
    },
  ];

  sharedProperties: ApiDescriptionProperty[] = [
    {
      name: 'hasError',
      defaultValue: 'false',
      description: 'Indicates whether the control is in an error state.',
      type: ['true', 'false'],
    },
    {
      name: 'maxlength',
      defaultValue: 'undefined',
      description: 'Specifies the maximum number of characters that the user can enter.',
      type: ['number'],
    },
    {
      name: 'autocomplete',
      defaultValue: 'off',
      description:
        'Indicates whether the value of the control can be automatically completed by the browser.',
      type: ['on', 'off'],
    },
    {
      name: 'autofocus',
      defaultValue: 'false',
      description:
        'Specify that the input/textare should have input focus when the page loads. Only one element in a document can have this attribute.',
      type: ['true', 'false'],
    },
    {
      name: 'autocorrect',
      defaultValue: 'off',
      description:
        'Whether auto correction should be enabled when the user is entering/editing the text value.',
      type: ['on', 'off'],
    },
    {
      name: 'disabled',
      defaultValue: 'false',
      description: 'If `true`, the user cannot interact with the input.',
      type: ['true', 'false'],
    },
    {
      name: 'name',
      defaultValue: 'undefined',
      description: 'The name of the control, which is submitted with the form data.',
      type: ['string'],
    },
    {
      name: 'placeholder',
      defaultValue: 'undefined',
      description: 'Instructional text that shows before the input has a value.',
      type: ['string'],
    },
  ];

  inputProperties: ApiDescriptionProperty[] = [
    {
      name: 'type',
      defaultValue: 'text',
      description: 'The type of control to display.',
      type: ['date', 'email', 'number', 'password', 'search', 'tel', 'text', 'time', 'url'],
    },
    {
      name: 'value',
      defaultValue: 'undefined',
      description:
        'The value of the input. The type of the value is set through the `type` attribute.',
      type: ['string', 'number', 'email', 'telephone', 'date'],
    },
  ];

  decimalMaskProperties: ApiDescriptionProperty[] = [
    {
      name: 'precision',
      defaultValue: '2',
      description: 'Number of fractional digits',
      type: ['number'],
    },
    {
      name: 'allowMinus',
      defaultValue: 'false',
      description:
        'Allow negative values, will automatically be true if minimum value is a negative number',
      type: ['true', 'false'],
    },
    {
      name: 'min',
      defaultValue: 'undefined',
      description: 'Minimum value',
      type: ['number'],
    },
    {
      name: 'max',
      defaultValue: 'undefined',
      description: 'Maximum value',
      type: ['number'],
    },
    {
      name: 'maxlength',
      defaultValue: 'undefined',
      description:
        'Maximum length of value, please note setting maxlength will disable fractional digits',
      type: ['number'],
    },
    {
      name: 'setMaxOnOverflow',
      defaultValue: 'false',
      description:
        'Set the maximum value when the user types a number which is greater that the value of max.',
      type: ['true', 'false'],
    },
    {
      name: 'disableGroupSeperator',
      defaultValue: 'false',
      description: 'Disable group seperation',
      type: ['true', 'false'],
    },
  ];

  dateMaskProperties: ApiDescriptionProperty[] = [
    {
      name: 'prefillYear',
      defaultValue: 'false',
      description: 'Enable/disable prefilling of the year.',
      type: ['boolean'],
    },
  ];

  sharedEvents: ApiDescriptionEvent[] = [
    {
      name: 'blur',
      description: 'Emitted when the input loses focus.',
    },
    {
      name: 'change',
      description: 'Emitted when the input value has changed.',
    },
    {
      name: 'focus',
      description: 'Emitted when the input has focus.',
    },
    {
      name: 'input',
      description: 'Emitted when a keyboard input ocurred.',
    },
  ];

  textareaProperties: ApiDescriptionProperty[] = [
    {
      name: 'rows',
      defaultValue: 'undefined',
      description: 'The number of visible text lines for the control.',
      type: ['number'],
    },
    {
      name: 'value',
      defaultValue: 'undefined',
      description: 'The value of the textarea.',
      type: ['string'],
    },
  ];

  counterProperties: ApiDescriptionProperty[] = [
    {
      name: 'listenTo',
      defaultValue: 'undefined',
      description:
        'Reference to the kirby-input component the counter should observe. Can be specified through a template reference variable, e.g.: #cityName. The current value and (optional) maxlength of the input will be displayed.',
      type: ['string'],
    },
  ];
}
