import { Component } from '@angular/core';
import { ApiDescriptionProperty } from '~/app/shared/api-description/api-description-properties/api-description-properties.component';

import { RangeValue } from '@kirbydesign/designsystem';

@Component({
  selector: 'cookbook-range-showcase',
  templateUrl: './range-showcase.component.html',
  styleUrls: ['./range-showcase.component.scss'],
})
export class RangeShowcaseComponent {
  rangeProperties: ApiDescriptionProperty[] = [
    {
      name: 'value',
      description: 'The value represented by the range component.',
      defaultValue: 'undefined',
      type: ['RangeValue'],
    },
    {
      name: 'minLabel',
      description: 'Adds a  text to the Minimum labels.',
      type: ['string'],
    },
    {
      name: 'maxLabel',
      description: 'Adds a  text to the Maximum labels.',
      type: ['string'],
    },
    {
      name: 'color',
      description: 'Sets the Range Color.',
      type: ['string'],
    },
    {
      name: 'debounce',
      description: 'Sets the Debounce value. https://ionicframework.com/docs/api/range',
      type: ['number'],
    },
    {
      name: 'max',
      description:
        'Sets the Maximum value for the Range. https://ionicframework.com/docs/api/range',
      type: ['number'],
    },
    {
      name: 'min',
      description:
        'Sets the Minimum value for the Range. https://ionicframework.com/docs/api/range',
      type: ['number'],
    },
    {
      name: 'mode',
      description: 'Sets the IonRange mode. https://ionicframework.com/docs/api/range',
      type: ["'ios' | 'md'"],
    },
    {
      name: 'name',
      description: 'Sets the Name for the Range. https://ionicframework.com/docs/api/range',
      type: ['string'],
    },
    {
      name: 'pin',
      description: 'Sets the pin for the Range. https://ionicframework.com/docs/api/range',
      type: ['boolean'],
    },
    {
      name: 'snaps',
      description: 'Sets the snaps for the Range. https://ionicframework.com/docs/api/range',
      type: ['boolean'],
    },
    {
      name: 'step',
      description: 'Sets the step for the Range. https://ionicframework.com/docs/api/range',
      type: ['number'],
    },
    {
      name: 'ticks',
      description: 'Sets the ticks for the Range. https://ionicframework.com/docs/api/range',
      type: ['number'],
    },
    {
      name: 'disabled',
      description:
        'Output for disabled state (disabled is set using Forms Framework "ControlValueAccessor").',
      type: ['boolean'],
    },
  ];

  rangeEvents: ApiDescriptionProperty[] = [
    {
      name: 'valueChange',
      description: 'Emits events when the value changes.',
      type: ['EventEmitter<RangeValue>'],
    },
  ];
}
