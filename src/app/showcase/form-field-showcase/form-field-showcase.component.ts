import { Component } from '@angular/core';

import { ShowcaseProperty } from '~/app/shared/showcase-properties/showcase-property';

declare var require: any;

@Component({
  selector: 'kirby-form-field-showcase',
  templateUrl: './form-field-showcase.component.html',
  styleUrls: ['./form-field-showcase.component.scss'],
})
export class FormFieldShowcaseComponent {
  exampleHtml: string = require('../../examples/form-field-example/form-field-example.component.html');

  inputProperties: ShowcaseProperty[] = [
    {
      name: 'autocomplete',
      defaultValue: 'off',
      description:
        'Indicates whether the value of the control can be automatically completed by the browser.',
      inputValues: ['on', 'off'],
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
      name: 'inputmode',
      defaultValue: 'undefined',
      description: 'A hint to the browser for which keyboard to display.',
      inputValues: [
        'none',
        'text',
        'decimal',
        'numeric',
        'tel',
        'search',
        'email',
        'url',
        'undefined',
      ],
    },
    {
      name: 'label',
      defaultValue: undefined,
      description: 'The label shown above the input.',
      inputValues: ['string'],
    },
    {
      name: 'name',
      defaultValue: 'this.inputId',
      description: 'The name of the control, which is submitted with the form data.',
      inputValues: ['string'],
    },
    {
      name: 'placeholder',
      defaultValue: undefined,
      description: 'Instructional text that shows before the input has a value.',
      inputValues: ['null', 'string', 'undefinded'],
    },
    {
      name: 'type',
      defaultValue: 'text',
      description: 'The type of control to display.',
      inputValues: ['date', 'email', 'number', 'password', 'search', 'tel', 'text', 'time', 'url'],
    },
    {
      name: 'value',
      defaultValue: '``',
      description: 'The value of the input.',
      inputValues: ['null', 'string', 'undefined'],
    },
  ];
  inputEvents: ShowcaseProperty[] = [
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
      name: 'disabled',
      defaultValue: 'false',
      description: 'If `true`, the user cannot interact with the input.',
      inputValues: ['true', 'false'],
    },
    {
      name: 'label',
      defaultValue: undefined,
      description: 'The label shown above the input.',
      inputValues: ['string'],
    },
    {
      name: 'name',
      defaultValue: 'this.inputId',
      description: 'The name of the control, which is submitted with the form data.',
      inputValues: ['string'],
    },
    {
      name: 'placeholder',
      defaultValue: undefined,
      description: 'Instructional text that shows before the input has a value.',
      inputValues: ['null', 'string', 'undefinded'],
    },
    {
      name: 'rows',
      defaultValue: undefined,
      description: 'The number of visible text lines for the control.',
      inputValues: ['number', 'undefined'],
    },
    {
      name: 'value',
      defaultValue: '``',
      description: 'The value of the textarea.',
      inputValues: ['null', 'string', 'undefined'],
    },
  ];
  textareaEvents: ShowcaseProperty[] = [
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

  messageproperties: ShowcaseProperty[] = [
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
        'The position determines where the message is placed inside a form-field. ATTENTION this field only works with static values and can not be dynamically bound.',
      inputValues: ['left', 'right'],
    },
  ];
}
