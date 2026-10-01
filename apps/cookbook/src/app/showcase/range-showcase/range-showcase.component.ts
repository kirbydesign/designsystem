import { Component } from '@angular/core';
import { ExampleViewerComponent } from '../../shared/example-viewer/example-viewer.component';
import { RangeDefaultExampleComponent } from '../../examples/range-example/examples/default.component';
import { RangeStepExampleComponent } from '../../examples/range-example/examples/step.component';
import { RangePinExampleComponent } from '../../examples/range-example/examples/pin.component';
import { CodeViewerComponent } from '../../shared/code-viewer/code-viewer.component';
import { RangeDisabledFormExampleComponent } from '../../examples/range-example/examples/disabled.component';
import { RangeDualKnobsExampleComponent } from '../../examples/range-example/examples/dual-knobs.component';
import { RangeDualKnobsPinExampleComponent } from '../../examples/range-example/examples/dual-knobs-pin.component';
import { ApiDescriptionPropertiesComponent } from '../../shared/api-description/api-description-properties/api-description-properties.component';
import { ApiDescriptionEventsComponent } from '../../shared/api-description/api-description-events/api-description-events.component';
import { ApiDescriptionProperty } from '~/app/shared/api-description/api-description-properties/api-description-properties.component';
import { ApiDescriptionMethod } from '~/app/shared/api-description/api-description-methods/api-description-methods.component';
import { ImportViewerComponent } from '~/app/shared/import-code-viewer/import-code-viewer.component';

@Component({
  selector: 'cookbook-range-showcase',
  templateUrl: './range-showcase.component.html',
  styleUrls: ['./range-showcase.component.scss'],
  imports: [
    ExampleViewerComponent,
    RangeDefaultExampleComponent,
    RangeStepExampleComponent,
    RangePinExampleComponent,
    CodeViewerComponent,
    RangeDisabledFormExampleComponent,
    RangeDualKnobsExampleComponent,
    RangeDualKnobsPinExampleComponent,
    ApiDescriptionPropertiesComponent,
    ApiDescriptionEventsComponent,
    ImportViewerComponent,
  ],
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
      name: 'dualKnobs',
      description:
        '(Optional) If true, two knobs are rendered — one for the lower bound and one for the upper bound. The value becomes an object with `lower` and `upper` properties.',
      type: ['boolean'],
      defaultValue: 'false',
    },
    {
      name: 'value',
      description:
        '(Optional) The value represented by the range component. In single-knob mode this is a number; in dual-knob mode this is an object with `lower` and `upper` number properties. Should only be used if Angular Forms (Template-driven or ReactiveForm) are not used.',
      defaultValue: 'undefined',
      type: ['number', '{ lower: number; upper: number }'],
    },
  ];

  rangeEvents: ApiDescriptionMethod[] = [
    {
      name: 'change',
      description:
        'Emitted when the user modifies the value by releasing the knob or moving the knob with the keyboard',
      signature: '() => EventEmitter<number | { lower: number; upper: number }>',
    },
    {
      name: 'move',
      description:
        'Emitted for each distinct change whenever the knob is moved by the user. Unlike the `change` event it fires continuously while the user is dragging the knob.',
      signature: '() => EventEmitter<number | { lower: number; upper: number }>',
    },
  ];
}
