import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import {
  DateOnlyPipe,
  TimeOnlyPipe,
  TimeOrDatePipe,
} from '@kirbydesign/extensions-angular/localization';

import { Component, Input } from '@angular/core';
import { JsonPipe } from '@angular/common';

@Component({
  template: `
    <div>
      <p>Original Date: {{ myDate | json }}</p>
      <p>Formatted Date: {{ myDate | dateOnly }}</p>
    </div>
  `,
  selector: 'extensions-date-time-example',
  standalone: true,
  imports: [DateOnlyPipe, JsonPipe],
})
export class DateOnlyExampleComponent {
  /**
   * An example Date to be formatted.
   */
  @Input() myDate!: Date;

  /**
   * Name of pipe to use in the template.
   */
  @Input() dateOnly!: DateOnlyPipe;
}

/**
 * The Date Only Pipe formats a given timestamp as a date.
 */
const meta: Meta<DateOnlyExampleComponent> = {
  component: DateOnlyExampleComponent,
  title: 'Pipes/Localization/Formatting',
  decorators: [
    moduleMetadata({
      imports: [DateOnlyPipe, TimeOnlyPipe, TimeOrDatePipe],
    }),
  ],
  tags: ['!autodocs', 'dev'],
  argTypes: {
    myDate: { control: { type: 'date' } },
    dateOnly: { control: false },
  },
};

export default meta;
type Story = StoryObj<DateOnlyExampleComponent>;

export const DateOnly: Story = {
  args: {
    myDate: new Date(2025, 0, 1, 23, 56, 0),
  },
  parameters: {
    docs: {
      source: {
        language: 'tsx', // Using tsx here to get better syntax highlighting
        code: `<p>Original Date: {{ myDate | json }}</p>
               <p>Formatted Date: {{ myDate | dateOnly }}</p>
`,
      },
    },
  },
};
