import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { TimeOrDatePipe } from '@kirbydesign/extensions-angular/localization';

import { Component, Input } from '@angular/core';
import { JsonPipe } from '@angular/common';

@Component({
  template: `
    <div>
      <p>Original Timestamp: {{ myTimestamp | json }}</p>
      <p>Today, Formatted: {{ myTimestamp | timeOrDate: showSeconds : formatMonth }}</p>
      <p>
        Tomorrow, formatted:
        {{ tomorrowTimestamp | timeOrDate: showSeconds : formatMonth }}
      </p>
    </div>
  `,
  selector: 'extensions-time-or-date-example',
  standalone: true,
  imports: [TimeOrDatePipe, JsonPipe],
})
export class TimeOrDateExampleComponent {
  /**
   * An example timestamp to be formatted.
   */
  @Input() myTimestamp!: number | Date | string;

  /**
   * The timestamp to be formatted.
   */
  @Input() tomorrowTimestamp: number | Date | string = new Date(
    new Date().setDate(new Date().getDate() + 1)
  );

  /**
   * Whether to show seconds in the formatted time.
   */
  @Input() showSeconds = false;

  /**
   * The format to be used for the month.
   */
  @Input() formatMonth: 'month-as-digits' | 'month-as-letters' = 'month-as-digits';
}

/**
 * The TimeOrDate Pipe formats a given timestamp so that:
 * - If timestamp is of "today", it's formatted as time with hours and minutes (eg. 23:56)
 * - If timestamp is different from "today", it's formatted as date with "day of month", month and year  (eg. 28.02.2020)
 *
 * All formatting and parsing is expect to be handled in "Europe/Copenhagen" time zone and with
 * the locale provided by `LOCALE_ID`.
 */
const meta: Meta<TimeOrDateExampleComponent> = {
  component: TimeOrDateExampleComponent,
  title: 'Pipes/Localization/Formatting',
  decorators: [
    moduleMetadata({
      imports: [TimeOrDatePipe],
    }),
  ],
  tags: ['!autodocs', 'dev'],
  parameters: {
    // Disables Chromatic's snapshotting as the date stuff is dynamic, and we want to showcase the formatting of todays date
    chromatic: { disableSnapshot: true },
  },
  argTypes: {
    myTimestamp: { control: { type: 'date' } },
    tomorrowTimestamp: { table: { disable: true } },
    showSeconds: { control: { type: 'boolean' } },
    formatMonth: {
      control: {
        type: 'select',
        options: ['month-as-digits', 'month-as-letters'],
      },
    },
  },
};

export default meta;
type Story = StoryObj<TimeOrDateExampleComponent>;

export const TimeOrDate: Story = {
  args: {
    myTimestamp: new Date(),
    tomorrowTimestamp: new Date(Date.now() + 86400000), // 86400000 ms = 1 day
    showSeconds: false,
    formatMonth: 'month-as-digits',
  },
  parameters: {
    docs: {
      source: {
        language: 'tsx', // Using tsx here to get better syntax highlighting
        code: `<p>Original Timestamp: {{ myTimestamp | json }}</p>
               <p>Today, formatted: {{ myTimestamp | timeOrDate: showSeconds : formatMonth }}</p>
               <p>Tomorrow, formatted: {{ tomorrowTimestamp | timeOrDate: showSeconds : formatMonth }}</p>`,
      },
    },
  },
};
