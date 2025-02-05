import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import {
  DateOnlyPipe,
  TimeOnlyFormat,
  TimeOnlyPipe,
  TimeOrDatePipe,
} from '@kirbydesign/extensions-angular/localization';

import { Component, Input } from '@angular/core';
import { JsonPipe } from '@angular/common';

@Component({
  template: `
    <div>
      <p>Original Date: {{ myDate | json }}</p>
      <p>Formatted Time: {{ myDate | timeOnly: timeFormat }}</p>
    </div>
  `,
  selector: 'extensions-date-time-example',
  standalone: true,
  imports: [TimeOnlyPipe, JsonPipe],
})
export class TimeOnlyExampleComponent {
  /**
   * An example Date to be formatted.
   */
  @Input() myDate!: Date;

  /**
   * Formats a given timestamp as a time.
   *
   * Timestamps can be formatted as 2 variants:
   * - 'short' being 'HH:mm' (hours and minutes)
   * - 'medium' being 'HH:mm:ss' (as above, but with seconds appended)
   *
   */
  @Input() timeFormat!: TimeOnlyFormat;

  /**
   * Name of pipe to use in the template.
   */
  @Input() timeOnly!: TimeOnlyPipe;
}

/**
 * The Time Only Pipe formats a given timestamp as a time.
 *
 * Timestamps can be formatted as 2 variants:
 * - 'short' being 'HH:mm' (hours and minutes)
 * - 'medium' being 'HH:mm:ss' (as above, but with seconds appended)
 *
 */
const meta: Meta<TimeOnlyExampleComponent> = {
  component: TimeOnlyExampleComponent,
  title: 'Pipes/Localization/Formatting',
  decorators: [
    moduleMetadata({
      imports: [DateOnlyPipe, TimeOnlyPipe, TimeOrDatePipe],
    }),
  ],
  tags: ['!autodocs', 'dev'],
  argTypes: {
    myDate: { control: { type: 'date' } },
    timeFormat: { options: ['short', 'medium'], control: { type: 'select' } },
    timeOnly: { control: false },
  },
};

export default meta;
type Story = StoryObj<TimeOnlyExampleComponent>;

export const TimeOnly: Story = {
  args: {
    myDate: new Date(2025, 0, 1, 23, 56, 0),
  },
  parameters: {
    docs: {
      source: {
        language: 'tsx', // Using tsx here to get better syntax highlighting
        code: `<p>Original Date: {{ myTime | json }}</p>
               <p>Formatted Time: {{ myTime | timeOnly: timeFormat /* timeFormat ('short' or 'medium') is optional */ }}</p> `,
      },
    },
  },
};
