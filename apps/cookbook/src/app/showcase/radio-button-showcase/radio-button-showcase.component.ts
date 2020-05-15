import { Component } from '@angular/core';

import { ShowcaseProperty } from '~/app/shared/showcase-properties/showcase-property';

@Component({
  selector: 'cookbook-radio-button-showcase',
  templateUrl: './radio-button-showcase.component.html',
  styleUrls: ['./radio-button-showcase.component.scss'],
})
export class RadioButtonShowcaseComponent {
  buttonProperties: ShowcaseProperty[] = [
    {
      name: 'value',
      description: 'The value represented by the radio button.',
      defaultValue: 'undefined',
      inputValues: ['any'],
    },
    {
      name: 'disabled',
      description: 'Disables the radio button so that the user cannot interact with it.',
      defaultValue: 'false',
      inputValues: ['true', 'false'],
    },
  ];

  groupProperties: ShowcaseProperty[] = [
    {
      name: 'value',
      description:
        'The selected value of the kirby-radio-button-group, corresponding to a value set on a kirby-radio-button.',
      defaultValue: 'undefined',
      inputValues: ['any'],
    },
    {
      name: 'disabled',
      description:
        'Disables the radio buttons (contained by this group) so that the user cannot interact with it.',
      defaultValue: 'false',
      inputValues: ['true', 'false'],
    },
  ];

  buttonEvents: ShowcaseProperty[] = [
    {
      name: 'focusChange',
      description:
        'Emitted when the radio button gains or loses focus (tap on mobile, click/keypress on web)',
      inputValues: ['(focused: boolean) => void'],
    },
  ];

  groupEvents: ShowcaseProperty[] = [
    {
      name: 'valueChange',
      description:
        'Emitted when the selected value changes, eg. when a radio button gains or loses focus (tap on mobile, click/keypress on web)',
      inputValues: ['(value: any) => void'],
    },
  ];

  eventColumns = {
    Name: 'Name',
    Description: 'Description',
    Type: 'Signature',
  };
}
