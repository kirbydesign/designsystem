import { Component } from '@angular/core';
import { InputSize } from '@kirbydesign/designsystem';
import { ApiDescriptionEvent } from '~/app/shared/api-description/api-description-events/api-description-events.component';
import { ApiDescriptionMethod } from '~/app/shared/api-description/api-description-methods/api-description-methods.component';
import { ApiDescriptionProperty } from '~/app/shared/api-description/api-description-properties/api-description-properties.component';

@Component({
  selector: 'cookbook-form-field-showcase',
  templateUrl: './form-field-showcase.component.html',
  styleUrls: ['./form-field-showcase.component.scss'],
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
