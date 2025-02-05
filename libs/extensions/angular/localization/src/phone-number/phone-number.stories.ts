import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { PhoneNumberPipe } from '@kirbydesign/extensions-angular/localization';

import { Component, Input } from '@angular/core';
import { JsonPipe } from '@angular/common';

@Component({
  template: `
    <div>
      <p>Original Phone Number: {{ myPhoneNumber | json }}</p>
      <p>Formatted Phone Number: {{ myPhoneNumber | phoneNumber: chunk : showCountryCode }}</p>
    </div>
  `,
  selector: 'extensions-phone-number-example',
  standalone: true,
  imports: [PhoneNumberPipe, JsonPipe],
})
export class PhoneNumberExampleComponent {
  /**
   * An example phone number to be formatted.
   */
  @Input() myPhoneNumber!: string;

  /**
   * The chunk size used to split up the phone number with spaces.
   */
  @Input() chunk!: number;

  /**
   * Show the country code in front of the phone number. If a string representation is supplied, the KIRBY_EXTENSIONS_LOCALIZATION_TOKEN.countryCode is used.
   * See setup section for more information.
   */
  @Input() showCountryCode = false;

  /**
   * Name of pipe to use in the template.
   */
  @Input() phoneNumber!: PhoneNumberPipe;
}

/**
 * The Phone Number Pipe formats a phone number, chunked up with spaces between the chunks and the country code in front, if desired.
 */
const meta: Meta<PhoneNumberExampleComponent> = {
  component: PhoneNumberExampleComponent,
  title: 'Pipes/Localization/Formatting',
  decorators: [
    moduleMetadata({
      imports: [PhoneNumberPipe],
    }),
  ],
  tags: ['!autodocs', 'dev'],
  argTypes: {
    myPhoneNumber: { control: { type: 'text' } },
    chunk: { control: { type: 'number' } },
    showCountryCode: { control: { type: 'boolean' } },
    phoneNumber: { control: false },
  },
};

export default meta;
type Story = StoryObj<PhoneNumberExampleComponent>;

export const PhoneNumber: Story = {
  args: {
    myPhoneNumber: '87654321',
    chunk: 2,
    showCountryCode: true,
  },
  parameters: {
    docs: {
      source: {
        language: 'tsx', // Using tsx here to get better syntax highlighting
        code: `<p>Original Phone Number: {{ phoneNumber | json }}</p>
               <p>Formatted Phone Number: {{ phoneNumber | phoneNumber: chunk : showCountryCode }}</p> `,
      },
    },
  },
};
