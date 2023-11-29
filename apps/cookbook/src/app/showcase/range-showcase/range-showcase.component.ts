import { Component } from '@angular/core';
import { ApiDescriptionMethod } from '~/app/shared/api-description/api-description-methods/api-description-methods.component';
import { ApiDescriptionProperty } from '~/app/shared/api-description/api-description-properties/api-description-properties.component';
@Component({
  selector: 'cookbook-range-showcase',
  templateUrl: './range-showcase.component.html',
  styleUrls: ['./range-showcase.component.scss'],
})
export class RangeShowcaseComponent {
  rangeProperties: ApiDescriptionProperty[] = [
    {
      name: 'minLabel',
      description: 'Adds a text to the Minimum label',
      type: ['string'],
    },
    {
      name: 'maxLabel',
      description: 'Adds a text to the Maximum label',
      type: ['string'],
    },
    {
      name: 'min',
      description: 'Minimum integer value of the range',
      type: ['number'],
    },
    {
      name: 'max',
      description: 'Maximum integer value of the range',
      type: ['number'],
    },
    {
      name: 'step',
      description:
        '(Optional) Specifies the size of each movement (an increment or jump between values) of the range',
      type: ['number'],
      defaultValue: '1',
    },
    {
      name: 'ticks',
      description: '(Optional) If true, snapping tick marks are displayed based on the step value',
      type: ['boolean'],
      defaultValue: 'false',
    },
    {
      name: 'pin',
      description: '(Optional) If true, a pin with integer value is shown when the knob is pressed',
      type: ['boolean'],
      defaultValue: 'false',
    },
    {
      name: 'pinFormatter',
      description: '(Optional) A callback used to format the pin text.',
      type: ['(value: number) => string | number'],
    },
    {
      name: 'debounce',
      description: '(Optional) How long, in milliseconds, to wait to trigger the change event',
      type: ['number'],
      defaultValue: '0',
    },
    {
      name: 'value',
      description:
        '(Optional) The value represented by the range component. Should only be used if Angular Forms (Template-driven or ReactiveForm) are not used',
      defaultValue: 'undefined',
      type: ['number'],
    },
  ];

  rangeEvents: ApiDescriptionMethod[] = [
    {
      name: 'change',
      description:
        'Emitted when the user modifies the value by releasing the knob or moving the knob with the keyboard',
      signature: '() => EventEmitter<number>',
    },
    {
      name: 'move',
      description:
        'Emitted for each distinct change whenever the knob is moved by the user. Unlike the `change` event it fires continuously while the user is dragging the knob.',
      signature: '() => EventEmitter<number>',
    },
  ];
}
