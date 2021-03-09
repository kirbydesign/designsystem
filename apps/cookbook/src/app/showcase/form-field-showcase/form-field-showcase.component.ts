import { Component } from '@angular/core';
import { ShowcaseEvent } from '~/app/shared/api-description/api-description-events/api-description-events.component';
import { ShowcaseMethod } from '~/app/shared/api-description/api-description-methods/api-description-methods.component';
import { ShowcaseProperty } from '~/app/shared/showcase-properties/showcase-properties.component';

import { InputSize } from '@kirbydesign/designsystem';

@Component({
  selector: 'cookbook-form-field-showcase',
  templateUrl: './form-field-showcase.component.html',
  styleUrls: ['./form-field-showcase.component.scss'],
})
export class FormFieldShowcaseComponent {
  size: InputSize;
  formFieldProperties: ShowcaseProperty[] = [
    {
      name: 'label',
      defaultValue: undefined,
      description:
        '(Optional) The label shown above the input. Clicking the label sets focus to the input/textarea.',
      inputValues: ['string'],
    },
    {
      name: 'message',
      defaultValue: undefined,
      description:
        '(Optional) Message shown below the input. Can be used for hints, error and/or validation messages.',
      inputValues: ['string'],
    },
  ];

  formFieldMethods: ShowcaseMethod[] = [
    {
      name: 'focus()',
      description: `Programmatically sets focus to the input (or textarea) within the form field.
On native devices this method also ensures the form field is scrolled into the viewport.`,
      signature: '() => void',
    },
  ];

  sharedProperties: ShowcaseProperty[] = [
    {
      name: 'hasError',
      defaultValue: 'false',
      description: 'Indicates whether the control is in an error state.',
      inputValues: ['true', 'false'],
    },
    {
      name: 'maxlength',
      defaultValue: 'undefined',
      description: 'Specifies the maximum number of characters that the user can enter.',
      inputValues: ['number'],
    },
    {
      name: 'autocomplete',
      defaultValue: 'off',
      description:
        'Indicates whether the value of the control can be automatically completed by the browser.',
      inputValues: ['on', 'off'],
    },
    {
      name: 'autofocus',
      defaultValue: 'false',
      description:
        'Specify that the input/textare should have input focus when the page loads. Only one element in a document can have this attribute.',
      inputValues: ['true', 'false'],
    },
    {
      name: 'autocorrect',
      defaultValue: 'off',
      description:
        'Whether auto correction should be enabled when the user is entering/editing the text value.',
      inputValues: ['on', 'off'],
    },
    {
      name: 'disabled',
      defaultValue: 'false',
      description: 'If `true`, the user cannot interact with the input.',
      inputValues: ['true', 'false'],
    },
    {
      name: 'name',
      defaultValue: undefined,
      description: 'The name of the control, which is submitted with the form data.',
      inputValues: ['string'],
    },
    {
      name: 'placeholder',
      defaultValue: undefined,
      description: 'Instructional text that shows before the input has a value.',
      inputValues: ['string'],
    },
  ];

  inputProperties: ShowcaseProperty[] = [
    {
      name: 'type',
      defaultValue: 'text',
      description: 'The type of control to display.',
      inputValues: ['date', 'email', 'number', 'password', 'search', 'tel', 'text', 'time', 'url'],
    },
    {
      name: 'value',
      defaultValue: undefined,
      description:
        'The value of the input. The type of the value is set through the `type` attribute.',
      inputValues: ['string', 'number', 'email', 'telephone', 'date'],
    },
  ];

  sharedEvents: ShowcaseEvent[] = [
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

  textareaProperties: ShowcaseProperty[] = [
    {
      name: 'rows',
      defaultValue: undefined,
      description: 'The number of visible text lines for the control.',
      inputValues: ['number'],
    },
    {
      name: 'value',
      defaultValue: undefined,
      description: 'The value of the textarea.',
      inputValues: ['string'],
    },
  ];

  counterProperties: ShowcaseProperty[] = [
    {
      name: 'listenTo',
      defaultValue: undefined,
      description:
        'Reference to the kirby-input component the counter should observe. Can be specified through a template reference variable, e.g.: #cityName. The current value and (optional) maxlength of the input will be displayed.',
      inputValues: ['string'],
    },
  ];
}
