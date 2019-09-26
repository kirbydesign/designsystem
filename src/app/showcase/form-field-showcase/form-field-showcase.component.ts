import { Component } from '@angular/core';

import { ShowcaseProperty } from '~/app/shared/showcase-properties/showcase-property';

@Component({
  selector: 'kirby-form-field-showcase',
  templateUrl: './form-field-showcase.component.html',
  styleUrls: ['./form-field-showcase.component.scss'],
})
export class FormFieldShowcaseComponent {
  formFieldProperties: ShowcaseProperty[] = [
    {
      name: 'label',
      defaultValue: undefined,
      description:
        'The label shown above the input. Clicking the label sets focus to the input/textarea.',
      inputValues: ['string'],
    },
  ];

  sharedProperties: ShowcaseProperty[] = [
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

  sharedEvents: ShowcaseProperty[] = [
    {
      name: 'blur',
      defaultValue: undefined,
      description: 'Emitted when the input loses focus.',
      inputValues: [],
    },
    {
      name: 'change',
      defaultValue: undefined,
      description: 'Emitted when the input value has changed.',
      inputValues: [],
    },
    {
      name: 'focus',
      defaultValue: undefined,
      description: 'Emitted when the input has focus.',
      inputValues: [],
    },
    {
      name: 'input',
      defaultValue: undefined,
      description: 'Emitted when a keyboard input ocurred.',
      inputValues: [],
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

  messageProperties: ShowcaseProperty[] = [
    {
      name: 'text',
      defaultValue: undefined,
      description: 'The content of the message.',
      inputValues: ['string'],
    },
    {
      name: 'position',
      defaultValue: 'left',
      description:
        'The position determines where the message is placed inside a form-field. *PLEASE NOTE* this field only works with static values and can not be dynamically bound.',
      inputValues: ['left', 'right'],
    },
  ];
}
