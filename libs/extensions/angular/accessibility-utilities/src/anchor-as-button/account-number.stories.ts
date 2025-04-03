import { Component, Input } from '@angular/core';
import { AccountNumber, AccountNumberPipe } from '@kirbydesign/extensions-angular/localization';
import { type Meta, moduleMetadata, StoryObj } from '@storybook/angular';

@Component({
  template: `
    {{ myAccountNumber | accountNumber }}
  `,
  selector: 'extensions-account-number-example',
  standalone: true,
  imports: [AccountNumberPipe],
})
class AccountNumberExampleComponent {
  /**
   * An example `AccountNumber` to be formatted.
   */
  @Input() myAccountNumber!: AccountNumber;

  /**
   * Name of pipe to use in the template.
   */
  @Input() accountNumber!: AccountNumberPipe;
}

/**
 * The Account Number Pipe formats an `AccountNumber` to a common format.
 *
 * The registration number is padded with leading zeros if necessary, and any leading zeros in the account number are removed.
 * A whitespace is added between the registration number and the account number.
 */
const meta: Meta<AccountNumberExampleComponent> = {
  component: AccountNumberExampleComponent,
  title: 'Pipes/Localization/Formatting',
  decorators: [
    moduleMetadata({
      imports: [AccountNumberPipe],
    }),
  ],
  tags: ['!autodocs', 'dev'],
  argTypes: {
    accountNumber: { control: false },
  },
};

export default meta;
type Story = StoryObj<AccountNumberExampleComponent>;

export const Account_Number: Story = {
  args: {
    myAccountNumber: { regNo: '987', accountNo: '1234567890' },
  },
  parameters: {
    docs: {
      source: {
        language: 'tsx', // Using tsx here to get better syntax highlighting
        code: `<p>
          {{ myAccountNumber /* e.g. { regNo: '987', accountNo: '1234567890' } */ | accountNumber }}
        </p> `,
      },
    },
  },
};
