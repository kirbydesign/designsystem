import { Component, Input } from '@angular/core';
import { FormatNumberPipe } from '@kirbydesign/extensions-angular/localization';
import { type Meta, moduleMetadata, StoryObj } from '@storybook/angular';

@Component({
  template: `
    {{ myNumber | formatNumber: digitsInfo }}
  `,
  selector: 'extensions-format-number-example',
  standalone: true,
  imports: [FormatNumberPipe],
})
class FormatNumberExampleComponent {
  /**
   * Name of pipe to use in the template.
   */
  @Input() formatNumber!: FormatNumberPipe;

  /**
   * An example number to be formatted.
   */
  @Input() myNumber!: number;

  /**
   * Optional digits info to be passed to the pipe.
   * Learn more about the format here: https://angular.dev/api/common/DecimalPipe?tab=usage-notes
   */
  @Input() digitsInfo = '1.2-2';
}

/**
 * The Number Pipe formats a number as text, with group sizing, separator, and other parameters based on locale.
 * The pipe mimics the `formatNumber`-functionality of the `DecimalPipe`, but without the need to specify locale.
 * Learn more about the format here: https://angular.dev/api/common/DecimalPipe?tab=usage-notes
 */
const meta: Meta<FormatNumberExampleComponent> = {
  component: FormatNumberExampleComponent,
  title: 'Pipes/Localization/Formatting',
  decorators: [
    moduleMetadata({
      imports: [FormatNumberPipe],
    }),
  ],
  tags: ['!autodocs', 'dev'],
  argTypes: {
    myNumber: { control: { type: 'number' } },
    formatNumber: { control: false },
  },
};

export default meta;
type Story = StoryObj<FormatNumberExampleComponent>;

export const FormatNumber: Story = {
  args: {
    myNumber: 12345.6789,
  },
  parameters: {
    docs: {
      source: {
        language: 'tsx', // Using tsx here to get better syntax highlighting
        code: `<p>
          {{ myNumber | formatNumber: { digitsInfo: '1.2-2' } /* config-object with digits info is optional */ }}
        </p> `,
      },
    },
  },
};
