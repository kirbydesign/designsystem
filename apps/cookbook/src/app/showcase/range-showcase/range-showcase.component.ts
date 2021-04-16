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
      name: 'value',
      description:
        '(Optional) The value represented by the range component. Should only be used if Angular Forms are not used.',
      defaultValue: 'undefined',
      type: ['RangeValue'],
    },
    {
      name: 'minLabel',
      description: 'Adds a text to the Minimum labels.',
      type: ['string'],
    },
    {
      name: 'maxLabel',
      description: 'Adds a text to the Maximum labels.',
      type: ['string'],
    },
    {
      name: 'min',
      description: 'Minimum integer value of the range.',
      type: ['number'],
    },
    {
      name: 'max',
      description: 'Maximum integer value of the range.',
      type: ['number'],
    },
    {
      name: 'step',
      description: '(Optional) Specifies the value granularity.',
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
      description:
        '(Optional) If true, a pin with integer value is shown when the knob is pressed.',
      type: ['boolean'],
      defaultValue: 'false',
    },
    {
      name: 'debounce',
      description: '(Optional) How long, in milliseconds, to wait to trigger the change event.',
      type: ['number'],
      defaultValue: '0',
    },
  ];

  rangeEvents: ApiDescriptionMethod[] = [
    {
      name: 'change',
      description: 'Emits events when the value changes.',
      signature: '() => EventEmitter<number>',
    },
  ];
}
